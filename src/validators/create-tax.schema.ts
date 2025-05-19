import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createTaxSchema = z.object({
  name: z.string().min(1, { message: messages.taxIsRequired }),
  description: z.string().optional(),
  value: z.string().min(1, { message: messages.taxValueIsRequired }),
});

// generate form types from zod validation schema
export type CreateTaxForm = z.infer<typeof createTaxSchema>;
