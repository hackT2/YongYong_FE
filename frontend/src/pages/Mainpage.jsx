import { useEffect, useState } from "react";
import header from "../assets/header.png";
import add from "../assets/add.png";
import user from "../assets/user.png";
import { useNavigate } from "react-router-dom";

export default function Mainpage() {
  const navigate = useNavigate();
  const [styles, setStyles] = useState([]);
  const defaultStyles = [
    {
      explanation: "싸움을 멈추고 싶을땐",
      name: "용용체",
      id: 1,
    },
    {
      explanation: "교수님께 메일을 작성할땐",
      name: "메일체",
      id: 2,
    },
    {
      explanation: "따뜻한 말 한마디가 필요할땐",
      name: "위로체",
      id: 3,
    },
    {
      explanation: "공지용 말투가 필요할 땐",
      name: "공지체",
      id: 4,
    },
  ];

  // const [styles, setStyles] = useState(defaultStyles);

  useEffect(() => {
    // const savedStyles = JSON.parse(localStorage.getItem("styles") || "[]");
    // if (savedStyles.length > 0) {
    //   setStyles((prev) => [...prev, ...savedStyles]);
    // }
    const fetchStyles = async () => {
      try {
        const response = await fetch("/tone");
        const data = await response.json();

        if (data.isSuccess && data.code === "2000") {
          setStyles(data.result);
        } else {
          console.error("API 호출 실패:", data.message);
        }
      } catch (error) {
        console.error("API 호출 에러:", error);
      }
    };

    fetchStyles();
  }, []);

  const handleDelete = (index) => {
    // 기본 스타일은 삭제할 수 없음
    if (index < defaultStyles.length) return;

    // 새로운 스타일 배열 생성 (삭제할 항목 제외)
    const updatedStyles = styles.filter((_, i) => i !== index);

    // 로컬 스토리지 업데이트 (기본 스타일 제외한 나머지만 저장)
    const customStyles = updatedStyles.slice(defaultStyles.length);
    localStorage.setItem("styles", JSON.stringify(customStyles));

    // 상태 업데이트
    setStyles(updatedStyles);
  };

  return (
    <div className="flex flex-col h-screen w-full justify-between bg-bg-blue">
      <div className="flex flex-col w-full items-start justify-center px-10 pt-10 pb-5 bg-bg-blue">
        <img src={header} alt="header" className="w-full" />
      </div>
      <div className="flex flex-col flex-1 justify-start items-center bg-white rounded-t-[40px] pt-8 pb-10 px-10 overflow-y-auto">
        <div className="flex flex-col gap-[20px]">
          {/* {styles.map((style, index) => (
            <div className="relative">
              <button
                key={index}
                className="w-[284px] h-[84.071px] flex-shrink-0 bg-white rounded-[80px] shadow-[0px_0px_5.5px_rgba(0,0,0,0.25)] hover:shadow-[0px_0px_8px_rgba(0,0,0,0.3)] transition-shadow"
              >
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-[16px] mt-2">{style.situation}</h1>
                  <h1 className="text-[32px] font-yong">{style.name}</h1>
                </div>
              </button>
              {index >= defaultStyles.length && (
                <button
                  onClick={() => handleDelete(index)}
                  className="absolute -right-2 -top-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm"
                >
                  ×
                </button>
              )}
            </div>
          ))} */}
          {styles.map((style) => (
            <div className="relative">
              <button
                key={style.id}
                onClick={() =>
                  navigate(`/chat/${style.id}`, {
                    state: {
                      name: style.name,
                      explanation: style.explanation,
                    },
                  })
                }
                className="w-[284px] h-[84.071px] flex-shrink-0 bg-white rounded-[80px] shadow-[0px_0px_5.5px_rgba(0,0,0,0.25)] hover:shadow-[0px_0px_8px_rgba(0,0,0,0.3)] transition-shadow"
              >
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-[16px] mt-2">{style.explanation}</h1>
                  <h1 className="text-[32px] font-yong">{style.name}</h1>
                </div>
              </button>
              {/* 삭제 버튼은 API 연동 후 필요한 경우 추가 */}
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end items-center gap-[20px] fixed bottom-20 right-10">
          <button className="w-[46px] h-[76px] flex-shrink-0 bg-[#D8D8D8] rounded-[36px] flex items-center justify-center">
            <img src={user} alt="user" className="w-[24px] h-[24px]" />
          </button>
          <button
            className="w-[228px] h-[76px] flex-shrink-0 bg-[#44A4F9] rounded-[40px] text-white flex justify-between items-center px-[24px]"
            onClick={() => navigate("/add")}
          >
            <div className="flex flex-col">
              <span className="text-[16px] font-pretendard">
                원하는 말투가 없나요?
              </span>
              <span className="text-[10px] font-pretendard">
                상황에 맞는 말투를 만들 수 있어요!
              </span>
            </div>
            <img src={add} alt="add" className="w-[24px] h-[24px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
