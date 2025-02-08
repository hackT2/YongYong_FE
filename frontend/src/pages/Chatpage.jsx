import goback from "../assets/goback.png";
import yongyong from "../assets/yongyong.png";
import mic from "../assets/mic.png";
import { useState, useRef, useEffect } from "react";
import useAudioRecorder from "../hooks/useAudioRecorder";
import record from "../assets/record.png";
import copy from "../assets/copy.png";
import share from "../assets/share.png";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Chatpage() {
  const [inputText, setInputText] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const { isRecording, startRecording, stopRecording } =
    useAudioRecorder(setAudioFile);
  const messageEndRef = useRef(null);
  const [copiedId, setCopiedId] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const location = useLocation();
  const { name, explanation } = location.state || {
    name: "",
    explanation: "",
  };
  const { styleId } = useParams();
  console.log("styleId: ", styleId);

  // AI 응답 메시지 목록 (mock data - 3개씩 그룹화)
  const aiResponseGroups = [
    [
      "용용 안녕하세요 용ㅇㅁㄴㄹㄴㅇㄹ!암러니러ㅣㅁ나ㅓ리ㅏ너라너ㅣ러니ㅏ러니ㅏ러ㅣㅏ",
      "용용 오늘도 힘내세요 용ㅁㄴㅇㄹㄴㅁ!",
      "용용 행복하세요ㄴㅁㅇㄹㄴㅁㄹ 용!",
    ],
    ["용용 반가워요 용!", "용용 좋은 하루 보내세요 용!", "용용 파이팅 용!"],
  ];

  const getRandomAiResponseGroup = () => {
    const randomIndex = Math.floor(Math.random() * aiResponseGroups.length);
    return aiResponseGroups[randomIndex];
  };

  const handleMicClick = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handleSend = async () => {
    if (audioFile) {
      // 음성 메시지 추가
      setMessages([
        ...messages,
        {
          id: Date.now(),
          type: "user",
          content: (
            <div className="flex items-center gap-2">
              <img src={record} alt="record" className="w-5" />
              <span>음성파일</span>
            </div>
          ),
        },
      ]);
      setAudioFile(null);
    } else if (inputText.trim()) {
      // 텍스트 메시지 추가
      setMessages([
        ...messages,
        {
          id: Date.now(),
          type: "user",
          content: inputText,
        },
      ]);

      try {
        const response = await fetch(`/api/text/1`, {
          // URL 수정
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: inputText, // toneId는 URL에 포함되므로 body에서 제거
          }),
        });

        const data = await response.json();

        if (data.isSuccess) {
          // setMessages((prev) => [
          //   ...prev,
          //   {
          //     id: Date.now(),
          //     type: "ai",
          //     responses: data.result,
          //   },
          // ]);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              type: "ai",
              content: (
                <div className="space-y-2">
                  {data.result.map((response, index) => {
                    const responseId = `${Date.now()}-${index}`;
                    return (
                      <div
                        key={responseId}
                        className="bg-white p-4 rounded-2xl flex flex-row justify-between"
                      >
                        <div>{response}</div>
                        <div className="pl-4 flex flex-row gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleCopy(response)}
                            className="hover:opacity-70"
                          >
                            <img src={copy} alt="copy" className="w-4" />
                          </button>
                          <button onClick={() => handleShare(response)}>
                            <img src={share} alt="share" className="w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ),
            },
          ]);
        } else {
          console.error("API 오류:", data.message);
        }
      } catch (error) {
        console.error("API 호출 실패:", error);
      }

      setInputText("");
      const textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.style.height = "auto";
      }
    }

    // AI 응답 그룹 추가
    // setTimeout(() => {
    //   const responses = getRandomAiResponseGroup();
    //   setMessages((prev) => [
    //     ...prev,
    //     {
    //       id: Date.now(),
    //       type: "ai",
    //       content: (
    //         <div className="space-y-2">
    //           {responses.map((response, index) => {
    //             const responseId = `${Date.now()}-${index}`;
    //             console.log(
    //               "현재 렌더링 중인 responseId:",
    //               responseId,
    //               "현재 copiedId:",
    //               copiedId
    //             ); // 렌더링 시 비교 로그
    //             return (
    //               <div
    //                 key={responseId}
    //                 className="bg-white p-4 rounded-2xl flex flex-row justify-between"
    //               >
    //                 <div>{response}</div>
    //                 <div className="pl-4 flex flex-row gap-2 flex-shrink-0">
    //                   <button
    //                     onClick={() => handleCopy(response)}
    //                     className="hover:opacity-70"
    //                   >
    //                     <img src={copy} alt="copy" className="w-4" />
    //                   </button>
    //                   <button onClick={() => handleShare(response)}>
    //                     <img src={share} alt="share" className="w-3.5" />
    //                   </button>
    //                 </div>
    //               </div>
    //             );
    //           })}
    //         </div>
    //       ),
    //     },
    //   ]);
    // }, 1000);
  };
  // 스크롤 최하단 함수
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  };

  // 메시지 변경될 때마다 스크롤 실행
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopy = (text, responseId) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("복사되었습니다!");
      })
      .catch((err) => {
        console.error("복사 실패:", err);
        alert("복사에 실패했습니다.");
      });
  };

  // 복사 상태 변화 추적
  useEffect(() => {
    if (copiedId) {
      console.log("copiedId 변경됨:", copiedId); // 상태 변화 로그

      const timer = setTimeout(() => {
        console.log("타이머 실행, ID 초기화"); // 타이머 실행 로그
        setCopiedId(null);
      }, 5000);

      return () => clearTimeout(timer); // cleanup 함수 추가
    }
  }, [copiedId]);

  const handleShare = (text) => {
    setSelectedText(text);
    setIsShareModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="flex flex-row justify-between items-center p-5 pb-3.5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button className="flex justify-center items-center h-10 w-10">
          <img src={goback} alt="goback" className="h-6" />
        </button>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[14px]">{explanation}</h1>
          <h1 className="text-[32px] font-yong">{name}</h1>
        </div>
        <img src={yongyong} alt="yongyong" className="w-12" />
      </div>
      <div className="flex flex-col flex-1 min-h-0">
        <div
          ref={messageEndRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-4 ${
                  message.type === "user"
                    ? "bg-bg-gray text-black rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                    : "bg-bg-blue rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 p-4 border-t bg-white">
          {audioFile ? (
            <div className="flex-1 px-4 py-2 border rounded-3xl bg-gray-100 flex items-center gap-2">
              <img src={record} alt="record" className="w-5" />
              <span>음성파일</span>
            </div>
          ) : (
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="변환하고 싶은 메시지를 입력하세요"
              className="flex-1 px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden min-h-[40px] max-h-[120px]"
              inputMode="text"
              autoComplete="off"
              rows="1"
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
          )}
          <button
            className={`p-2 rounded-full w-10 h-10 flex items-center justify-center ${
              audioFile || inputText.trim()
                ? "bg-blue-500 text-white"
                : isRecording
                ? "bg-red-500 text-white"
                : "bg-white text-gray-500 border border-gray-300"
            }`}
            onClick={
              audioFile || inputText.trim() ? handleSend : handleMicClick
            }
          >
            {audioFile || inputText.trim() ? (
              <span>↑</span>
            ) : isRecording ? (
              <span>■</span>
            ) : (
              <span>
                <img src={mic} alt="mic" className="w-5" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 공유하기 모달 */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80">
            <div className="flex flex-col gap-4">
              <button
                className="w-full py-3 bg-bg-blue rounded-xl hover:opacity-90"
                onClick={() => {
                  // 첫 번째 공유 버튼 기능
                  setIsShareModalOpen(false);
                }}
              >
                카카오톡으로 보내기
              </button>
              <button
                className="w-full py-3 bg-bg-blue rounded-xl hover:opacity-90"
                onClick={() => {
                  // 두 번째 공유 버튼 기능
                  setIsShareModalOpen(false);
                }}
              >
                이메일로 보내기
              </button>
            </div>
          </div>
          {/* 배경 클릭 시 모달 닫기 */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setIsShareModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
