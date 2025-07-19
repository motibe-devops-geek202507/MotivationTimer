import React from 'react';
import Home from './pages/Home';
import Timer from './pages/Timer';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import TimerLog from './pages/TimerLog';
import MyPage from './pages/MyPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timer-log" element={<TimerLog />} />
      </Routes>
    </div>
  );
}

export default App;
