import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createSpecialistSchema = z.object({
  name: z.string().min(1, { message: messages.specialistTypeIsRequired }),
  description: z.string().optional(),
});

// generate form types from zod validation schema
export type CreateSpecialistInput = z.infer<typeof createSpecialistSchema>;
