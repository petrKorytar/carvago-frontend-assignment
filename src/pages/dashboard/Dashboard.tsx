import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
} from '@chakra-ui/react';
import {useAuth} from '../../hooks/useAuth';
import {useNavigate} from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="center">
            <Box>
              <Heading as="h1" size="xl" color="blue.900">
                Dashboard
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Vítejte, {user?.firstName} {user?.lastName}!
              </Text>
            </Box>
            <Button colorScheme="red" variant="outline" onClick={handleLogout}>
              Odhlásit se
            </Button>
          </HStack>
        </Box>

        {/* Dashboard Content */}
        <VStack spacing={6} align="stretch">
          <Card bg={cardBg} boxShadow="lg">
            <CardHeader>
              <Heading size="md">Přehled účtu</Heading>
            </CardHeader>
            <CardBody>
              <VStack align="start" spacing={2}>
                <Text>
                  <strong>Email:</strong> {user?.email}
                </Text>
                <Text>
                  <strong>Jméno:</strong> {user?.firstName} {user?.lastName}
                </Text>
                <Text>
                  <strong>ID uživatele:</strong> {user?.id}
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg} boxShadow="lg">
            <CardHeader>
              <Heading size="md">Rychlé akce</Heading>
            </CardHeader>
            <CardBody>
              <HStack spacing={4}>
                <Button colorScheme="blue" variant="outline">
                  Správa profilu
                </Button>
                <Button colorScheme="green" variant="outline">
                  Nové úkoly
                </Button>
                <Button colorScheme="purple" variant="outline">
                  Nastavení
                </Button>
              </HStack>
            </CardBody>
          </Card>
        </VStack>
      </VStack>
    </Container>
  );
};
