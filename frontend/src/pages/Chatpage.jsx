import goback from "../assets/goback.png";
import yongyong from "../assets/yongyong.png";
import mic from "../assets/mic.png";
import { useState } from "react";

export default function Chatpage() {
  const [inputText, setInputText] = useState("");

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="flex flex-row justify-between items-center p-5 pb-3.5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button className="flex justify-center items-center h-10 w-10">
          <img src={goback} alt="goback" className="h-6" />
        </button>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[16px]">싸움을 멈추고 싶을땐</h1>
          <h1 className="text-[32px] font-yong">용용체</h1>
        </div>
        <img src={yongyong} alt="yongyong" className="w-12" />
      </div>
      <div className="flex flex-col h-full justify-between">
        <div className="flex-1">{/* 채팅 메시지들이 표시될 영역 */}</div>

        <div className="flex items-center gap-2 p-4 border-t bg-white">
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
          <button
            className={`p-2 rounded-full w-10 h-10 flex items-center justify-center ${
              inputText.trim()
                ? "bg-blue-300 text-white"
                : "bg-white text-gray-500 border border-gray-300"
            }`}
          >
            {inputText.trim() ? (
              <span>↑</span>
            ) : (
              <span>
                <img src={mic} alt="mic" className="w-5" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
