import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import styles from './hall.module.css';
import MentorCard from '../../componentes/MentorCard';
import Swal from 'sweetalert2';

interface Mentor {
  id: string;
  name: string;
  role: string;
  xpRequired: number;
  avatar: string;
  messages: string[]; 
  bio: string;
}

interface User {
  xp: number;
}

interface HallOfFameProps {
  user: User;
  onBack: () => void;
  onSelectMentor: (mentor: Mentor) => void;
  currentMentorId?: string;
}

const HallOfFame: React.FC<HallOfFameProps> = ({ user, onBack, onSelectMentor }) => {
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    api.get('/mentors').then((res) => setMentors(res.data));
  }, []);

  const handleReadMore = (mentor: Mentor) => {
    Swal.fire({
      title: `<span style="color: #FF9F0A">${mentor.name}</span>`,
      html: `
        <div style="text-align: left; font-family: sans-serif;">
          <p><strong>Bio:</strong> ${mentor.bio}</p>
          <p style="margin-top: 10px; color: #8A2BE2;"><i>"${mentor.messages[0]}"</i></p>
          <hr style="border: 0.5px solid #333">
          <p style="font-size: 0.8rem; color: #aaa;">Requisito para Mentor: <strong>${mentor.xpRequired} XP</strong></p>
        </div>
      `,
      imageUrl: mentor.avatar,
      imageWidth: 100,
      imageHeight: 100,
      showCancelButton: true,
      confirmButtonText: user.xp >= mentor.xpRequired ? 'RECRUTAR MENTOR' : 'XP INSUFICIENTE',
      confirmButtonColor: user.xp >= mentor.xpRequired ? '#FF9F0A' : '#444',
      cancelButtonText: 'FECHAR',
      background: '#0f0f1b',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        if (user.xp >= mentor.xpRequired) {
          onSelectMentor(mentor);
          Swal.fire('Novo Mentor!', `${mentor.name} agora guia seus passos.`, 'success');
        } else {
          Swal.fire('Bloqueado', 'Continue seus estudos para ganhar o respeito desta lenda!', 'error');
        }
      }
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={onBack} className={styles.btnBack}>VOLTAR</button>
        <div className={styles.titleGroup}>
          <h1 className="glitch-text">HALL DA FAMA</h1>
          <p className={styles.subtitle}>PERSONALIDADES QUE REVOLUCIONARAM O MUNDO DA TECNOLOGIA</p>
          <p className={styles.instruction}>Clique em uma lenda para conhecer sua história e recrutá-la.</p>
        </div>
      </header>

      <div className={styles.grid}>
        {mentors.map((mentor) => (
          <div key={mentor.id} onClick={() => handleReadMore(mentor)} className={styles.cardWrapper}>
            <MentorCard 
              name={mentor.name}
              role={mentor.role}
              xpRequired={mentor.xpRequired}
              userXp={user.xp}
              avatar={mentor.avatar}
              message={mentor.messages[0]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HallOfFame;