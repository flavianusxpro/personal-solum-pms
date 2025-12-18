import { messages } from '@/config/messages';
import z from 'zod';

export const addImmunisationSchema = z.object({
  givenDate: z.string().optional(),
  batchNumber: z.number().optional(),
  vaccine: z.string().optional(),
  dose: z.string().optional(),
  site: z.string().optional(),
  route: z.string().optional(),
  orderedBy: z.string().optional(),
  givenBy: z.string().optional(),
  notes: z.string().optional(),
  confidential: z.boolean().optional(),
  given: z.boolean().optional()
});

export type AddImmunisationForm = z.infer<typeof addImmunisationSchema>;