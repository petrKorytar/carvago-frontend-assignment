import React from 'react';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginFormData, loginFormValidation} from '../../validations/loginFormValidation';
import {ReactComponent as ArrowForward} from '../../assets/icons/icon-foward.svg';
import {PasswordInput} from '../ui/PasswordInput';
import {CustomButton} from '../ui/CustomButton';

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
        position: 'top-right',
      });
      reset();
    } catch (error) {
      toast({
        title: 'Chyba při přihlášení',
        description: error instanceof Error ? error.message : 'Něco se pokazilo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <Box
      w="full"
      maxW="lg"
      mx="auto"
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      backgroundColor={'white'}
    >
      <Box textAlign="center" marginBottom={8}>
        <Heading as="h1" size="lg" color="text-primary" mb={4}>
          Přihlášení
        </Heading>
        <Text color="text-secondary" fontSize="text.base">
          Přihlaste se do svého účtu
        </Text>
      </Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <VStack spacing={8}>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel htmlFor="username">
              <Text as="span" color="text-danger">
                *
              </Text>{' '}
              Uživatelské jméno
            </FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="Zadejte vaše uživatelské jméno"
              borderColor={errors.username ? 'border-danger' : 'border-gray'}
              {...register('username')}
            />
            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
          </FormControl>

          <PasswordInput
            id="password"
            label="Heslo"
            placeholder="Zadejte heslo"
            required
            register={register}
            name="password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <CustomButton
            type="submit"
            colorScheme="blue"
            size="sm"
            width="full"
            borderRadius={100}
            isLoading={isSubmitting || isLoading}
            loadingText="Přihlašuji..."
          >
            Přihlásit se <ArrowForward color="white" style={{marginLeft: 8}} />
          </CustomButton>
        </VStack>
      </form>
    </Box>
  );
};
