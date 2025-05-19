import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const emergencyContactSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().optional(),
  email: validateEmail,
  phone_number: z.string().optional(),
  relationship: z.string().optional(),
});

// generate form types from zod validation schema
export type EmergencyContactTypes = z.infer<typeof emergencyContactSchema>;

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
