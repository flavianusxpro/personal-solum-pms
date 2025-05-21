import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const patientDetailsFormSchema = z.object({
  title: z.string({ required_error: messages.titleRequired }),
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().optional(),
  gender: z.string().min(1, {
    message: messages.genderIsRequired,
  }),
  email: validateEmail,
  mobile_number: z.string().optional(),
  status: z.number().optional(),
  address: z.string().optional(),
  date_of_birth: z.string().min(1, {
    message: messages.dateOfBirthRequired,
  }),
  state: z.string().optional(),
  country: z.string().optional(),
  unit_number: z.string().optional(),
  suburb: z.string().optional(),
  street_name: z.string().optional(),
  post_code: z.string().max(4, {
    message: messages.postCodeMaxLength,
  }),
  description: z.string().optional(),
  notes: z.string().optional(),

  concession_card_type: z.string().optional(),
  concession_card_number: z.string().optional(),
  concession_card_expiry: z.date().optional(),

  medicare_card: z.string().min(10).max(13, { message: messages.maxLength }),
  medicare_expiry: z.date(),
  position_of_card: z
    .string()
    .max(2, { message: messages.maxLength })
    .optional(),
  avatar: z.string().optional(),
  password: z.string().optional(),
  timezone: z.string().optional(),
  patient_type: z.string().optional(),
  patient_problem: z.array(z.string()).optional(),
});

// generate form types from zod validation schema
export type PatientDetailsFormTypes = z.infer<typeof patientDetailsFormSchema>;

export const defaultValues = {
  first_name: '',
  last_name: undefined,
  email: '',
  avatar: undefined,
  role: undefined,
  country: undefined,
  timezone: undefined,
  bio: undefined,
  portfolios: undefined,
};
