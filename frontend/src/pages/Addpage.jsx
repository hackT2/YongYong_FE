import header from "../assets/header.png";
import check from "../assets/check.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Addpage() {
  const navigate = useNavigate();
  const [styleName, setStyleName] = useState('');
  const [situation, setSituation] = useState('');

  const handleSubmit = () => {
    // 새로운 스타일 객체 생성
    const newStyle = {
      situation: situation,
      name: styleName
    };
    
    // localStorage에서 기존 스타일 가져오기
    const existingStyles = JSON.parse(localStorage.getItem('styles') || '[]');
    
    // 새로운 스타일 추가
    const updatedStyles = [...existingStyles, newStyle];
    
    // localStorage에 저장
    localStorage.setItem('styles', JSON.stringify(updatedStyles));
    
    console.log('Saved style:', newStyle);  // 디버깅용
    console.log('All styles:', updatedStyles);  // 디버깅용
    
    navigate('/main');
  };

    return (
      <div className="flex flex-col h-screen w-full justify-between bg-bg-blue">
        <div className="flex flex-col w-full items-start justify-center px-10 pt-10 pb-5 bg-bg-blue">
          <img src={header} alt="header" className="w-full" />
        </div>
        <div className="flex flex-col flex-1 justify-start items-center bg-white rounded-t-[40px] pt-30 pb-10 px-10 overflow-y-auto">
          <div className="text-[20px] text-black font-medium mt-8">
            말투 추가
          </div>
          <div className="text-[12px] text-[#6F6F6F] font-nanumbarunpen font-normal">
            가이드를 참고해 입력해주세요
          </div>
          <div className="w-full mt-6 flex flex-col gap-[2px]">
          <div className="text-[20px] text-black font-nanumbarunpen font-normal">
            말투 이름
          </div>
          <textarea
            value={styleName}
            onChange={(e) => setStyleName(e.target.value)}
            placeholder="말투 이름을 입력해주세요 예)용용체"
            className="text-[16px] text-[#6F6F6F] font-nanumbarunpen font-normal mt-2 focus:outline-none resize-none overflow-hidden"
            rows="1"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <div className="w-[256px] h-[1px] bg-black flex-shrink-0 mt-1"></div>
          </div>

          <div className="w-full mt-6 flex flex-col gap-[2px]">
          <div className="text-[20px] text-black font-nanumbarunpen font-normal">
            한 줄 소개
          </div>
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="예)싸움을 멈추고 싶을 땐"
            className="text-[16px] text-[#6F6F6F] font-nanumbarunpen font-normal mt-2 focus:outline-none resize-none overflow-hidden"
            rows="1"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <div className="w-[256px] h-[1px] bg-black flex-shrink-0 mt-1"></div>
          </div>

          <div className="w-full mt-6 flex flex-col gap-[2px]">
          <div className="text-[20px] text-black font-nanumbarunpen font-normal">
            상황 설명
          </div>
          <textarea
            placeholder="예)화가 나는 상황에서 귀엽거나 장난스러운 분위기를 만들고 싶을 때 사용하는 말투"
            className="text-[16px] text-[#6F6F6F] font-nanumbarunpen font-normal mt-2 focus:outline-none resize-none overflow-hidden w-64 whitespace-pre-wrap break-words"
            rows="2"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <div className="w-[256px] h-[1px] bg-black flex-shrink-0 mt-1"></div>
          </div>

          <div className="w-full mt-6 flex flex-col gap-[2px]">
          <div className="text-[20px] text-black font-nanumbarunpen font-normal">
            말투 예시
          </div>
          <textarea
            placeholder="너무 짜증나 -> 너무 짜증나용"
            className="text-[16px] text-[#6F6F6F] font-nanumbarunpen font-normal mt-2 focus:outline-none resize-none overflow-hidden"
            rows="1"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <div className="w-[256px] h-[1px] bg-black flex-shrink-0 mt-1"></div>
          </div>

          
          
          <div className="absolute bottom-12 left-0 right-0 flex justify-center">
            <button 
            onClick={handleSubmit}
            className="bg-[#44A4F9] text-white px-[24px] py-2 w-[228px] h-[76px] flex-shrink-0 rounded-lg flex justify-between items-center"
            >
              <span>나만의 말투 만들기</span>
              <img src={check} alt="add" className="w-[24px] h-[24px]" />
            </button>
          </div>
        </div>
      </div>
    );
}
