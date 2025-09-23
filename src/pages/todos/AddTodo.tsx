import React from 'react';
import {Container, VStack, Card, CardBody, useColorModeValue, useToast} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {TodoForm} from '../../components/forms/TodoForm';
import {useTodos} from '../../hooks/useTodos';
import {TodoFormData} from '../../validations/todoFormValidation';

export const AddTodo: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {createTodo, isCreatingTodo} = useTodos();
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleFormSubmit = async (data: TodoFormData) => {
    try {
      await createTodo({
        title: data.title,
        description: data.description || undefined,
      });
      toast({
        description: 'Nový úkol byl úspěšně vytvořen.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Vytvoření úkolu selhalo',
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

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Form */}
        <Card bg={cardBg} boxShadow="lg">
          <CardBody>
            <TodoForm
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              isLoading={isCreatingTodo}
              isEditMode={false}
            />
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};
