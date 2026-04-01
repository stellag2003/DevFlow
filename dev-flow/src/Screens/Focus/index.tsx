import React, { useState, useEffect } from 'react';
import styles from './focus.module.css';
import ProgressBar from '../../componentes/ProgressBar';
import Swal from 'sweetalert2';

interface FocusProps {
  onFinish: (data: { xpGained: number; minutes: number }) => void;
  onCancel: () => void;
}

const Focus: React.FC<FocusProps> = ({ onFinish, onCancel }) => {
  const [seconds, setSeconds] = useState(1500);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: any = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      
      Swal.fire({
        title: 'MISSÃO CUMPRIDA!',
        text: 'Você concluiu 25 minutos de foco e ganhou +50 XP!',
        icon: 'success',
        background: '#1a1a2e',
        color: '#fff',
        confirmButtonColor: '#FF9F0A',
        confirmButtonText: 'RECEBER RECOMPENSA'
      }).then(() => {
        onFinish({ xpGained: 50, minutes: 25 });
      });
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, onFinish]);

  const handleExit = () => {
    setIsActive(false);
    Swal.fire({
      title: 'ABORTAR MISSÃO?',
      text: "Seu progresso atual será perdido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff4444',
      cancelButtonColor: '#333',
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

  const progress = ((1500 - seconds) / 1500) * 100;

  return (
    <div className={styles.container}>
      <button className={styles.btnClose} onClick={handleExit}>×</button>
      
      <div className={styles.timerBox}>
        <h2 className="glitch-text">MISSÃO ATIVA</h2>
        <div className={styles.clock}>{formatTime(seconds)}</div>
        <ProgressBar progress={progress} color="#FF9F0A" />
        <div className={styles.controls}>
          <button 
            onClick={() => setIsActive(!isActive)} 
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