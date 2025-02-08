import { useState, useRef } from "react";
import lamejs from "lamejs";
const useAudioRecorder = (setFile) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const convertToMp3 = async (audioData) => {
    try {
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(
        await audioData.arrayBuffer()
      );
      const channelData = audioBuffer.getChannelData(0);
      const samples = new Int16Array(channelData.length);
      for (let i = 0; i < channelData.length; i++) {
        samples[i] = channelData[i] * 32767;
      }
      const mp3enc = new lamejs.Mp3Encoder(1, audioBuffer.sampleRate, 128);
      const mp3Data = [];
      const sampleBlockSize = 1152;
      for (let i = 0; i < samples.length; i += sampleBlockSize) {
        const sampleChunk = samples.subarray(
          i,
          Math.min(i + sampleBlockSize, samples.length)
        );
        const mp3buf = mp3enc.encodeBuffer(sampleChunk);
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }
      }
      const mp3buf = mp3enc.flush();
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
      const blob = new Blob(mp3Data, { type: "audio/mp3" });
      return new File([blob], "recording.mp3", { type: "audio/mp3" });
    } catch (error) {
      console.error("MP3 변환 중 오류:", error);
      throw error;
    }
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = async () => {
        try {
          const blob = new Blob(chunks.current, { type: "audio/webm" });
          console.log("녹음된 Blob:", blob); // Blob 확인

          const mp3File = await convertToMp3(blob);
          console.log("변환된 MP3 파일:", mp3File); // MP3 파일 확인

          setFile(mp3File); // setFile 호출 확인
          console.log("setFile 호출됨");

          chunks.current = [];
          stream.getTracks().forEach((track) => track.stop());
        } catch (error) {
          console.error("오디오 처리 중 에러:", error);
        }
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("녹음을 시작할 수 없습니다:", err);
      alert("마이크 접근 권한이 필요합니다.");
    }
  };
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };
  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};
export default useAudioRecorder;
