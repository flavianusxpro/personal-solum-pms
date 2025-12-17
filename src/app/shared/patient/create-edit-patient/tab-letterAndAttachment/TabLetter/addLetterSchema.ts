import { messages } from '@/config/messages';
import z from 'zod';

export const addLetterSchema = z.object({
  subject: z.string().optional(),
  description: z.string().min(1, {
    message: messages.required('Description'),
  }),
});

export type AddLetterForm = z.infer<typeof addLetterSchema>;
