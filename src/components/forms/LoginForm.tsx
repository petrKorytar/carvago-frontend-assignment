import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginFormData, loginFormValidation} from '../../validations/loginFormValidation';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({onSubmit, isLoading = false}) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginFormValidation),
    mode: 'onBlur',
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      await onSubmit(data);
      toast({
        title: 'Přihlášení úspěšné',
        description: 'Vítejte zpět!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset();
    } catch (error) {
      toast({
        title: 'Chyba při přihlášení',
        description: error instanceof Error ? error.message : 'Něco se pokazilo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="full" maxW="2xl" mx="auto" p={6} bg="white" borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel htmlFor="username">
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              Uživatelské jméno
            </FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="Zadejte vaše uživatelské jméno"
              borderColor={errors.username ? 'red.500' : 'gray.300'}
              _focus={{
                borderColor: errors.username ? 'red.500' : 'blue.500',
                boxShadow: errors.username ? '0 0 0 1px red.500' : '0 0 0 1px blue.500',
              }}
              {...register('username')}
            />
            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">
              <Text as="span" color="red.500">
                *
              </Text>{' '}
              Heslo
            </FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Zadejte heslo"
              borderColor={errors.password ? 'red.500' : 'gray.300'}
              _focus={{
                borderColor: errors.password ? 'red.500' : 'blue.500',
                boxShadow: errors.password ? '0 0 0 1px red.500' : '0 0 0 1px blue.500',
              }}
              {...register('password')}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            borderRadius={100}
            isLoading={isSubmitting || isLoading}
            loadingText="Přihlašuji..."
          >
            Přihlásit se
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
