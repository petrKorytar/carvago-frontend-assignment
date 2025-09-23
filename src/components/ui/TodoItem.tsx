import {CheckIcon} from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  Flex,
  VStack,
  HStack,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import React, {memo, useCallback} from 'react';
import {ReactComponent as IconMore} from '../../assets/icons/icon-more.svg';
import {ReactComponent as EditIcon} from '../../assets/icons/icon-edit.svg';
import {ReactComponent as DeleteIcon} from '../../assets/icons/icon-delete.svg';

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

const TodoItem: React.FC<TodoItemProps> = memo(
  ({
    todo,
    handleEditTodo,
    handleToggleComplete,
    handleDeleteTodo,
    isUpdatingTodo,
    isDeletingTodo,
  }) => {
    const handleToggleClick = useCallback(() => {
      handleToggleComplete(todo.id, todo.completed);
    }, [handleToggleComplete, todo.id, todo.completed]);

    const handleEditClick = useCallback(() => {
      handleEditTodo(todo.id);
    }, [handleEditTodo, todo.id]);

    const handleDeleteClick = useCallback(() => {
      handleDeleteTodo(todo.id);
    }, [handleDeleteTodo, todo.id]);

    return (
      <Card key={todo.id} border={'hidden'} boxShadow="none" size="sm">
        <CardBody border={'hidden'} boxShadow="none">
          <Flex justify="space-between" align="center">
            <IconButton
              aria-label="Označit jako hotové"
              icon={<CheckIcon color={todo.completed ? 'white' : 'transparent'} />}
              size="sm"
              colorScheme={todo.completed ? 'blue' : 'gray'}
              variant="outline"
              backgroundColor={todo.completed ? undefined : 'transparent'}
              borderWidth="2px"
              onClick={handleToggleClick}
              isLoading={isUpdatingTodo}
            />
            <VStack align="start" spacing={1} flex={1} marginLeft={5}>
              <HStack spacing={2}>
                <Text fontWeight="500" color="text-primary">
                  {todo.title}
                </Text>
              </HStack>
              {todo.description && (
                <Text fontSize="sm" color="text-tertiary">
                  {todo.description}
                </Text>
              )}
            </VStack>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Možnosti úkolu"
                icon={<IconMore />}
                size="sm"
                variant="ghost"
                backgroundColor="transparent"
                colorScheme="gray"
              />
              <MenuList bg="fill-white" boxShadow="lg" border={'1px solid #CAD1DE'}>
                <MenuItem icon={<EditIcon />} onClick={handleEditClick}>
                  Upravit
                </MenuItem>
                <MenuItem
                  icon={<DeleteIcon style={{color: '#B71C1C'}} />}
                  color="text-danger"
                  _hover={{bg: 'fill-gray'}}
                  onClick={handleDeleteClick}
                  isDisabled={isDeletingTodo}
                >
                  <Text color="text-danger">Smazat</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </CardBody>
      </Card>
    );
  }
);

export default TodoItem;
