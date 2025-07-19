import React from 'react';
import Timer from './pages/Timer';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import MyPage from './pages/MyPage';
import TopPage from './pages/TopPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
