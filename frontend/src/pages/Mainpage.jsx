import header from "../assets/header.png";

export default function Mainpage() {
  return (
    <div className="flex flex-col h-screen w-full justify-between bg-bg-blue">
      <div className="flex flex-col w-full items-start justify-center px-10 pt-10 pb-5 bg-bg-blue">
        <img src={header} alt="header" className="w-full" />
      </div>
      <div className="flex flex-col flex-1 justify-center items-center bg-white rounded-t-[40px] pt-5 pb-10 px-10 overflow-y-auto">
        바디
      </div>
    </div>
  );
}
