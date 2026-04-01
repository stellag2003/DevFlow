import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import styles from './onboarding.module.css';

const Onboarding = ({ onSelect }: { onSelect: (mentor: any) => void }) => {
  const [mentors, setMentors] = useState([]);
  const [step, setStep] = useState(1);

  useEffect(() => {
    api.get('/mentors').then(res => setMentors(res.data));
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {step === 1 ? (
          <div className={styles.intro}>
            <h2 className="glitch-text">BEM-VINDO AO DEVFLOW</h2>
            <p>Sua produtividade vira poder. Cada minuto focado gera XP para desbloquear mentores lendários.</p>
            <p>Mantenha seu Streak ativo estudando todos os dias!</p>
            <button onClick={() => setStep(2)} className={styles.btnNext}>ESCOLHER MENTOR</button>
          </div>
        ) : (
          <div className={styles.selection}>
            <h3>ESCOLHA SEU PRIMEIRO GUIA:</h3>
            <div className={styles.mentorGrid}>
              {mentors.map((m: any) => (
                <div key={m.id} className={styles.card} onClick={() => onSelect(m)}>
                  <img src={m.avatar} alt={m.name} />
                  <h4>{m.name}</h4>
                  <p>{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;