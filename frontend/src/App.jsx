import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Mainpage from "./pages/Mainpage";
import Chatpage from "./pages/Chatpage";
import Addpage from "./pages/Addpage";

function App() {
  return (
    <main className="flex justify-center items-center min-h-screen max-h-screen h-screen w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Mainpage />} />
          <Route path="/chat/:styeId" element={<Chatpage />} />
          <Route path="/add" element={<Addpage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
