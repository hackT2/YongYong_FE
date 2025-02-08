import header from "../assets/header.png";
import check from "../assets/check.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function Addpage() {
  const navigate = useNavigate();
  const [styleName, setStyleName] = useState('');        // 말투 이름
  const [explanation, setExplanation] = useState('');    // 한 줄 설명
  const [example, setExample] = useState('');            // 예시
  const [longExplanation, setLongExplanation] = useState(''); // 상황 설명

  const handleSubmit = async () => {
    try {
      const requestData = {
        name: styleName,           
        explanation: explanation,    
        example: example,          
        longExplanation: longExplanation  
      };

      // URL을 상대 경로로 변경
      const response = await axios.post('/tone', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Server response:', response.data);

      const newStyle = {
        situation: explanation,
        name: styleName
      };
      
      const existingStyles = JSON.parse(localStorage.getItem('styles') || '[]');
      const updatedStyles = [...existingStyles, newStyle];
      localStorage.setItem('styles', JSON.stringify(updatedStyles));
      
      navigate('/main');
      
    } catch (error) {
      console.error('Error details:', error);
      if (error.response) {
        // 서버가 응답을 반환한 경우
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
      }
      alert('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
};

  return (
    <div className="flex flex-col h-screen w-full justify-between bg-bg-blue">
      <div className="flex flex-col w-full items-start justify-center px-10 pt-10 pb-5 bg-bg-blue">
        <img src={header} alt="header" className="w-full" />
      </div>
      <div className="flex flex-col flex-1 justify-start items-center bg-white rounded-t-[40px] pt-30 pb-10 px-10 overflow-y-auto">
        <div className="text-[20px] text-black font-medium mt-8">말투 추가</div>
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

        <div className="w-full mt-[24px] flex flex-col gap-[2px]">
          <div className="text-[20px] text-black font-nanumbarunpen font-normal">
            한 줄 설명
          </div>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="한 줄로 설명해주세요"
            className="text-[16px] text-[#6F6F6F] font-nanumbarunpen font-normal mt-2 focus:outline-none resize-none overflow-hidden"
            rows="1"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <div className="w-[256px] h-[1px] bg-black flex-shrink-0 mt-1"></div>
        </div>

        <div className="w-full mt-[24px] flex flex-col gap-[2px]">
          <div className="text-[20px] text-black font-nanumbarunpen font-normal">
            상황 설명
          </div>
          <textarea
            value={longExplanation}
            onChange={(e) => setLongExplanation(e.target.value)}
            placeholder="자세한 설명을 입력해주세요"
            className="text-[16px] text-[#6F6F6F] font-nanumbarunpen font-normal mt-2 focus:outline-none resize-none overflow-hidden w-64 whitespace-pre-wrap break-words"
            rows="2"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <div className="w-[256px] h-[1px] bg-black flex-shrink-0 mt-1"></div>
        </div>

        <div className="w-full mt-[24px] flex flex-col gap-[2px]">
          <div className="text-[20px] text-black font-nanumbarunpen font-normal">
            말투 예시
          </div>
          <textarea
            value={example}
            onChange={(e) => setExample(e.target.value)}
            placeholder="예시를 입력해주세요"
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
