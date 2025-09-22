import React from 'react';
import {Box, Container, Text, Link, VStack, Center} from '@chakra-ui/react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {RegistrationForm} from '../../components/forms/RegistrationForm';
import {useAuth} from '../../hooks/useAuth';
import {setTokens} from '../../utils/authService';
import {ReactComponent as Logo} from '../../assets/logo.svg';

export const Registration: React.FC = () => {
  const {register} = useAuth();
  const navigate = useNavigate();

  const handleRegistration = async (data: any) => {
    try {
      const correctData = {
        username: data.username,
        password: data.password,
      };
      const response = await register(correctData);
      setTokens(response.accessToken, response.refreshToken);
      console.log('response', response);
      // Redirect to dashboard after successful registration
      navigate('/dashboard');
    } catch (error) {
      throw error; // Re-throw to let the form handle the error
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Center>
        <VStack spacing={8} w="full">
          <Box textAlign="center">
            <Logo width="100px" height="auto" />
          </Box>

          <RegistrationForm onSubmit={handleRegistration} />

          <Box textAlign="center">
            <Text color="gray.600">
              Už máte účet?{' '}
              <Link as={RouterLink} to="/login" color="blue.500" fontWeight="medium">
                Přihlaste se zde
              </Link>
            </Text>
          </Box>
        </VStack>
      </Center>
    </Container>
  );
};
