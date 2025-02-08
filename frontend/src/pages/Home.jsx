import yongyong from "../assets/yongyong.png";
import title from "../assets/title.png";

export default function Home() {
  return (
    <div className="flex flex-col justify-center h-full w-full items-center bg-bg-blue">
      <img src={yongyong} alt="yongyong" className="w-1/2" />
      <div className="text-lg">원하는 말투로 바꿔주는</div>
      <img src={title} alt="title" className="w-3/4 mt-2" />
      <div className="flex flex-col justify-center items-center px-10 w-full gap-4">
        <button className="bg-kakao text-black px-4 py-2 mt-32 w-full h-11 rounded-lg">
          카카오로 시작하기
        </button>
        <button className="bg-white text-black px-4 py-2 w-full h-11 rounded-lg border border-gray-300">
          구글로 시작하기
        </button>
      </div>
    </div>
  );
}
