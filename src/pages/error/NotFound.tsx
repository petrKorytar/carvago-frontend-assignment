import React from 'react';
import {Box, Container, Heading, Text, Button, VStack, Center} from '@chakra-ui/react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.md" py={8}>
      <Center>
        <VStack spacing={8} textAlign="center">
          <Box>
            <Heading as="h1" size="4xl" color="text-danger" mb={4}>
              404
            </Heading>
            <Heading as="h2" size="xl" color="text-secondary" mb={4}>
              Stránka nenalezena
            </Heading>
            <Text color="text-secondary" fontSize="lg" mb={8}>
              Omlouváme se, ale stránka kterou hledáte neexistuje.
            </Text>
          </Box>

          <VStack spacing={4}>
            <Button colorScheme="blue" size="lg" onClick={() => navigate(-1)}>
              Zpět
            </Button>
            <Button as={RouterLink} to="/" variant="outline" size="lg">
              Domů
            </Button>
          </VStack>
        </VStack>
      </Center>
    </Container>
  );
};
