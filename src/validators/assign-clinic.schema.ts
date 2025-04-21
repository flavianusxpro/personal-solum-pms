import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const assignClinicSchema = z.object({
  clinic: z.array(z.string({ required_error: messages.clinicIsRequired })),
});

// generate form types from zod validation schema
export type AssignClinicTypes = z.infer<typeof assignClinicSchema>;
