import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleStart = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  // Format time
  const formattedTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []); // Cleanup on unmount

  return (
    <div className="stopwatch">
      <div className="timer-display">
        <span>{formattedTime()}</span>
      </div>
      <div className="button-group">
        <button className="circular" onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button className="circular" onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button className="circular" onClick={handleReset} disabled={isRunning}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;