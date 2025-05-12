import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const addRedFlagPatientSchema = z.object({
  notes: z.string().optional(),
});

// generate form types from zod validation schema
export type AddRedFlagPatientForm = z.infer<typeof addRedFlagPatientSchema>;
