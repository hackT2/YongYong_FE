import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Mainpage from "./pages/Mainpage";
import Chatpage from "./pages/Chatpage";
import Addpage from "./pages/Addpage";
import KakaoCallback from "./pages/KakaoCallback";

function App() {
  return (
    <main className="flex justify-center items-center min-h-screen max-h-screen h-screen w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Mainpage />} />
          <Route exact path="/chat/:styleId" element={<Chatpage />} />
          <Route path="/add" element={<Addpage />} />
          <Route path="/callback" element={<KakaoCallback />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
