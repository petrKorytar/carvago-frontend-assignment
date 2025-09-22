import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import {Box, Spinner, Center} from '@chakra-ui/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const {isAuthenticated, isLoading} = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Center height="100vh">
        <Box textAlign="center">
          <Spinner size="xl" color="blue.500" />
          <Box mt={4} color="gray.600">
            Kontroluji přihlášení...
          </Box>
        </Box>
      </Center>
    );
  }

  // If not authenticated, redirect to login with return url
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  // If authenticated, render the protected component
  return <>{children}</>;
};
