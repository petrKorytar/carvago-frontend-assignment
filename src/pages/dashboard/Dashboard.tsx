import React, {useState, useEffect} from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Spinner,
  Center,
  Flex,
  useToast,
} from '@chakra-ui/react';
import {useTodos} from '../../hooks/useTodos';
import {useNavigate} from 'react-router-dom';
import TodoItem from '../../components/ui/TodoItem';
import {ReactComponent as IconAdd} from '../../assets/icons/icon-add.svg';
import {ReactComponent as Image1} from '../../assets/Image1.svg';
import moment from 'moment';
import 'moment/locale/cs';

export const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(moment().locale('cs').format('DD.MM.YYYY'));
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

  const handleToggleComplete = async (todoId: string, completed: boolean) => {
    try {
      if (completed) {
        await incompleteTodo(todoId);
        toast({
          title: 'Úkol označen jako nehotový',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        await completeTodo(todoId);
        toast({
          title: 'Úkol označen jako hotový',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      toast({
        title: 'Chyba při aktualizaci',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(todoId);
      toast({
        title: 'Úkol smazán',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.error('Failed to delete todo:', error);
      toast({
        title: 'Chyba při mazání',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
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
    <VStack spacing={8} align="stretch">
      {/* Todo List */}
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg} boxShadow="lg">
          <CardHeader>
            <Flex
              direction={{base: 'column', md: 'row'}}
              justify={{base: 'flex-start', md: 'space-between'}}
              align={{base: 'stretch', md: 'center'}}
              gap={4}
            >
              <VStack align="start" spacing={1}>
                <Heading size="md">Ahoj uživateli!</Heading>
                <Text fontSize="sm" color="gray.600">
                  {currentTime}
                </Text>
              </VStack>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={handleAddTodo}
                fontWeight={400}
                w={{base: 'full', md: 'auto'}}
              >
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
                      fontWeight={600}
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
                      fontWeight={600}
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
  );
};
