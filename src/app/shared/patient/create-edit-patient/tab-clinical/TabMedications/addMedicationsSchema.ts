import { messages } from '@/config/messages';
import z from 'zod';

export const addMedicationSchema = z.object({
  drugName: z.string().optional(),
  drugNameType: z.string().optional(),
  conditionDate: z.string().optional(),
  strength: z.string().optional(),
  dose: z.string().optional(),
  qty: z.number().optional(),
  repeats: z.number().optional(),
  isLongTerm: z.boolean().optional(),
  prescribedDate: z.string().optional(),
  endDate: z.string().optional(),
  reason: z.string().optional()
});

export type AddMedicationsForm = z.infer<typeof addMedicationSchema>;