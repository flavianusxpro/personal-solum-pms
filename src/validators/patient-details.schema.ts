import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const patientDetailsFormSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().optional(),
  gender: z.string().optional(),
  email: validateEmail,
  mobile_number: z.string().optional(),
  status: z.number().optional(),
  address: z.string().optional(),
  date_of_birth: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  suburb: z.string().optional(),
  street: z.string().optional(),
  post_code: z.string().max(4, {
    message: messages.postCodeMaxLength,
  }),
  medicare_card: z.string().optional(),
  medicare_expiry: z.string().optional(),
  position_of_card: z.string().optional(),
  avatar: fileSchema.optional(),
  password: z.string().optional(),
  timezone: z.string().optional(),
  patient_type: z.number().min(1, {
    message: messages.patientTypeRequired,
  }),
  patient_problem: z.number().min(1, {
    message: messages.patientProblemRequired,
  }),
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
