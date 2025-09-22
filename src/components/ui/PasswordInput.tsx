import React, {useState} from 'react';
import {Input, FormControl, FormLabel, FormErrorMessage, Text, Box} from '@chakra-ui/react';
import {ReactComponent as ShowIcon} from '../../assets/icons/icon-show.svg';
import {ReactComponent as HideIcon} from '../../assets/icons/icon.hide.svg';

interface PasswordInputProps {
  id?: string;
  placeholder?: string;
  register: any;
  name: string;
  isInvalid?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  borderColor?: string;
  _focus?: any;
  [key: string]: any; // pro spread props
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  placeholder = 'Zadejte heslo',
  register,
  name,
  isInvalid = false,
  errorMessage,
  label,
  required = false,
  borderColor,
  _focus,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isInvalid={isInvalid}>
      {label && (
        <FormLabel htmlFor={id}>
          {required && (
            <Text as="span" color="red.500">
              *
            </Text>
          )}{' '}
          {label}
        </FormLabel>
      )}
      <Box position="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          name={name}
          pr="45px"
          borderColor={borderColor || (isInvalid ? 'red.500' : 'gray.300')}
          _focus={
            _focus || {
              borderColor: isInvalid ? 'red.500' : 'blue.500',
              boxShadow: isInvalid ? '0 0 0 1px red.500' : '0 0 0 1px blue.500',
            }
          }
          {...register(name)}
          {...props}
        />
        <Box
          as="button"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          cursor="pointer"
          color="gray.500"
          _hover={{color: 'gray.700'}}
          _focus={{outline: 'none'}}
          aria-label={showPassword ? 'Skrýt heslo' : 'Zobrazit heslo'}
          display="flex"
          alignItems="center"
          background="transparent"
          justifyContent="center"
          w="20px"
          h="20px"
          position="absolute"
          right="12px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
        >
          {showPassword ? (
            <HideIcon width="16px" height="16px" />
          ) : (
            <ShowIcon width="16px" height="16px" />
          )}
        </Box>
      </Box>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
