import * as yup from 'yup';

// Login form validation schema
export const loginFormValidation = yup.object({
  username: yup
    .string()
    .required('Uživatelské jméno je povinné')
    .min(3, 'Uživatelské jméno musí mít alespoň 3 znaky'),
  password: yup.string().required('Heslo je povinné'),
});

export type LoginFormData = yup.InferType<typeof loginFormValidation>;
