import { messages } from '@/config/messages';
import z from 'zod';

export const addSettingsSchema = z.object({
  doctor: z.string().optional(),
});

export type AddSettingsForm = z.infer<typeof addSettingsSchema>;