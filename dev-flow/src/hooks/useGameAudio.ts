import { useEffect, useRef } from 'react';

const useGameAudio = () => {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
  if (!bgMusicRef.current) {
    const audio = new Audio('/sounds/ambient-music.mp3');
    audio.loop = true;
    audio.volume = 0.2;
    bgMusicRef.current = audio;
  }
  
  return () => {

    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current = null; 
    }
  };
}, []);

  const playMusic = () => {
  if (bgMusicRef.current) {
    
    if (bgMusicRef.current.paused) {
      bgMusicRef.current.play().catch(() => {
        console.log("Interação necessária para o áudio.");
      });
    }
  };
};

  const stopMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
    }
  };

  const playSound = (type: string) => {
    const sound = new Audio(`/sounds/${type}.mp3`);
    sound.volume = 0.4;
    sound.play().catch(() => {});
  };

  return { playMusic, stopMusic, playSound };
};

export default useGameAudio;