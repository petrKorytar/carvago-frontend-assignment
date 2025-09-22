import React from 'react';
import {useParams} from 'react-router-dom';
import {TodoForm} from '../../components/forms/TodoForm';
import {useTodo} from '../../hooks/useTodos';
import {Container, Spinner, Center, Text} from '@chakra-ui/react';

export const EditTodo: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const {todo, isLoadingTodo, todoError} = useTodo(id || '');

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
    <TodoForm
      mode="edit"
      todoId={id}
      initialData={{
        title: todo.title,
        description: todo.description || '',
      }}
    />
  );
};
