import React from 'react';
import styles from './summary.module.css';

interface User {
  name: string;
  xp: number;
}

interface SummaryProps {
  data: { xpGained: number; minutes: number } | null;
  user: User;
  onBack: () => void;
}

const Summary: React.FC<SummaryProps> = ({ data, user, onBack }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className="glitch-text">MISSÃO CONCLUÍDA</h1>
        <div className={styles.stats}>
          <p>Tempo focado: <span>{data?.minutes} min</span></p>
          <p>XP Ganho: <span className={styles.xp}>+{data?.xpGained}</span></p>
        </div>
        <p className={styles.congrats}>Bom trabalho, {user.name}!</p>
        <button onClick={onBack} className={styles.btnBack}>VOLTAR AO HUB</button>
      </div>
    </div>
  );
};

export default Summary;