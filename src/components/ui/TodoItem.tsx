import {EditIcon, CheckIcon, DeleteIcon} from '@chakra-ui/icons';
import {Card, CardBody, Flex, VStack, HStack, Badge, IconButton, Text} from '@chakra-ui/react';
import React from 'react';

type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

interface TodoItemProps {
  todo: Todo;
  handleEditTodo: (id: string) => void;
  handleToggleComplete: (id: string, completed: boolean) => void;
  handleDeleteTodo: (id: string) => void;
  isUpdatingTodo: boolean;
  isDeletingTodo: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleEditTodo,
  handleToggleComplete,
  handleDeleteTodo,
  isUpdatingTodo,
  isDeletingTodo,
}) => (
  <Card key={todo.id} variant="outline" size="sm">
    <CardBody>
      <Flex justify="space-between" align="center">
        <VStack align="start" spacing={1} flex={1}>
          <HStack spacing={2}>
            <Text
              fontWeight="medium"
              textDecoration={todo.completed ? 'line-through' : 'none'}
              color={todo.completed ? 'gray.500' : 'inherit'}
            >
              {todo.title}
            </Text>
            <Badge colorScheme={todo.completed ? 'green' : 'orange'} size="sm">
              {todo.completed ? 'Hotovo' : 'Aktivní'}
            </Badge>
          </HStack>
          {todo.description && (
            <Text fontSize="sm" color="gray.600">
              {todo.description}
            </Text>
          )}
        </VStack>
        <HStack spacing={1}>
          <IconButton
            aria-label="Označit jako hotové"
            icon={<CheckIcon />}
            size="sm"
            colorScheme={todo.completed ? 'gray' : 'green'}
            variant="outline"
            onClick={() => handleToggleComplete(todo.id, todo.completed)}
            isLoading={isUpdatingTodo}
          />
          <IconButton
            aria-label="Upravit úkol"
            icon={<EditIcon />}
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={() => handleEditTodo(todo.id)}
          />
          <IconButton
            aria-label="Smazat úkol"
            icon={<DeleteIcon />}
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={() => handleDeleteTodo(todo.id)}
            isLoading={isDeletingTodo}
          />
        </HStack>
      </Flex>
    </CardBody>
  </Card>
);

export default TodoItem;
