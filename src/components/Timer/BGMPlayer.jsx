import React, { useRef, useEffect, useState } from 'react';
import bgmFile from '../../assets/bgm/bgm1.mp3';
import { FiVolumeX, FiVolume2 } from 'react-icons/fi';
import './BGMPlayer.css';

const BGMPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5); // 初期音量 50%
  const [showVolume, setShowVolume] = useState(false); // ボリュームバー表示制御

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying, volume]);

  const toggleBGM = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <>
      <div
        className="bgm-control position-absolute top-0 end-0 m-3"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        <button onClick={toggleBGM} className="btn btn-outline-dark">
          {isPlaying ? <FiVolume2 size={24} /> : <FiVolumeX size={24} />}
        </button>
        {showVolume && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-range"
          />
        )}
      </div>
      <audio ref={audioRef} src={bgmFile} loop />
    </>
  );
};

export default BGMPlayer;
