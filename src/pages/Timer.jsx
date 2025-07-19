import React, { useState } from 'react';
import Header from '../components/Header';
import Timer from '../components/Timer';
import Summary from '../components/Summary';
import InitialFormModal from '../components/InitialFormModal';

const TimerPage = () => {
  const [studyInfo, setStudyInfo] = useState(null); // フォームで入力されたデータ
  const [isFinished, setIsFinished] = useState(false);

  const handleFinish = () => {
    setIsFinished(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light-subtle">
      <div className="card shadow-lg rounded-0 w-100 h-100 border-0">
        <Header />

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
