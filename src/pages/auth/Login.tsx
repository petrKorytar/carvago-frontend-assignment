import React from 'react';
import {Box, Container, Text, Link, VStack, Center} from '@chakra-ui/react';
import {Link as RouterLink, useNavigate, useLocation} from 'react-router-dom';
import {LoginForm} from '../../components/forms/LoginForm';
import {useAuth} from '../../hooks/useAuth';
import {ReactComponent as Logo} from '../../assets/logo.svg';

export const Login: React.FC = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (data: {username: string; password: string}) => {
    try {
      await login(data);
      // Redirect to the page user was trying to access, or dashboard
      navigate(from, {replace: true});
    } catch (error) {
      throw error; // Re-throw to let the form handle the error
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Center>
        <VStack spacing={8} w="full" maxW="800px">
          <Box textAlign="center">
            <Logo width="100px" height="auto" />
          </Box>

          <LoginForm onSubmit={handleLogin} />

          <Box textAlign="center">
            <Text color="gray.600">
              Nemáte účet?{' '}
              <Link as={RouterLink} to="/registration" color="blue.500" fontWeight="medium">
                Zaregistrujte se zde
              </Link>
            </Text>
          </Box>
        </VStack>
      </Center>
    </Container>
  );
};
