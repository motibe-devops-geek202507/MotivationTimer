import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Timer = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const [finishedAt, setFinishedAt] = useState(null);
  const intervalRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setFinishedAt(Date.now());
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (finishedAt && seconds === 0) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - finishedAt) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [finishedAt, seconds]);

  const handleStart = () => {
    if (!isRunning && seconds > 0) {
      setIsRunning(true);
      setFinishedAt(null);
      setElapsedTime(0);
    }
  };

  const handleStop = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(180);
    setFinishedAt(null);
    setElapsedTime(0);
  };

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      '0'
    );
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light-subtle">
      <div className="card shadow-lg rounded-0 w-100 h-100 border-0">
        <Header />
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex justify-content-center mb-5 flex-wrap">
            <button
              onClick={!isRunning && seconds > 0 ? handleStart : undefined}
              className="btn btn-secondary btn-lg mx-2 my-1"
            >
              start
            </button>

            <button
              onClick={isRunning ? handleStop : undefined}
              className="btn btn-secondary btn-lg mx-2 my-1"
            >
              stop
            </button>

            <button
              onClick={handleReset}
              className="btn btn-secondary btn-lg mx-2 my-1"
            >
              reset
            </button>
          </div>

          <p
            className="display-2 fw-bold mb-4 text-dark"
            style={{ letterSpacing: '2px' }}
          >
            {formatTime(seconds)}
          </p>

          <button
            onClick={() => {
              const confirmNavigation = window.confirm('本当に終了しますか？');
              if (confirmNavigation) {
                navigate('/mypage');
              }
            }}
            className="btn btn-dark btn-lg mt-3"
          >
            Back to Home
          </button>

          {seconds === 0 && finishedAt && (
            <div className="text-center mt-4">
              <p className="fs-4 fw-bold text-success mb-2">終了！お疲れ様</p>
              <p className="fs-3 fw-bold text-primary">
                終了から {formatTime(elapsedTime)} 経過
              </p>
            </div>
          )}

          {seconds > 0 && (
            <p className="fs-5 text-muted mt-auto">
              名言名言名言名言名言名言名言名言名言
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
