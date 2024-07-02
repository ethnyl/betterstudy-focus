import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const environments = [
  { name: 'Beach', url: 'https://www.youtube.com/watch?v=jEnd8JIMii4' },
  { name: 'Forest', url: 'https://www.youtube.com/watch?v=x7SQaDTSrVg' },
  { name: 'Cafe', url: 'https://www.youtube.com/watch?v=0L38Z9hIi5s' },
  { name: 'Space', url: 'https://youtu.be/k3UevKvP9RU' },
  { name: 'Custom YouTube', url: '' }
];

const EnvironmentSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const YouTubeInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  display: ${props => props.show ? 'block' : 'none'};
`;

function VirtualEnvironment({ setBackground }) {
  const [currentEnvironment, setCurrentEnvironment] = useState(environments[0]);
  const [youtubeUrl, setYoutubeUrl] = useState('');

  useEffect(() => {
    if (currentEnvironment.name === 'Custom YouTube' && youtubeUrl) {
      const videoId = getYouTubeID(youtubeUrl);
      setBackground(`youtube:${videoId}`);
    } else {
      const videoId = getYouTubeID(currentEnvironment.url);
      setBackground(`youtube:${videoId}`);
    }
  }, [currentEnvironment, youtubeUrl, setBackground]);

  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <>
      <EnvironmentSelect 
        value={currentEnvironment.name} 
        onChange={(e) => setCurrentEnvironment(environments.find(env => env.name === e.target.value))}
      >
        {environments.map(env => (
          <option key={env.name} value={env.name}>{env.name}</option>
        ))}
      </EnvironmentSelect>
      <YouTubeInput 
        show={currentEnvironment.name === 'Custom YouTube'}
        type="text" 
        value={youtubeUrl} 
        onChange={(e) => setYoutubeUrl(e.target.value)}
        placeholder="Enter YouTube URL"
      />
    </>
  );
}

export default VirtualEnvironment;
