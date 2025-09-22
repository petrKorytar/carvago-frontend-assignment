import React, {useState, useEffect} from 'react';
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
  Spinner,
  Center,
  Flex,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react';
import {useAuth} from '../../hooks/useAuth';
import {useTodos} from '../../hooks/useTodos';
import {useNavigate} from 'react-router-dom';
import TodoItem from '../../components/ui/TodoItem';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {ReactComponent as IconAdd} from '../../assets/icons/icon-add.svg';
import {ReactComponent as Image1} from '../../assets/Image1.svg';
import moment from 'moment';
import 'moment/locale/cs';

export const Dashboard: React.FC = () => {
  const {logout} = useAuth();
  const [currentTime, setCurrentTime] = useState(moment().locale('cs'));
  const {
    todos,
    isLoadingTodos,
    deleteTodo,
    completeTodo,
    incompleteTodo,
    isDeletingTodo,
    isCompletingTodo,
    isIncompletingTodo,
  } = useTodos();
  const navigate = useNavigate();
  const toast = useToast();

  // Aktualizace času každou sekundu
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().locale('cs'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleToggleComplete = async (todoId: string, completed: boolean) => {
    try {
      if (completed) {
        await incompleteTodo(todoId);
        toast({
          title: 'Úkol označen jako nehotový',
          description: 'Úkol byl úspěšně označen jako nehotový.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await completeTodo(todoId);
        toast({
          title: 'Úkol označen jako hotový',
          description: 'Úkol byl úspěšně označen jako hotový.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      toast({
        title: 'Chyba při aktualizaci',
        description: 'Nepodařilo se aktualizovat úkol.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(todoId);
      toast({
        title: 'Úkol smazán',
        description: 'Úkol byl úspěšně smazán.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to delete todo:', error);
      toast({
        title: 'Chyba při mazání',
        description: 'Nepodařilo se smazat úkol.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddTodo = () => {
    navigate('/add-todo');
  };

  const handleEditTodo = (todoId: string) => {
    navigate(`/edit-todo/${todoId}`);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="center">
            <Box>
              <Heading as="h1" size="xl" color="blue.900">
                <Logo width="150px" height="auto" />
              </Heading>
            </Box>
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                backgroundColor="transparent"
                leftIcon={<Avatar size="xs" name="Uživatel" bg="gray.200" />}
                fontSize="sm"
              >
                <Text
                  fontSize="sm"
                  fontWeight={400}
                  color="gray.700"
                  backgroundColor={'transparent'}
                >
                  Uživatel
                </Text>
              </MenuButton>
              <MenuList bg="white" boxShadow="lg" border={'1px solid #E6E8EF'}>
                <MenuItem color="red.500" _hover={{bg: 'red.50'}} onClick={handleLogout}>
                  Odhlásit se
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Box>

        {/* Todo List */}
        <VStack spacing={6} align="stretch">
          <Card bg={cardBg} boxShadow="lg">
            <CardHeader>
              <Flex justify="space-between" align="center">
                <VStack align="start" spacing={1}>
                  <Heading size="md">Ahoj uživateli!</Heading>
                  <Text fontSize="sm" color="gray.600">
                    {currentTime.format('dddd, D. MMMM YYYY, HH:mm:ss')}
                  </Text>
                </VStack>
                <Button colorScheme="blue" size="sm" onClick={handleAddTodo} fontWeight={400}>
                  Přidat úkol <IconAdd style={{marginLeft: 8}} />
                </Button>
              </Flex>
            </CardHeader>
            <CardBody>
              {isLoadingTodos && (
                <Center py={8}>
                  <Spinner size="lg" color="blue.500" />
                </Center>
              )}
              {todos.length > 0 ? (
                <VStack spacing={6} align="stretch">
                  {/* Sekce: K dokončení */}
                  {todos.filter((todo) => !todo.completed).length > 0 ? (
                    <Box>
                      <Heading
                        size="sm"
                        color="gray.700"
                        mb={3}
                        borderBottom={'1px solid #E6E8EF'}
                        pb={3}
                      >
                        TO DO
                      </Heading>
                      <VStack spacing={3} align="stretch">
                        {todos
                          .filter((todo) => !todo.completed)
                          .map((todo) => (
                            <TodoItem
                              key={todo.id}
                              todo={todo}
                              handleEditTodo={handleEditTodo}
                              handleToggleComplete={handleToggleComplete}
                              handleDeleteTodo={handleDeleteTodo}
                              isUpdatingTodo={isCompletingTodo || isIncompletingTodo}
                              isDeletingTodo={isDeletingTodo}
                            />
                          ))}
                      </VStack>
                    </Box>
                  ) : (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      gap={4}
                    >
                      <Image1 />
                      <Text fontSize="lg" fontWeight={700} color="gray.800">
                        Jste skvělí!
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Žádné další úkoly k dokončení
                      </Text>
                    </Box>
                  )}

                  {/* Sekce: Dokončené */}
                  {todos.filter((todo) => todo.completed).length > 0 && (
                    <Box>
                      <Heading
                        size="sm"
                        color="gray.700"
                        mb={3}
                        borderBottom={'1px solid #E6E8EF'}
                        pb={3}
                      >
                        Dokončené
                      </Heading>
                      <VStack spacing={3} align="stretch">
                        {todos
                          .filter((todo) => todo.completed)
                          .map((todo) => (
                            <TodoItem
                              key={todo.id}
                              todo={todo}
                              handleEditTodo={handleEditTodo}
                              handleToggleComplete={handleToggleComplete}
                              handleDeleteTodo={handleDeleteTodo}
                              isUpdatingTodo={isCompletingTodo || isIncompletingTodo}
                              isDeletingTodo={isDeletingTodo}
                            />
                          ))}
                      </VStack>
                    </Box>
                  )}
                </VStack>
              ) : (
                <Center py={8}>
                  <Text color="gray.500">Zatím nemáte žádné úkoly</Text>
                </Center>
              )}
            </CardBody>
          </Card>
        </VStack>
      </VStack>
    </Container>
  );
};
