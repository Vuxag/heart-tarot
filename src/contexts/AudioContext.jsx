import { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const playSound = (name, options = {}) => {
    // Mock sound playing
    console.log(`Playing sound: ${name}`);
  };

  const stopSound = (name) => {
    // Mock sound stopping
    console.log(`Stopping sound: ${name}`);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const setSoundVolume = (newVolume) => {
    setVolume(newVolume);
  };

  const value = {
    isMuted,
    volume,
    playSound,
    stopSound,
    toggleMute,
    setSoundVolume
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export { useAudio }; 