import React, {memo, useCallback} from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react';
import {useAuth} from '../hooks/useAuth';
import {useNavigate} from 'react-router-dom';
import {ReactComponent as Logo} from '../assets/logo.svg';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = memo(({children}) => {
  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <Box bg="fill-gray" minH="100vh">
      <Container maxW="container.xl" py={8}>
        <Box>
          {/* Header */}
          <Box mb={8}>
            <HStack justify="space-between" align="center">
              <Box>
                <Heading as="h1" size="xl" color="text-primary">
                  <Logo width="150px" height="auto" />
                </Heading>
              </Box>
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  backgroundColor="transparent"
                  leftIcon={<Avatar size={{base: 'sm', md: 'xs'}} name="Uživatel" bg="gray.200" />}
                  fontSize="small"
                  display={{base: 'flex', md: 'flex'}}
                  justifyContent={{base: 'flex-end', md: 'flex-start'}}
                  p={{base: 1, md: 2}}
                  minW="auto"
                  h="auto"
                >
                  <Text
                    fontSize="text.small"
                    fontWeight={400}
                    color="text-secondary"
                    backgroundColor={'transparent'}
                    display={{base: 'none', md: 'block'}}
                  >
                    Uživatel
                  </Text>
                </MenuButton>
                <MenuList bg="fill-white" boxShadow="lg" border={'1px solid #CAD1DE'}>
                  <MenuItem color="text-danger" _hover={{bg: 'fill-gray'}} onClick={handleLogout}>
                    Odhlásit se
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Box>

          {/* Main Content */}
          {children}
        </Box>
      </Container>
    </Box>
  );
});

AppLayout.displayName = 'AppLayout';
