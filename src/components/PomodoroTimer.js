import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimerDisplay = styled.div`
  font-size: 2rem;
  text-align: center;
  margin: 0.5rem 0;
`;

const TimerControls = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const TimerButton = styled.button`
  flex: 1;
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #27ae60;
  }
`;

const TimerSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState(25);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(timerType * 60);
    setIsActive(false);
  };

  const changeTimerType = (minutes) => {
    setTimerType(minutes);
    setTime(minutes * 60);
    setIsActive(false);
  };

  return (
    <>
      <TimerSelect 
        value={timerType} 
        onChange={(e) => changeTimerType(Number(e.target.value))}
      >
        <option value={25}>Pomodoro (25 min)</option>
        <option value={5}>Short Break (5 min)</option>
        <option value={15}>Long Break (15 min)</option>
      </TimerSelect>
      <TimerDisplay>
        {Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}
      </TimerDisplay>
      <TimerControls>
        <TimerButton onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</TimerButton>
        <TimerButton onClick={resetTimer}>Reset</TimerButton>
      </TimerControls>
    </>
  );
}

export default PomodoroTimer;