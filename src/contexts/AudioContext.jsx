import { createContext, useContext, useState, useRef } from 'react';

const AudioContext = createContext();

export function useAudio() {
  return useContext(AudioContext);
}

export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRefs = useRef({});

  const playSound = (name, options = {}) => {
    if (isMuted) return;

    const audio = new Audio(`/sounds/${name}.mp3`);
    audio.volume = volume * (options.volume || 1);
    if (options.loop) audio.loop = true;
    audio.play();
    audioRefs.current[name] = audio;
  };

  const stopSound = (name) => {
    if (audioRefs.current[name]) {
      audioRefs.current[name].pause();
      audioRefs.current[name].currentTime = 0;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    Object.values(audioRefs.current).forEach(audio => {
      audio.muted = !isMuted;
    });
  };

  const setSoundVolume = (newVolume) => {
    setVolume(newVolume);
    Object.values(audioRefs.current).forEach(audio => {
      audio.volume = newVolume;
    });
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