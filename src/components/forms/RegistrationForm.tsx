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
import {
  registrationFormValidation,
  RegistrationFormData,
} from '../../validations/registrationFormValidation';
import {ReactComponent as ArrowForward} from '../../assets/icons/icon-foward.svg';
import {PasswordInput} from '../ui/PasswordInput';
import {CustomButton} from '../ui/CustomButton';

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
    <Box w="full" maxW="xl" mx="auto" p={6} borderRadius="lg" boxShadow="lg">
      <Box textAlign="center" marginBottom={8}>
        <Heading as="h1" size="lg" color="blue.900" mb={4}>
          Registrace
        </Heading>
        <Text color="gray.600" fontSize="md">
          Vytvořte si nový účet a začněte používat naši aplikaci
        </Text>
      </Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <VStack spacing={8}>
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

          <PasswordInput
            id="confirmPassword"
            label="Potvrzení hesla"
            placeholder="Zadejte heslo znovu"
            required
            register={register}
            name="confirmPassword"
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />

          <CustomButton
            type="submit"
            colorScheme="blue"
            size="sm"
            width="full"
            borderRadius={100}
            isLoading={isSubmitting || isLoading}
            loadingText="Registruji..."
          >
            Registrovat se <ArrowForward color="white" style={{marginLeft: 8}} />
          </CustomButton>
        </VStack>
      </form>
    </Box>
  );
};
