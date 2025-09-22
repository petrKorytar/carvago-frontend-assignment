import React, {useEffect} from 'react';
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
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
  useToast,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTodos} from '../../hooks/useTodos';
import {TodoFormData, todoFormValidation} from '../../validations/todoFormValidation';

interface TodoFormProps {
  mode: 'create' | 'edit';
  initialData?: TodoFormData;
  todoId?: string;
}

export const TodoForm: React.FC<TodoFormProps> = ({mode, initialData, todoId}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const {createTodo, updateTodo, isCreatingTodo, isUpdatingTodo} = useTodos();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
    watch,
  } = useForm<TodoFormData>({
    resolver: yupResolver(todoFormValidation),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const descriptionValue = watch('description');

  // Load initial data for edit mode
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      reset(initialData);
    }
  }, [mode, initialData, reset]);

  const handleFormSubmit = async (data: TodoFormData) => {
    try {
      if (mode === 'create') {
        await createTodo({
          title: data.title,
          description: data.description || undefined,
        });
        toast({
          title: 'Úkol vytvořen',
          description: 'Nový úkol byl úspěšně vytvořen.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else if (mode === 'edit' && todoId) {
        await updateTodo({
          id: todoId,
          data: {
            title: data.title,
            description: data.description || undefined,
          },
        });
        toast({
          title: 'Úkol upraven',
          description: 'Úkol byl úspěšně upraven.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      // Navigate back to dashboard on success
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: `${mode === 'create' ? 'Vytvoření' : 'Úprava'} úkolu selhala`,
        description: error instanceof Error ? error.message : 'Něco se pokazilo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const isLoading = isCreatingTodo || isUpdatingTodo || isSubmitting;
  const isEditMode = mode === 'edit';

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading as="h1" size="xl" color="blue.900">
            {isEditMode ? 'Upravit úkol' : 'Nový úkol'}
          </Heading>
          <Text color="gray.600" fontSize="lg">
            {isEditMode ? 'Upravte informace o úkolu' : 'Vytvořte nový úkol s názvem a popisem'}
          </Text>
        </Box>

        {/* Form */}
        <Card bg={cardBg} boxShadow="lg">
          <CardHeader>
            <Heading size="md">Informace o úkolu</Heading>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <VStack spacing={6} align="stretch">
                {/* Title Field */}
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel htmlFor="title">
                    <Text as="span" color="red.500">
                      *
                    </Text>{' '}
                    Název úkolu
                  </FormLabel>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Zadejte název úkolu"
                    borderColor={errors.title ? 'red.500' : 'gray.300'}
                    _focus={{
                      borderColor: errors.title ? 'red.500' : 'blue.500',
                      boxShadow: errors.title ? '0 0 0 1px red.500' : '0 0 0 1px blue.500',
                    }}
                    {...register('title')}
                  />
                  <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                </FormControl>

                {/* Description Field */}
                <FormControl isInvalid={!!errors.description}>
                  <FormLabel htmlFor="description">Popis úkolu</FormLabel>
                  <Textarea
                    id="description"
                    placeholder="Zadejte popis úkolu (volitelné)"
                    rows={4}
                    resize="vertical"
                    borderColor={errors.description ? 'red.500' : 'gray.300'}
                    _focus={{
                      borderColor: errors.description ? 'red.500' : 'blue.500',
                      boxShadow: errors.description ? '0 0 0 1px red.500' : '0 0 0 1px blue.500',
                    }}
                    {...register('description')}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    {descriptionValue?.length || 0}/500 znaků
                  </Text>
                </FormControl>

                {/* Action Buttons */}
                <HStack spacing={4} justify="flex-end" pt={4}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    isDisabled={isLoading}
                  >
                    Zrušit
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isLoading}
                    loadingText={isEditMode ? 'Ukládám...' : 'Vytvářím...'}
                  >
                    {isEditMode ? 'Uložit změny' : 'Vytvořit úkol'}
                  </Button>
                </HStack>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};
