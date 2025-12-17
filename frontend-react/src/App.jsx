import React, { useState, useEffect } from 'react';
import { getUser, clearAuth } from './utils/auth';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/user/UserDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState('admin');
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    clearAuth();
    setCurrentUser(null);
  };

  const switchToRegister = () => {
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
  };

  // Show registration page if user wants to register
  if (!currentUser && showRegister) {
    return (
      <RegisterPage 
        userType={userType} 
        onSwitchToLogin={switchToLogin}
        onSwitchType={setUserType}
      />
    );
  }

  // Show login page if not logged in
  if (!currentUser) {
    return (
      <LoginPage 
        userType={userType} 
        onLogin={handleLogin} 
        onSwitchType={setUserType}
        onSwitchToRegister={switchToRegister}
      />
    );
  }

  // Show admin dashboard for admins
  if (currentUser.role === 'admin') {
    return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
  }

  // Show user dashboard for users
  return <UserDashboard user={currentUser} onLogout={handleLogout} />;
}

export default App;
