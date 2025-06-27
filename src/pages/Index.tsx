
import React, { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [user, setUser] = useState<{
    email: string;
    name: string;
    country: string;
  } | null>(null);

  const handleAuth = (userData: { email: string; name: string; country: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthForm onAuth={handleAuth} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
};

export default Index;
