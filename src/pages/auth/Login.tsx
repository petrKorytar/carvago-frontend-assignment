import React from 'react';
import {Box, Container, Heading, Text, Link, VStack, Center} from '@chakra-ui/react';
import {Link as RouterLink, useNavigate, useLocation} from 'react-router-dom';
import {LoginForm} from '../../components/forms/LoginForm';
import {useAuth} from '../../hooks/useAuth';

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
            <Heading as="h1" size="xl" color="blue.900" mb={4}>
              Přihlášení
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Přihlaste se do svého účtu
            </Text>
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
