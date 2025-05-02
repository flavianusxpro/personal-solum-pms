import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createTreatmentSchema = z.object({
  name: z.string().min(1, { message: messages.treatmentTypeIsRequired }),
  description: z.string().optional(),
});

// generate form types from zod validation schema
export type CreateTreatmentInput = z.infer<typeof createTreatmentSchema>;
