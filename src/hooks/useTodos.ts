import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import apiAxios from '../utils/apiAxios';

// Types
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateTodoData {
  title: string;
  description?: string;
}

interface UpdateTodoData {
  title?: string;
  description?: string;
  completed?: boolean;
}

// API functions
const todoApi = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await apiAxios.get('/api/todo/list');
    return response.data.todos;
  },

  getTodo: async (id: string): Promise<Todo> => {
    const response = await apiAxios.get(`/api/todo/${id}`);
    return response.data;
  },

  createTodo: async (data: CreateTodoData): Promise<Todo> => {
    const response = await apiAxios.post('/api/todo', data);
    return response.data;
  },

  updateTodo: async (id: string, data: UpdateTodoData): Promise<Todo> => {
    const response = await apiAxios.put(`/api/todo/${id}`, data);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await apiAxios.delete(`/api/todo/${id}`);
  },

  completeTodo: async (id: string): Promise<Todo> => {
    const response = await apiAxios.post(`/api/todo/${id}/complete`);
    return response.data;
  },

  incompleteTodo: async (id: string): Promise<Todo> => {
    const response = await apiAxios.post(`/api/todo/${id}/incomplete`);
    return response.data;
  },
};

// Main todos hook
export const useTodos = () => {
  const queryClient = useQueryClient();

  // Get all todos
  const {
    data: todos,
    isLoading: isLoadingTodos,
    error: todosError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getTodos,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Create todo mutation
  const createTodoMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: (error) => {
      console.error('Create todo failed:', error);
    },
  });

  // Update todo mutation
  const updateTodoMutation = useMutation({
    mutationFn: ({id, data}: {id: string; data: UpdateTodoData}) => todoApi.updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: (error) => {
      console.error('Update todo failed:', error);
    },
  });

  // Delete todo mutation
  const deleteTodoMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: (error) => {
      console.error('Delete todo failed:', error);
    },
  });

  // Complete todo mutation
  const completeTodoMutation = useMutation({
    mutationFn: todoApi.completeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: (error) => {
      console.error('Complete todo failed:', error);
    },
  });

  // Incomplete todo mutation
  const incompleteTodoMutation = useMutation({
    mutationFn: todoApi.incompleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: (error) => {
      console.error('Incomplete todo failed:', error);
    },
  });

  return {
    // Data
    todos: todos || [],
    isLoadingTodos,
    todosError,

    // Actions
    createTodo: createTodoMutation.mutateAsync,
    updateTodo: updateTodoMutation.mutateAsync,
    deleteTodo: deleteTodoMutation.mutateAsync,
    completeTodo: completeTodoMutation.mutateAsync,
    incompleteTodo: incompleteTodoMutation.mutateAsync,

    // Mutation states
    isCreatingTodo: createTodoMutation.isPending,
    isUpdatingTodo: updateTodoMutation.isPending,
    isDeletingTodo: deleteTodoMutation.isPending,
    isCompletingTodo: completeTodoMutation.isPending,
    isIncompletingTodo: incompleteTodoMutation.isPending,

    // Errors
    createTodoError: createTodoMutation.error,
    updateTodoError: updateTodoMutation.error,
    deleteTodoError: deleteTodoMutation.error,
    completeTodoError: completeTodoMutation.error,
    incompleteTodoError: incompleteTodoMutation.error,
  };
};

// Hook for single todo
export const useTodo = (id: string) => {
  const {
    data: todo,
    isLoading: isLoadingTodo,
    error: todoError,
  } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => todoApi.getTodo(id),
    enabled: !!id,
    staleTime: 30 * 1000, // 30 seconds
  });

  return {
    todo,
    isLoadingTodo,
    todoError,
  };
};
