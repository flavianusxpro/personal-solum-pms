import { messages } from '@/config/messages';
import z from 'zod';

export const addNewAllergySchema = z.object({
  allegen: z.string().optional(),
  reaction: z.string().optional(),
  severity: z.string().optional(),
  notes: z.string().optional(),
});

export type AddNewAllergyForm = z.infer<typeof addNewAllergySchema>;