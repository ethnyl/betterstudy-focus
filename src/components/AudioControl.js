import React, { useState } from 'react';
import styled from 'styled-components';

const audioSources = ['YouTube', 'Spotify', 'Apple Music', 'Rain Sound'];

const AudioContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
`;

const AudioSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const AudioControls = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AudioButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

function AudioControl() {
  const [currentSource, setCurrentSource] = useState(audioSources[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AudioContainer>
      <h2>Audio Control</h2>
      <AudioSelect 
        value={currentSource} 
        onChange={(e) => setCurrentSource(e.target.value)}
      >
        {audioSources.map(source => (
          <option key={source} value={source}>{source}</option>
        ))}
      </AudioSelect>
      <AudioControls>
        <AudioButton onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? 'Pause' : 'Play'}
        </AudioButton>
        <AudioButton>Previous</AudioButton>
        <AudioButton>Next</AudioButton>
      </AudioControls>
    </AudioContainer>
  );
}

export default AudioControl;