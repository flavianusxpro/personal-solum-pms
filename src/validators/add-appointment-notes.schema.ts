import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const addAppointmentNotesSchema = z.object({
  notes: z.string().optional(),
});

// generate form types from zod validation schema
export type AddAppointmentNotesForm = z.infer<typeof addAppointmentNotesSchema>;
