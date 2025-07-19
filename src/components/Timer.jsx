import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Timer = ({ onFinish, studyInfo }) => {
  const navigate = useNavigate();
  const initialSeconds = studyInfo.minutes * 60;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, onFinish]);

  const handleStart = () => !isRunning && setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  };

  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h5>
        Studying: {studyInfo.subject} for {studyInfo.minutes} min
      </h5>

      <p className="display-2 fw-bold mb-4 text-dark">{formatTime(seconds)}</p>

      <div className="d-flex justify-content-center mb-5 flex-wrap">
        <button onClick={handleStart} className="btn btn-secondary mx-2 my-1">
          start
        </button>
        <button onClick={handleStop} className="btn btn-secondary mx-2 my-1">
          stop
        </button>
        <button
          onClick={() => {
            if (window.confirm('本当にリセットしますか？')) handleReset();
          }}
          className="btn btn-secondary mx-2 my-1"
        >
          reset
        </button>
      </div>

      <button
        onClick={() => {
          if (window.confirm('本当に終了しますか？')) navigate('/mypage');
        }}
        className="btn btn-dark btn-lg mt-3"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Timer;
