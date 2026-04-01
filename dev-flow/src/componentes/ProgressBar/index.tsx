import React from 'react';
import styles from './progressBar.module.css';

interface ProgressBarProps {
  progress: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color = '#FF9F0A' }) => {
  return (
    <div className={styles.container}>
      <div 
        className={styles.fill} 
        style={{ width: `${Math.min(100, Math.max(0, progress))}%`, backgroundColor: color }}
      ></div>
    </div>
  );
};

export default ProgressBar;