import * as yup from 'yup';

// Validation schema
export const registrationFormValidation = yup.object({
  username: yup.string().required('Jméno je povinné').min(2, 'Jméno musí mít alespoň 2 znaky'),
  password: yup.string().min(6, 'Heslo musí mít alespoň 6 znaků').required('Heslo je povinné'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Hesla se neshodují')
    .required('Potvrzení hesla je povinné'),
});

export type RegistrationFormData = yup.InferType<typeof registrationFormValidation>;
