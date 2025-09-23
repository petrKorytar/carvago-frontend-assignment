import {CheckIcon} from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  Flex,
  VStack,
  HStack,
  Badge,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import React from 'react';
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

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleEditTodo,
  handleToggleComplete,
  handleDeleteTodo,
  isUpdatingTodo,
  isDeletingTodo,
}) => (
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
          onClick={() => handleToggleComplete(todo.id, todo.completed)}
          isLoading={isUpdatingTodo}
        />
        <VStack align="start" spacing={1} flex={1} marginLeft={5}>
          <HStack spacing={2}>
            <Text fontWeight="500">{todo.title}</Text>
          </HStack>
          {todo.description && (
            <Text fontSize="sm" color="#7A869A">
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
          <MenuList bg="white" boxShadow="lg" border={'1px solid #E6E8EF'}>
            <MenuItem icon={<EditIcon />} onClick={() => handleEditTodo(todo.id)}>
              Upravit
            </MenuItem>
            <MenuItem
              icon={<DeleteIcon style={{color: '#E53E3E'}} />}
              color="red.500"
              _hover={{bg: 'gray.100'}}
              onClick={() => handleDeleteTodo(todo.id)}
              isDisabled={isDeletingTodo}
            >
              <Text color="red.500">Smazat</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </CardBody>
  </Card>
);

export default TodoItem;
