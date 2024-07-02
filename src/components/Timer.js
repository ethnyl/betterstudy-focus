import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimerDisplay = styled.div`
  font-size: 2rem;
  margin: 1rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const modes = ['Stopwatch', 'Timer', 'Pomodoro'];

function Timer() {
  const [mode, setMode] = useState('Stopwatch');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroPhase, setPomodoroPhase] = useState('Work');
  const [autoTransition, setAutoTransition] = useState(true);
  const [customTimes, setCustomTimes] = useState({
    timer: 25 * 60,
    pomodoro: {
      work: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60,
    },
  });
  const [alarmSound, setAlarmSound] = useState('beep.mp3');

  const playAlarm = useCallback(() => {
    const audio = new Audio(alarmSound);
    audio.play();
  }, [alarmSound]);

  const handlePomodoroTransition = useCallback(() => {
    setPomodoroPhase((prevPhase) => {
      if (prevPhase === 'Work') return 'Short Break';
      if (prevPhase === 'Short Break') return 'Work';
      if (prevPhase === 'Long Break') return 'Work';
      return prevPhase;
    });
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (mode === 'Stopwatch') {
          setTime(prevTime => prevTime + 1);
        } else {
          setTime(prevTime => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(interval);
              setIsRunning(false);
              playAlarm();
              if (mode === 'Pomodoro' && autoTransition) {
                handlePomodoroTransition();
              }
              return 0;
            }
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, mode, autoTransition, playAlarm, handlePomodoroTransition]);

  const handleStart = () => {
    if (mode !== 'Stopwatch' && time === 0) {
      setTime(mode === 'Pomodoro' ? customTimes.pomodoro[pomodoroPhase.toLowerCase().replace(' ', '')] : customTimes.timer);
    }
    setIsRunning(true);
  };

  const handleStop = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    if (mode === 'Pomodoro') {
      setPomodoroPhase('Work');
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <TimerContainer>
      <Select value={mode} onChange={(e) => setMode(e.target.value)}>
        {modes.map(m => <option key={m} value={m}>{m}</option>)}
      </Select>
      {mode === 'Pomodoro' && (
        <Select value={pomodoroPhase} onChange={(e) => setPomodoroPhase(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Short Break">Short Break</option>
          <option value="Long Break">Long Break</option>
        </Select>
      )}
      <TimerDisplay>{formatTime(time)}</TimerDisplay>
      <ButtonGroup>
        <Button onClick={handleStart}>Start</Button>
        <Button onClick={handleStop}>Stop</Button>
        <Button onClick={handleReset}>Reset</Button>
      </ButtonGroup>
      {mode === 'Pomodoro' && (
        <label>
          <input
            type="checkbox"
            checked={autoTransition}
            onChange={() => setAutoTransition(!autoTransition)}
          />
          Auto Transition
        </label>
      )}
      <Input
        type="number"
        value={mode === 'Pomodoro' ? customTimes.pomodoro[pomodoroPhase.toLowerCase().replace(' ', '')] / 60 : customTimes.timer / 60}
        onChange={(e) => {
          const newTime = parseInt(e.target.value) * 60;
          if (mode === 'Pomodoro') {
            setCustomTimes(prev => ({
              ...prev,
              pomodoro: {
                ...prev.pomodoro,
                [pomodoroPhase.toLowerCase().replace(' ', '')]: newTime
              }
            }));
          } else {
            setCustomTimes(prev => ({ ...prev, timer: newTime }));
          }
        }}
        placeholder="Set custom time (minutes)"
      />
      <Input
        type="text"
        value={alarmSound}
        onChange={(e) => setAlarmSound(e.target.value)}
        placeholder="Set alarm sound URL"
      />
    </TimerContainer>
  );
}

export default Timer;