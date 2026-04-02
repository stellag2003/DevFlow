import React, { useState } from 'react';
import api from '../../services/api';
import styles from './login.module.css';
import Swal from 'sweetalert2';
import useGameAudio from '../../hooks/useGameAudio';

interface User {
  id: string;
  username: string;
  name: string;
  level: number;
  xp: number;
  streak: number;
  requiredXp: number;
}

interface LoginProps {
  onLoginSuccess: (user: User, isNew: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const { playSound, playMusic } = useGameAudio();

  const handleAuth = async () => {
    playSound('click');
    
    if (!username) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Identifique-se, recruta! Digite um nome.',
        background: '#1a1a2e',
        color: '#fff',
        confirmButtonColor: '#FF9F0A'
      });
      return;
    }

    try {
      if (isRegistering) {
        const newUser = {
          username: username.toLowerCase(),
          name: username,
          level: 1,
          xp: 0,
          streak: 0,
          requiredXp: 100
        };
        const res = await api.post('/users', newUser);
        playMusic();
        onLoginSuccess(res.data, true);
      } else {
        const res = await api.get(`/users?username=${username.toLowerCase()}`);
        if (res.data.length > 0) {
          playMusic();
          onLoginSuccess(res.data[0], false);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Jogador não encontrado',
            text: 'Verifique o nome ou crie uma nova conta.',
            background: '#1a1a2e',
            color: '#fff',
            confirmButtonColor: '#8A2BE2'
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro de Conexão',
        text: 'O servidor do banco de dados está desligado!',
        background: '#1a1a2e',
        color: '#fff'
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className="glitch-text">DEVFLOW</h1>
        <input 
          type="text" 
          placeholder="NOME DO JOGADOR" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleAuth} className={styles.btnMain}>
          {isRegistering ? 'INICIAR JORNADA' : 'CONTINUAR JOGO'}
        </button>
        <span onClick={() => setIsRegistering(!isRegistering)} className={styles.toggle}>
          {isRegistering ? 'Voltar para Login' : 'Criar nova conta'}
        </span>
      </div>
    </div>
  );
};

export default Login;