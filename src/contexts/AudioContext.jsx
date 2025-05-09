import { createContext, useContext, useState, useEffect } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [sounds, setSounds] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    // Load all sound effects
    const soundFiles = {
      background: '/sounds/background.mp3',
      cardFlip: '/sounds/card-flip.mp3',
      cardSelect: '/sounds/card-select.mp3',
      cardReveal: '/sounds/card-reveal.mp3',
      success: '/sounds/success.mp3',
      error: '/sounds/error.mp3',
      hover: '/sounds/hover.mp3'
    };

    const loadedSounds = {};
    Object.entries(soundFiles).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.volume = volume;
      loadedSounds[key] = audio;
    });

    setSounds(loadedSounds);

    // Cleanup
    return () => {
      Object.values(loadedSounds).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  useEffect(() => {
    // Update volume for all sounds
    Object.values(sounds).forEach(audio => {
      audio.volume = isMuted ? 0 : volume;
    });
  }, [volume, isMuted]);

  const playSound = (soundName, options = {}) => {
    const sound = sounds[soundName];
    if (sound && !isMuted) {
      if (options.loop) {
        sound.loop = true;
      }
      if (options.volume) {
        sound.volume = options.volume;
      }
      sound.currentTime = 0;
      sound.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    }
  };

  const stopSound = (soundName) => {
    const sound = sounds[soundName];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const setSoundVolume = (newVolume) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };

  return (
    <AudioContext.Provider
      value={{
        playSound,
        stopSound,
        toggleMute,
        setSoundVolume,
        isMuted,
        volume
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
} 