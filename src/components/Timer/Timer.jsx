import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import quotesObject from '../../quotes.js';
import { FiRefreshCw } from 'react-icons/fi';
import '../../assets/Timer.css';
import BGMPlayer from './BGMPlayer.jsx';

const Timer = ({ onFinish, studyInfo }) => {
  const navigate = useNavigate();
  const initialSeconds = studyInfo.minutes * 60;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [isPlayingBGM, setIsPlayingBGM] = useState(false);

  const quotes = quotesObject;

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const changeQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

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
            setIsPlayingBGM(false); // BGM停止
            onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, onFinish]);

  useEffect(() => {
    changeQuote();
    const quoteInterval = setInterval(changeQuote, 10 * 60 * 1000);
    return () => clearInterval(quoteInterval);
  }, []);

  const handleStart = () => !isRunning && setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
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
    <div className="container text-center py-5 position-relative">
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <BGMPlayer isPlaying={isPlayingBGM} setIsPlaying={setIsPlayingBGM} />
      </div>

      <div className="mb-4">
        <button onClick={handleStart} className="btn btn-secondary btn-lg mx-2">
          start
        </button>
        <button onClick={handleStop} className="btn btn-secondary btn-lg mx-2">
          stop
        </button>
        <button
          onClick={() => {
            if (window.confirm('本当にリセットしますか？')) handleReset();
          }}
          className="btn btn-secondary btn-lg mx-2"
        >
          reset
        </button>
      </div>
      <h1 className="fw-bold my-4 timer-display">{formatTime(seconds)}</h1>
      <div className="text-muted mb-4">
        <div>
          task: <span className="fw-medium">{studyInfo.subject}</span>
        </div>
        <div>
          time: <span className="fw-medium">{studyInfo.minutes} min</span>
        </div>
      </div>
      <div className="fs-3 mt-5 quote-display">
        <p
          className="fw-bold my-1"
          style={{ fontFamily: `'Sawarabi Mincho', serif` }}
        >
          {currentQuote.quote}
        </p>
        <p className="fst-italic text-muted fs-6 my-1">
          {currentQuote.quote_en}
        </p>
        <p className="text-secondary fs-6 my-1">- {currentQuote.author}</p>
        <p className="mt-1 fs-6 my-1">{currentQuote.explanation}</p>
      </div>

      <div className="d-flex justify-content-center">
        <button
          onClick={changeQuote}
          className="btn btn-outline-dark btn-sm mt-2 d-flex align-items-center justify-content-center rounded-circle"
          style={{ width: '40px', height: '40px' }}
        >
          <FiRefreshCw />
        </button>
      </div>

      <div className="fs-3 mt-5">
        <button
          onClick={() => {
            if (window.confirm('本当に終了しますか？')) navigate('/mypage');
          }}
          className="btn btn-dark btn-lg my-3"
        >
          Back to Home
        </button>
      </div>
      <button
        onClick={() => setSeconds(1)}
        className="btn btn-warning btn-sm mt-2"
        hidden={true}
      >
        残り1秒にする（デバッグ用）
      </button>
    </div>
  );
};

export default Timer;
