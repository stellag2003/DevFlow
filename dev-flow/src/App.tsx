import React, { useState, useEffect } from 'react';
import Login from './Screens/Login';
import Onboarding from './Screens/OnBoarding';
import Dashboard from './Screens/Dashboard';
import Focus from './Screens/Focus';
import Summary from './Screens/Summary';
import HallOfFame from './Screens/HallOfFame';
import './App.css';

interface User {
  id: string;
  username: string;
  name: string;
  level: number;
  xp: number;
  streak: number;
  requiredXp: number;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<'login' | 'onboarding' | 'dashboard' | 'focus' | 'summary' | 'hall'>('login');
  const [lastSession, setLastSession] = useState<any>(null);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('devflow_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setScreen('dashboard');
    }
  }, []);

  const handleLogin = (userData: User, isNew: boolean) => {
    setUser(userData);
    localStorage.setItem('devflow_user', JSON.stringify(userData));
    if (isNew) {
      setScreen('onboarding');
    } else {
      setScreen('dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('devflow_user');
    setUser(null);
    setScreen('login');
  };

  return (
    <div className="App starry-bg">
      {screen === 'login' && <Login onLoginSuccess={handleLogin} />}
      
      {screen === 'onboarding' && (
        <Onboarding onSelect={(mentor) => {
          setSelectedMentor(mentor);
          setScreen('dashboard');
        }} />
      )}

      {screen === 'dashboard' && user && (
        <Dashboard 
          user={user} 
          onStartMission={() => setScreen('focus')} 
          onHallOfFame={() => setScreen('hall')}
          onLogout={handleLogout}
        />
      )}

      {screen === 'focus' && (
        <Focus onFinish={(data) => {
          setLastSession(data);
          setScreen('summary');
        }}
        onCancel={() => setScreen('dashboard')}
        />
      )}

      {screen === 'summary' && user && (
        <Summary 
          data={lastSession} 
          user={user} 
          onBack={() => setScreen('dashboard')} 
        />
      )}

      {screen === 'hall' && user && (
        <HallOfFame user={user} onBack={() => setScreen('dashboard')} />
      )}

      
    </div>
  );
}

export default App;