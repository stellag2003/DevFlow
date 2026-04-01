import React from 'react';
import styles from './pixelButton.module.css';

interface PixelButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  className?: string;
}

const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '' 
}) => {
  return (
    <button 
      className={`${styles.pixelBtn} ${styles[variant]} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PixelButton;