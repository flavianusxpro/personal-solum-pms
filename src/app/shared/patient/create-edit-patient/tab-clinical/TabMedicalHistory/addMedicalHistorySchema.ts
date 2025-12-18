import { messages } from '@/config/messages';
import z from 'zod';

export const addMedicalHistorySchema = z.object({
  conditionDate: z.string().optional(),
  condition: z.string().optional(),
  severity: z.string().optional(),
  mhr: z.string().optional(),
  summary: z.string().optional(),
  comments: z.string().optional(),
  confidential: z.boolean().optional(),
});

export type AddMedicalHistoryForm = z.infer<typeof addMedicalHistorySchema>;