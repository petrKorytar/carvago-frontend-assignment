import * as yup from 'yup';

// Todo form validation schema
export const todoFormValidation = yup.object({
  title: yup
    .string()
    .required('Název úkolu je povinný')
    .min(1, 'Název úkolu nesmí být prázdný')
    .max(100, 'Název úkolu může mít maximálně 100 znaků')
    .trim(),
  description: yup.string().max(500, 'Popis může mít maximálně 500 znaků').trim().default(''),
});

export type TodoFormData = yup.InferType<typeof todoFormValidation>;
