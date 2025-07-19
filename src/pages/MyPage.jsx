import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>マイページ</h2>

      <button onClick={() => navigate('/timer')}>学習をする</button>
      <button onClick={() => navigate('/timer-log')}>記録を見る</button>
    </div>
  );
};

export default MyPage;
