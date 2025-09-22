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
  Spinner,
  Center,
  Flex,
  useToast,
} from '@chakra-ui/react';
import {useAuth} from '../../hooks/useAuth';
import {useTodos} from '../../hooks/useTodos';
import {useNavigate} from 'react-router-dom';
import TodoItem from '../../components/ui/TodoItem';

export const Dashboard: React.FC = () => {
  const {logout} = useAuth();
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
                Dashboard
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Vítejte na dashboardu!
              </Text>
            </Box>
            <Button colorScheme="red" variant="outline" onClick={handleLogout}>
              Odhlásit se
            </Button>
          </HStack>
        </Box>

        {/* Todo List */}
        <VStack spacing={6} align="stretch">
          <Card bg={cardBg} boxShadow="lg">
            <CardHeader>
              <Flex justify="space-between" align="center">
                <Heading size="md">Moje úkoly</Heading>
                <Button colorScheme="blue" size="sm" onClick={handleAddTodo}>
                  Přidat úkol
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
                <VStack spacing={3} align="stretch">
                  {todos.map((todo) => (
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
