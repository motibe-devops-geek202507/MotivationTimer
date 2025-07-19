import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Timeline from '../components/Timeline';

const MyPage = () => {
  const { user } = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchLogs = async () => {
        try {
          const response = await fetch(`https://motivationtimer-x-oshi.onrender.com/api/timer-logs?user_id=${user.id}`);
          const data = await response.json();
          setLogs(data);
        } catch (error) {
          console.error('Error fetching timer logs:', error);
        }
      };

      fetchLogs();
    }
  }, [user]);

  return (
    <div className="container py-5">

      <div className="card text-center p-4 p-md-5 mb-5 shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-3">
            こんにちは、{user ? user.name : 'ゲスト'}さん！
          </h3>
          <p className="card-text text-muted mb-4">
            今日も目標に向かって頑張りましょう！
          </p>
          <button 
            onClick={() => navigate('/timer')} 
            className="btn btn-primary btn-lg rounded-pill px-5"
          >
            <i className="bi bi-play-circle me-2"></i>
            学習タイマーを開始
          </button>
        </div>
      </div>

      <h2 className="mb-4 fw-bold">学習の記録</h2>
      <Dashboard data={logs} />

      <div className="mt-5">
        <h2 className="mb-4 fw-bold">タイムライン</h2>
        <Timeline logs={logs} />
      </div>
    </div>
  );
};

export default MyPage;
