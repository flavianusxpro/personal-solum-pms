import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const patientProblemSchema = z.object({
  name: z.string().min(1, { message: messages.conditionNameIsRequired }),
  is_active: z.number().optional(),
});

export const typeProblemSchema = z.object({
  name: z.string().min(1, { message: messages.categoryNameIsRequired }),
  description: z.string().optional(),
  is_active: z.number().optional(),
});

// generate form types from zod validation schema
export type PatienProblemSchemaType = z.infer<typeof patientProblemSchema>;
export type TypeProblemSchemaType = z.infer<typeof typeProblemSchema>;
