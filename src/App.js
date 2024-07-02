import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import WidgetContainer from './components/WidgetContainer';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
  position: relative;
  overflow: hidden;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  z-index: -1;
`;

const YouTubeBackground = styled.iframe`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  pointer-events: none;
  z-index: -1;
`;

function App() {
  const [widgets, setWidgets] = useState([]);
  const [background, setBackground] = useState('');

  const addWidget = (type) => {
    setWidgets([...widgets, { type, id: Date.now() }]);
  };

  const removeWidget = (id) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, []);

  const renderBackground = () => {
    if (background.startsWith('youtube:')) {
      const videoId = background.split(':')[1];
      return (
        <YouTubeBackground
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube video player"
        />
      );
    } else if (background.startsWith('video:')) {
      const videoUrl = background.split(':')[1];
      return (
        <BackgroundVideo autoPlay loop muted>
          <source src={videoUrl} type="video/mp4" />
        </BackgroundVideo>
      );
    }
    return null;
  };

  return (
    <AppContainer>
      {renderBackground()}
      <Sidebar addWidget={addWidget} />
      <WidgetContainer 
        widgets={widgets} 
        removeWidget={removeWidget} 
        setBackground={setBackground}
      />
    </AppContainer>
  );
}

export default App;