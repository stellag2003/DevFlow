import { useEffect, useRef } from 'react';

const useGameAudio = () => {
  // Usamos useRef para o áudio de fundo não disparar erros de "imutabilidade"
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Criamos o objeto apenas se ele ainda não existir
    if (!bgMusicRef.current) {
      const audio = new Audio('/sounds/ambient-music.mp3');
      audio.loop = true;
      audio.volume = 0.3;
      bgMusicRef.current = audio;
    }

    // Cleanup: pausa a música se o usuário sair do app/trocar de aba pesadamente
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    };
  }, []);

  const playMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.play().catch(() => {
        console.log("Interação necessária para iniciar a trilha sonora.");
      });
    }
  };

  const stopMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }
  };

  const playSound = (type: string) => {
    const sound = new Audio(`/sounds/${type}.mp3`);
    sound.volume = 0.5;
    sound.play().catch(() => {});
  };

  return { playMusic, stopMusic, playSound };
};

export default useGameAudio;