import React from 'react';
import styles from './dashboard.module.css';
import ProgressBar from '../../componentes/ProgressBar';

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
  onStartMission: () => void;
  onHallOfFame: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onStartMission, onHallOfFame, onLogout }) => {
  const xpPercentage = (user.xp / user.requiredXp) * 100;

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
        <h1 className="glitch-text">CENTRAL DE COMANDO</h1>
        <div className={styles.xpBox}>
          <p>XP PROGRESS: {user.xp} / {user.requiredXp}</p>
          <ProgressBar progress={xpPercentage} color="#8A2BE2" />
        </div>

        <div className={styles.missionCard}>
          <div>
            <h3>MISSÃO DE FOCO</h3>
            <p>25:00 MINUTOS</p>
          </div>
          <button onClick={onStartMission} className={styles.btnPlay}>INICIAR</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;