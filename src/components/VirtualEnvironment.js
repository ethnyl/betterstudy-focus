import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const environments = [
  { name: 'Forest', type: 'youtube', url: 'https://www.youtube.com/watch?v=x7SQaDTSrVg' },
  { name: 'Cafe', type: 'youtube', url: 'https://www.youtube.com/watch?v=0L38Z9hIi5s' },
  { name: 'Beach', type: 'youtube', url: 'https://www.youtube.com/watch?v=jEnd8JIMii4' },
  { name: 'Space', type: 'youtube', url: 'https://youtu.be/k3UevKvP9RU' },
  { name: 'Custom YouTube', type: 'custom', url: '' },
  { name: 'Custom Color', type: 'custom', value: '#FFFFFF' }
];

const EnvironmentSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.textColor};
  border: 1px solid ${props => props.theme.textColor};
`;

const CustomInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  display: ${props => props.show ? 'block' : 'none'};
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.textColor};
  border: 1px solid ${props => props.theme.textColor};
`;

function VirtualEnvironment({ setBackground }) {
  const [currentEnvironment, setCurrentEnvironment] = useState(environments[0]);
  const [customValue, setCustomValue] = useState('');

  useEffect(() => {
    if (currentEnvironment.type === 'youtube') {
      const videoId = getYouTubeID(currentEnvironment.url);
      setBackground(`youtube:${videoId}`);
    } else if (currentEnvironment.type === 'color') {
      setBackground(`color:${currentEnvironment.value}`);
    } else if (currentEnvironment.type === 'custom') {
      if (currentEnvironment.name === 'Custom YouTube' && customValue) {
        const videoId = getYouTubeID(customValue);
        setBackground(`youtube:${videoId}`);
      } else if (currentEnvironment.name === 'Custom Color' && customValue) {
        setBackground(`color:${customValue}`);
      }
    }
  }, [currentEnvironment, customValue, setBackground]);

  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <>
      <EnvironmentSelect 
        value={currentEnvironment.name} 
        onChange={(e) => {
          setCurrentEnvironment(environments.find(env => env.name === e.target.value));
          setCustomValue('');
        }}
      >
        {environments.map(env => (
          <option key={env.name} value={env.name}>{env.name}</option>
        ))}
      </EnvironmentSelect>
      <CustomInput 
        show={currentEnvironment.type === 'custom'}
        type={currentEnvironment.name === 'Custom Color' ? 'color' : 'text'}
        value={customValue} 
        onChange={(e) => setCustomValue(e.target.value)}
        placeholder={currentEnvironment.name === 'Custom YouTube' ? "Enter YouTube URL" : "Select color"}
      />
    </>
  );
}

export default VirtualEnvironment;