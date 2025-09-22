import React from 'react';
import {Box, Container, Heading, Text, Link, VStack, Center} from '@chakra-ui/react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {RegistrationForm} from '../../components/forms/RegistrationForm';
import {useAuth} from '../../hooks/useAuth';

export const Registration: React.FC = () => {
  const {register} = useAuth();
  const navigate = useNavigate();

  const handleRegistration = async (data: any) => {
    try {
      const correctData = {
        username: data.username,
        password: data.password,
      };
      await register(correctData);
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
            <Heading as="h1" size="xl" color="blue.900" mb={4}>
              Registrace
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Vytvořte si nový účet a začněte používat naši aplikaci
            </Text>
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
