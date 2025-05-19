import { z } from 'zod';

// form zod validation schema
export const registerSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(1),
  password_confirmation: z.string().min(1),
  mobile_number: z.string().min(1, { message: 'Mobile number is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  date_of_birth: z.string().min(1, { message: 'Date of birth is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  medicare_card_number: z
    .string()
    .min(1, { message: 'Medical card number is required' }),
  medicare_expired_date: z
    .string()
    .min(1, { message: 'Medical card expired date is required' }),
});

// generate form types from zod validation schema
export type RegisterSchema = z.infer<typeof registerSchema>;
