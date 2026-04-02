import React, { useState, useEffect } from 'react';
import styles from './mentorHelper.module.css';

const MentorHelper = ({ mentor }: { mentor: any }) => {
  const [visible, setVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (mentor?.messages) {
      const initialIndex = Math.floor(Math.random() * mentor.messages.length);
      setCurrentMessage(mentor.messages[initialIndex]);
    }

    const interval = setInterval(() => {
      if (mentor?.messages) {
        const randomIndex = Math.floor(Math.random() * mentor.messages.length);
        setCurrentMessage(mentor.messages[randomIndex]);
        setVisible(true);
        setTimeout(() => setVisible(false), 8000); 
      }
    }, 60000); // Aparece a cada 15 segundos para teste

    return () => clearInterval(interval);
  }, [mentor]);

  if (!visible) return null;

  return (
    <div className={styles.helperContainer}>
      <img src={mentor.avatar} alt={mentor.name} />
      <div className={styles.bubble}>
        <strong>{mentor.name}:</strong>
        <p>"{currentMessage}"</p>
      </div>
    </div>
  );
};

export default MentorHelper;