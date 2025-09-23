import React from 'react';
import {
  Text,
  VStack,
  HStack,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
  IconButton,
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {TodoFormData, todoFormValidation} from '../../validations/todoFormValidation';
import {CustomButton} from '../ui/CustomButton';
import {ReactComponent as CheckIcon} from '../../assets/icons/icon-check.svg';
import {ReactComponent as BackwardsIcon} from '../../assets/icons/icon-backwards.svg';

interface TodoFormProps {
  initialData?: TodoFormData;
  onSubmit: (data: TodoFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
  isEditMode: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  isEditMode,
}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm<TodoFormData>({
    resolver: yupResolver(todoFormValidation),
    mode: 'onBlur',
    defaultValues: initialData || {
      title: '',
      description: '',
    },
  });

  const descriptionValue = watch('description');

  // Reset form when initialData changes
  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" paddingX={3}>
        <HStack justify="space-start" spacing={6} align="center" marginY={7}>
          <IconButton
            type="button"
            variant="ghost"
            onClick={onCancel}
            isDisabled={isLoading}
            size="sm"
            borderRadius="full"
            bg="gray.100"
            borderColor="transparent"
            _hover={{bg: 'gray.200'}}
            icon={<BackwardsIcon color="gray.600" />}
            aria-label="Zrušit"
            minW="40px"
            h="40px"
          />
          <Text fontWeight={700} fontSize={'24px'}>
            {initialData ? initialData.title : 'Nový úkol'}
          </Text>
        </HStack>
        {/* Title Field */}
        <FormControl isInvalid={!!errors.title}>
          <FormLabel htmlFor="title" fontSize={'small'}>
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
            {...register('title')}
          />
          <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
        </FormControl>

        {/* Description Field */}
        <FormControl isInvalid={!!errors.description}>
          <FormLabel htmlFor="description" fontSize={'small'}>
            Popis úkolu
          </FormLabel>
          <Textarea
            id="description"
            placeholder="Zadejte popis úkolu (volitelné)"
            rows={4}
            resize="vertical"
            borderColor={'gray.300'}
            {...register('description')}
          />
          <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
        </FormControl>

        {/* Action Buttons */}
        <Stack
          w="full"
          justify={{base: 'stretch', md: 'space-between'}}
          pt={4}
          direction={{base: 'column', md: 'row'}}
          spacing={{base: 3, md: 4}}
          align={{base: 'stretch', md: 'center'}}
        >
          <CustomButton
            type="button"
            variant="outline"
            onClick={onCancel}
            isDisabled={isLoading}
            w={{base: 'full', md: 'auto'}}
            text="Zrušit"
            size="sm"
            backgroundColor="#F1F2F6"
            fontWeight={500}
          />
          <CustomButton
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            loadingText={isEditMode ? 'Ukládám...' : 'Vytvářím...'}
            w={{base: 'full', md: 'auto'}}
            text={isEditMode ? 'Uložit změny' : 'Vytvořit úkol'}
            size="sm"
            fontWeight={500}
            icon={<CheckIcon color="white" style={{marginLeft: 3}} />}
          />
        </Stack>
      </VStack>
    </form>
  );
};
