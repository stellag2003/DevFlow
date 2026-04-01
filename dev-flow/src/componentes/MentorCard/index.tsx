import React from 'react';
import styles from './mentorCard.module.css';

interface MentorCardProps {
  name: string;
  role: string;
  xpRequired: number;
  userXp: number;
  avatar: string;
  message: string;
}

const MentorCard: React.FC<MentorCardProps> = ({ 
  name, 
  role, 
  xpRequired, 
  userXp, 
  avatar, 
  message 
}) => {
  const isUnlocked = userXp >= xpRequired;

  return (
    <div className={`${styles.card} ${isUnlocked ? styles.unlocked : styles.locked}`}>
      {isUnlocked ? (
        <>
          <img src={avatar} alt={name} className={styles.avatar} />
          <h3>{name}</h3>
          <p className={styles.role}>{role}</p>
          <p className={styles.quote}>"{message}"</p>
        </>
      ) : (
        <div className={styles.lockContent}>
          <span className={styles.icon}>🔒</span>
          <p>Bloqueado</p>
          <p className={styles.req}>Necessário: {xpRequired} XP</p>
        </div>
      )}
    </div>
  );
};

export default MentorCard;