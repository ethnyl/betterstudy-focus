import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const audioSources = ['YouTube', 'Spotify', 'Apple Music', 'Ambient Mixer'];

const ambientSounds = [
  { name: 'Rain', url: 'hmPZkdNFkNps' },
  { name: 'Thunder', url: 'nDq6TstdEi8' },
  { name: 'Fireplace', url: 'L_LUpnjgPso' },
  { name: 'Cafe Ambience', url: 'BOdLmxy06H0' },
  { name: 'Ocean Waves', url: 'QX4j_zHAlw8' },
  { name: 'Forest Sounds', url: 'xNN7iTA57jM' },
];

const AudioContainer = styled.div`
  background-color: ${props => props.theme.widgetBackground};
  color: ${props => props.theme.textColor};
  border-radius: 8px;
  padding: 1rem;
`;

const AudioSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.textColor};
  border: 1px solid ${props => props.theme.textColor};
`;

const AudioControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const AudioButton = styled.button`
  background-color: ${props => props.theme.buttonBackground};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.buttonHoverBackground};
  }
`;

const EmbedContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 1rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.textColor};
  border: 1px solid ${props => props.theme.textColor};
`;

const AmbientMixerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const AmbientSoundControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.buttonBackground};
  padding: 1rem;
  border-radius: 8px;
`;

const VolumeSlider = styled.input`
  width: 100%;
  margin-top: 0.5rem;
`;

function AudioControl() {
  const [currentSource, setCurrentSource] = useState(audioSources[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [activeSounds, setActiveSounds] = useState({});
  const playerRefs = useRef({});
  const youtubeApiReady = useRef(false);

  useEffect(() => {
    setEmbedUrl('');
    setCustomUrl('');
    setActiveSounds({});
  }, [currentSource]);

  useEffect(() => {
    // Initialize YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      youtubeApiReady.current = true;
      initializePlayers();
    };

    return () => {
      // Cleanup
      for (let sound in playerRefs.current) {
        if (playerRefs.current[sound]) {
          playerRefs.current[sound].destroy();
        }
      }
    };
  }, []);

  const initializePlayers = () => {
    ambientSounds.forEach(sound => {
      playerRefs.current[sound.name] = new window.YT.Player(`player-${sound.name}`, {
        height: '0',
        width: '0',
        videoId: sound.videoId,
        playerVars: {
          autoplay: 0,
          loop: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playlist: sound.videoId,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(50);
          },
        },
      });
    });
  };

  const handlePlay = () => {
    if (customUrl && currentSource === 'YouTube') {
      const embedUrl = getYouTubeEmbedUrl(customUrl);
      setEmbedUrl(embedUrl);
      setIsPlaying(true);
    } else if (customUrl && ['Spotify', 'Apple Music'].includes(currentSource)) {
      setEmbedUrl(getEmbedUrl(currentSource, customUrl));
      setIsPlaying(true);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = getYouTubeId(url);
    const playlistId = getYouTubePlaylistId(url);
    
    if (playlistId) {
      return `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`;
    } else if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return '';
  };

  const getEmbedUrl = (source, url) => {
    switch (source) {
      case 'Spotify':
        return `https://open.spotify.com/embed/${getSpotifyType(url)}/${getSpotifyId(url)}`;
      case 'Apple Music':
        return `https://embed.music.apple.com/${getAppleMusicPath(url)}`;
      default:
        return '';
    }
  };

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getYouTubePlaylistId = (url) => {
    const regExp = /[?&]list=([^#\&\?]+)/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  const getSpotifyType = (url) => {
    if (url.includes('/playlist/')) return 'playlist';
    if (url.includes('/album/')) return 'album';
    if (url.includes('/track/')) return 'track';
    return '';
  };

  const getSpotifyId = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1].split('?')[0];
  };

  const getAppleMusicPath = (url) => {
    const parts = url.split('music.apple.com/');
    return parts[1] || '';
  };

  const toggleAmbientSound = (sound) => {
    if (!youtubeApiReady.current) return;

    setActiveSounds(prev => {
      const newState = { ...prev };
      if (newState[sound.name]) {
        delete newState[sound.name];
        playerRefs.current[sound.name].pauseVideo();
      } else {
        newState[sound.name] = { volume: 50 };
        playerRefs.current[sound.name].playVideo();
      }
      return newState;
    });
  };

  const handleVolumeChange = (sound, volume) => {
    if (!youtubeApiReady.current) return;

    setActiveSounds(prev => ({
      ...prev,
      [sound.name]: { ...prev[sound.name], volume }
    }));
    playerRefs.current[sound.name].setVolume(volume);
  };

  const renderEmbed = () => {
    if (currentSource === 'Ambient Mixer') {
      return (
        <AmbientMixerContainer>
          {ambientSounds.map(sound => (
            <AmbientSoundControl key={sound.name}>
              <AudioButton onClick={() => toggleAmbientSound(sound)}>
                {activeSounds[sound.name] ? 'Pause' : 'Play'} {sound.name}
              </AudioButton>
              {activeSounds[sound.name] && (
                <VolumeSlider
                  type="range"
                  min="0"
                  max="100"
                  value={activeSounds[sound.name].volume}
                  onChange={(e) => handleVolumeChange(sound, e.target.value)}
                />
              )}
              <div id={`player-${sound.name}`} style={{ display: 'none' }}></div>
            </AmbientSoundControl>
          ))}
        </AmbientMixerContainer>
      );
    }

    if (!embedUrl) return null;

    return (
      <EmbedContainer>
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </EmbedContainer>
    );
  };

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
      {currentSource !== 'Ambient Mixer' && (
        <>
          <InputField
            type="text"
            placeholder={`Enter ${currentSource} URL`}
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
          />
          <AudioControls>
            <AudioButton onClick={handlePlay}>
              {isPlaying ? 'Change' : 'Play'}
            </AudioButton>
          </AudioControls>
        </>
      )}
      {renderEmbed()}
    </AudioContainer>
  );
}

export default AudioControl;