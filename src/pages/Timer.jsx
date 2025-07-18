import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(10); // 3分 = 180秒
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
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (finishedAt) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - finishedAt) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [finishedAt]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(10);
    setFinishedAt(null);
    setElapsedTime(0);
  };
  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      '0'
    );
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <p>{formatTime(seconds)}</p>
      <div>
        <button onClick={handleStart}>start</button>
        <button onClick={handleStop}>stop</button>
        <button onClick={handleReset}>reset</button>
      </div>

      {seconds === 0 && finishedAt && (
        <div>
          <p>終了！お疲れ様</p>
          <p>終了から {formatTime(elapsedTime)} 経過</p>
        </div>
      )}
    </div>
  );
};

export default Timer;
