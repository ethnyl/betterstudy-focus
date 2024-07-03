import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Sidebar from './components/Sidebar';
import WidgetContainer from './components/WidgetContainer';
import DarkMode from './components/DarkMode';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
  position: relative;
  overflow: hidden;
  color: ${props => props.theme.textColor};
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
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
`;

const ColorBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
`;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.backgroundColor}aa;
`;

const lightTheme = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  sidebarBackground: '#f1f1f1',
  widgetBackground: 'rgba(255, 255, 255, 0.8)',
  inputBackground: '#ffffff',
  buttonBackground: '#3498db',
  buttonHoverBackground: '#2980b9',
  cardBackground: '#f0f0f0',
};

const darkTheme = {
  backgroundColor: '#282c34',
  textColor: '#ffffff',
  sidebarBackground: '#1a1a1a',
  widgetBackground: 'rgba(40, 44, 52, 0.8)',
  inputBackground: '#333333',
  buttonBackground: '#2980b9',
  buttonHoverBackground: '#3498db',
  cardBackground: '#444444',
};

function App() {
  const [widgets, setWidgets] = useState([]);
  const [background, setBackground] = useState('');
  const [isDark, setIsDark] = useState(true);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const addWidget = (type) => {
    setWidgets([...widgets, { type, id: Date.now() }]);
  };

  const removeWidget = (id) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  useEffect(() => {
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
    } else if (background.startsWith('color:')) {
      const color = background.split(':')[1];
      return <ColorBackground color={color} />;
    }
    return null;
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <AppContainer>
        <BackgroundContainer>
          {renderBackground()}
        </BackgroundContainer>
        <ContentContainer>
          <Sidebar addWidget={addWidget} isDark={isDark} toggleDarkMode={toggleDarkMode} />
          <WidgetContainer 
            widgets={widgets} 
            removeWidget={removeWidget} 
            setBackground={setBackground}
          />
          <DarkMode isDark={isDark} toggleDarkMode={toggleDarkMode} />
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;