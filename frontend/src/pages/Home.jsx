import { useNavigate } from "react-router-dom";
import yongyong from "../assets/yongyong.png";
import title from "../assets/title.png";

export default function Home() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?" +
      "response_type=code&" +
      "client_id=c552cf9f33e217637d7bce0f00fee9dc&" +
      "redirect_uri=http://localhost:3000/callback"; // 프론트엔드의 콜백 URL
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 URL이 제공되면 추가 예정
    console.log("구글 로그인 준비중");
  };

  return (
    <div className="flex flex-col justify-center h-full w-full items-center bg-bg-blue">
      <img src={yongyong} alt="yongyong" className="w-1/2" />
      <div className="text-lg">원하는 말투로 바꿔주는</div>
      <img src={title} alt="title" className="w-3/4 mt-2" />
      <div className="flex flex-col justify-center items-center px-10 w-full gap-4 pb-10">
        <button
          onClick={handleKakaoLogin}
          className="bg-kakao text-black px-4 py-2 mt-32 w-full h-11 rounded-lg hover:opacity-90 transition-opacity"
        >
          카카오로 시작하기
        </button>
        <button
          onClick={handleGoogleLogin}
          className="bg-white text-black px-4 py-2 w-full h-11 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          구글로 시작하기
        </button>
      </div>
    </div>
  );
}
