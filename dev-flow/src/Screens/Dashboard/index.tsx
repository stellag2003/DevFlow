import React, { useState } from 'react';
import styles from './dashboard.module.css';
import ProgressBar from '../../componentes/ProgressBar';
import useGameAudio from '../../hooks/useGameAudio';

interface User {
  id: string;
  name: string;
  level: number;
  xp: number;
  streak: number;
  requiredXp: number;
}

interface DashboardProps {
  user: User;
  onStartMission: (minutes: number) => void; // Agora recebe os minutos
  onHallOfFame: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onStartMission, onHallOfFame, onLogout }) => {
  const [selectedTime, setSelectedTime] = useState(25);
  const { playSound } = useGameAudio();
  const xpPercentage = (user.xp / user.requiredXp) * 100;

  const handleStart = () => {
    playSound('click');
    onStartMission(selectedTime);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.avatar}>{user.name[0]}</div>
        <h2>{user.name}</h2>
        <div className={styles.stats}>
          <p>LVL: <span>{user.level}</span></p>
          <p>SEQUÊNCIA: <span>🔥 {user.streak}</span></p>
        </div>
        <button onClick={onHallOfFame} className={styles.btnPlay}>HALL DA FAMA</button>
        <button onClick={onLogout} className={styles.btnLogout}>SAIR</button>
      </aside>

      <main className={styles.content}>
        <h1 className="glitch-text">CENTRAL</h1>
        
        <div className={styles.xpBox}>
          <p>XP PROGRESSO: {user.xp} / {user.requiredXp}</p>
          <ProgressBar progress={xpPercentage} color="#8A2BE2" />
        </div>

        <div className={styles.missionCard}>
          <div>
            <h3>CONFIGURAR MISSÃO</h3>
            <p>Escolha a duração do seu foco:</p>
            <select 
              className={styles.timeSelect}
              value={selectedTime}
              onChange={(e) => setSelectedTime(Number(e.target.value))}
            >
              <option value={10}>10 MINUTOS (SPRINT)</option>
              <option value={25}>25 MINUTOS (POMODORO)</option>
              <option value={50}>50 MINUTOS (DEEP WORK)</option>
              <option value={90}>90 MINUTOS (EXTREMO)</option>
            </select>
          </div>
          <button onClick={handleStart} className={styles.btnPlay}>INICIAR</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;