import React, { useState, useEffect } from 'react';
import Timer from '../components/Timer/Timer';
import Summary from '../components/Timer/Summary';
import InitialFormModal from '../components/Timer/InitialFormModal';
// import { postTimerLog } from '../apiHandlers';
import Cookies from 'js-cookie';

const TimerPage = () => {
  const [studyInfo, setStudyInfo] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleFinish = () => {
    if (!isFinished) {
      setTimeout(() => setIsFinished(true), 0);
    }
  };

  const postTimerLog = async (studyInfo, setErrorMsg) => {
    const token = Cookies.get('access_token');
    if (!token) {
      setErrorMsg('認証トークンがありません。ログインしてください。');
      return;
    }

    const payload = {
      user_id: user.id,
      name: user.name,
      description: studyInfo.subject,
      timer_time: studyInfo.minutes * 60,
    };
    console.log(payload);

    try {
      const res = await fetch(
        'https://motivationtimer-x-oshi.onrender.com/api/add-timer-log',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error('タイマーの送信に失敗しました');
      }

      const data = await res.json();
      console.log('送信成功:', data);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  useEffect(() => {
    if (isFinished && studyInfo) {
      console.log(studyInfo);
      postTimerLog(studyInfo, (msg) => {
        console.error(msg);
        // 必要なら画面にエラー表示する処理をここに
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
