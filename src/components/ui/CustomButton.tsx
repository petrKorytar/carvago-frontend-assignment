import React from 'react';
import {Button as ChakraButton, ButtonProps as ChakraButtonProps} from '@chakra-ui/react';

interface CustomButtonProps extends ChakraButtonProps {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  iconPosition?: 'left' | 'right';
  iconSpacing?: string | number;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon,
  onClick,
  iconPosition = 'right',
  iconSpacing = 2,
  children,
  ...props
}) => {
  // If children are passed, use them instead of text/icon logic
  if (children) {
    return (
      <ChakraButton onClick={onClick} {...props}>
        {children}
      </ChakraButton>
    );
  }

  const renderContent = () => {
    if (!icon) {
      return text;
    }

    if (iconPosition === 'left') {
      return (
        <>
          {icon}
          <span
            style={{
              marginLeft: typeof iconSpacing === 'number' ? `${iconSpacing * 4}px` : iconSpacing,
            }}
          >
            {text}
          </span>
        </>
      );
    }

    return (
      <>
        {text}
        <span
          style={{
            marginLeft: typeof iconSpacing === 'number' ? `${iconSpacing * 4}px` : iconSpacing,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {icon}
        </span>
      </>
    );
  };

  return (
    <ChakraButton onClick={onClick} {...props}>
      {renderContent()}
    </ChakraButton>
  );
};
