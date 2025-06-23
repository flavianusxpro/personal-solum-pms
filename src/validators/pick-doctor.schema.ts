import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const pickDoctorFormSchema = z.object({
  doctorId: z.string().min(1, { message: messages.doctorIsRequired }),
});

// generate form types from zod validation schema
export type PickDoctorFormTypes = z.infer<typeof pickDoctorFormSchema>;

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
