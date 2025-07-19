import React, { useState, useEffect } from 'react';
import Timer from '../components/Timer/Timer';
import Summary from '../components/Timer/Summary';
import InitialFormModal from '../components/Timer/InitialFormModal';

const TimerPage = () => {
  const [studyInfo, setStudyInfo] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleFinish = () => {
    setIsFinished(true);
    if (!isFinished) {
      setIsFinished(true);
    }
  };

  useEffect(() => {
    if (isFinished && studyInfo) {
      const userId = localStorage.getItem('user_id');
      const name = localStorage.getItem('name');
      const payload = {
        user_id: userId,
        name: name,
        description: studyInfo.description,
        timer_time: String(Number(studyInfo.time) * 60),
      };

      fetch('https://motivationtimer-x-oshi.onrender.com/api/add-timer-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) throw new Error('送信に失敗しました');
          return response.json();
        })
        .then((data) => {
          console.log('送信成功:', data);
        })
        .catch((error) => {
          console.error('送信エラー:', error);
        });
    }
  }, [isFinished, studyInfo]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light-subtle">
      <div className="card shadow-lg rounded-0 w-100 h-100 border-0">
        {!studyInfo && <InitialFormModal onSubmit={setStudyInfo} />}

        {studyInfo && !isFinished && (
          <Timer onFinish={handleFinish} studyInfo={studyInfo} />
        )}

        {isFinished && <Summary studyInfo={studyInfo} />}
      </div>
    </div>
  );
};

export default TimerPage;
