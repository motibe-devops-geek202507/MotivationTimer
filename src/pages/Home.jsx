import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container py-4 px-3 mx-auto">
      <h1 className="text-primary mx-4">モチベーションタイマーアプリ</h1>

      <button className="btn btn-primary" onClick={() => navigate('/Login')}>
        ログイン・アカウント作成へ
      </button>
    </div>
  );
};

export default Home;
