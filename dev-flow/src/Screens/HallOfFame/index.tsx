import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import styles from './hall.module.css';
import MentorCard from '../../componentes/MentorCard';

interface Mentor {
  id: string;
  name: string;
  role: string;
  xpRequired: number;
  avatar: string;
  message: string;
}

interface User {
  xp: number;
}

interface HallOfFameProps {
  user: User;
  onBack: () => void;
}

const HallOfFame: React.FC<HallOfFameProps> = ({ user, onBack }) => {
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    api.get('/mentors').then((res) => setMentors(res.data));
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={onBack} className={styles.btnBack}>← VOLTAR</button>
        <h1 className="glitch-text">HALL OF FAME</h1>
      </header>
      <div className={styles.grid}>
        {mentors.map((mentor) => (
          <MentorCard 
            key={mentor.id}
            name={mentor.name}
            role={mentor.role}
            xpRequired={mentor.xpRequired}
            userXp={user.xp}
            avatar={mentor.avatar}
            message={mentor.message}
          />
        ))}
      </div>
    </div>
  );
};

export default HallOfFame;