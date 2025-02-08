import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 인가 코드 가져오기
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    console.log("현재 URL:", window.location.href);
    console.log("인가 코드:", code);

    if (code) {
      try {
        // 로그인 성공 처리
        console.log("카카오 로그인 성공 - 인가 코드:", code);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("kakaoCode", code);

        // 메인 페이지로 이동
        window.location.replace("/main"); // navigate 대신 window.location.replace 사용
      } catch (error) {
        console.error("처리 중 오류:", error);
        window.location.replace("/");
      }
    } else {
      console.error("카카오 로그인 실패 - 인가 코드 없음");
      window.location.replace("/");
    }
  }, []); // navigate 의존성 제거

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bg-blue">
      <div className="text-xl mb-4">로그인 처리 중...</div>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
