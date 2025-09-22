import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  registrationFormValidation,
  RegistrationFormData,
} from '../../validations/registrationFormValidation';

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => Promise<void>;
  isLoading?: boolean;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationFormValidation),
    mode: 'onBlur',
  });

  const handleFormSubmit = async (data: RegistrationFormData) => {
    try {
      await onSubmit(data);
      toast({
        title: 'Registrace úspěšná',
        description: 'Váš účet byl vytvořen.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset();
    } catch (error) {
      toast({
        title: 'Chyba při registraci',
        description: error instanceof Error ? error.message : 'Něco se pokazilo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" p={6} bg="white" borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel htmlFor="username">Uživatelské jméno</FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="Zadejte vaše uživatelské jméno"
              {...register('username')}
            />
            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Heslo</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Zadejte heslo"
              {...register('password')}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Potvrzení hesla</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Zadejte heslo znovu"
              {...register('confirmPassword')}
            />
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            isLoading={isSubmitting || isLoading}
            loadingText="Registruji..."
          >
            Registrovat se
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
