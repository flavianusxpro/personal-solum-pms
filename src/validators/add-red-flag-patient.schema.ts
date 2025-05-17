import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const addRedFlagPatientSchema = z.object({
  category: z.string().min(1, {
    message: messages.required('Category'),
  }),
  description: z.string().min(1, {
    message: messages.required('Description'),
  }),
});

// generate form types from zod validation schema
export type AddRedFlagPatientForm = z.infer<typeof addRedFlagPatientSchema>;
