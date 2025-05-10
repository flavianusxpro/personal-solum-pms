import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const cancelAppoinmentSchema = z.object({
  reason: z.string().optional(),
});

// generate form types from zod validation schema
export type CancelAppointmentForm = z.infer<typeof cancelAppoinmentSchema>;
