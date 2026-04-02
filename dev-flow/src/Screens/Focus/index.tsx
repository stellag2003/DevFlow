import React, { useState, useEffect } from 'react';
import styles from './focus.module.css';
import ProgressBar from '../../componentes/ProgressBar';
import Swal from 'sweetalert2';
import useGameAudio from '../../hooks/useGameAudio';

interface FocusProps {
  initialMinutes: number; // Prop que vem do App.tsx
  onFinish: (data: { xpGained: number; minutes: number }) => void;
  onCancel: () => void;
}

const Focus: React.FC<FocusProps> = ({ initialMinutes, onFinish, onCancel }) => {
  // Calculamos os segundos totais baseados na escolha do usuário
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(true);
  const { playSound } = useGameAudio();

  useEffect(() => {
    let interval: any = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      playSound('success');
      
      // XP proporcional: 2 XP por minuto estudado
      const xpCalculated = initialMinutes * 2;

      Swal.fire({
        title: 'MISSÃO CUMPRIDA!',
        text: `Você completou ${initialMinutes} minutos de foco e ganhou +${xpCalculated} XP!`,
        icon: 'success',
        background: '#1a1a2e',
        color: '#fff',
        confirmButtonColor: '#FF9F0A'
      }).then(() => {
        onFinish({ xpGained: xpCalculated, minutes: initialMinutes });
      });
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, initialMinutes, onFinish, playSound]);

  const handleExit = () => {
    setIsActive(false);
    playSound('alert');
    Swal.fire({
      title: 'ABORTAR MISSÃO?',
      text: "Seu progresso atual será perdido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff4444',
      confirmButtonText: 'SIM, SAIR',
      cancelButtonText: 'CANCELAR',
      background: '#1a1a2e',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        onCancel();
      } else {
        setIsActive(true);
      }
    });
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = initialMinutes * 60;
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;

  return (
    <div className={styles.container}>
      <button className={styles.btnClose} onClick={handleExit}>×</button>
      <div className={styles.timerBox}>
        <h2 className="glitch-text">MISSÃO EM CURSO</h2>
        <div className={styles.clock}>{formatTime(seconds)}</div>
        <ProgressBar progress={progress} color="#FF9F0A" />
        <div className={styles.controls}>
          <button 
            onClick={() => {
              playSound('click');
              setIsActive(!isActive);
            }} 
            className={styles.btnPause}
          >
            {isActive ? 'PAUSAR' : 'RETOMAR'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Focus;