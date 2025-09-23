import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Spinner,
  Center,
  useToast,
} from '@chakra-ui/react';
import {TodoForm} from '../../components/forms/TodoForm';
import {useTodo, useTodos} from '../../hooks/useTodos';
import {TodoFormData} from '../../validations/todoFormValidation';

export const EditTodo: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const toast = useToast();
  const {todo, isLoadingTodo, todoError} = useTodo(id || '');
  const {updateTodo, isUpdatingTodo} = useTodos();
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleFormSubmit = async (data: TodoFormData) => {
    try {
      if (id) {
        await updateTodo({
          id,
          data: {
            title: data.title,
            description: data.description || undefined,
          },
        });
        toast({
          description: 'Úkol byl úspěšně upraven.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Úprava úkolu selhala',
        description: error instanceof Error ? error.message : 'Něco se pokazilo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (isLoadingTodo) {
    return (
      <Container maxW="container.md" py={8}>
        <Center>
          <Spinner size="lg" color="blue.500" />
        </Center>
      </Container>
    );
  }

  if (todoError || !todo) {
    return (
      <Container maxW="container.md" py={8}>
        <Center>
          <Text color="red.500">Úkol nebyl nalezen nebo došlo k chybě</Text>
        </Center>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Form */}
        <Card bg={cardBg} boxShadow="lg">
          <CardBody>
            <TodoForm
              initialData={{
                title: todo.title,
                description: todo.description || '',
              }}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              isLoading={isUpdatingTodo}
              isEditMode={true}
            />
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};
