import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';

export const HomeRedirect: React.FC = () => {
  const {isAuthenticated, isLoading} = useAuth();

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  // Redirect based on authentication status
  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />;
};
