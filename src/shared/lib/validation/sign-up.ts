import {z} from "zod";

export const SignupFormSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  middleName: z.string().trim(),
  birthDate: z.string().date("Введите корректную дату"),
  email: z.string().email({ message: 'Введите корректную почту' }).trim(),
  emergencyPhone: z.string().trim(),
  gender: z.string(),
  password: z
    .string()
    .min(8, { message: 'Пароль должен быть длинее 8 символов' })
    .trim(),
  confirmPassword: z
    .string()
    .min(8, { message: 'Пароль должен быть длинее 8 символов' })
    .trim(),
})

export type FormState =
  | {
  errors?: {
    firstName: string[],
    lastName: string[],
    middleName: string[],
    birthDate: string[],
    email: string[],
    emergencyPhone: string[],
    gender: string[],
    password: string[],
    confirmPassword: string[],
  }
  message?: string
}
  | undefined
