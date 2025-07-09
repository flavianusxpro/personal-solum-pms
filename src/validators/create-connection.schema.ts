import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const connectionFormSchema = z.object({
  name: z.string().min(1, {
    message: messages.connectionNameRequired,
  }),
  base_url: z.string().min(1, { message: messages.baseUrlRequired }),
  access_token: z.string().min(1, {
    message: messages.connectionNameRequired,
  }),
});

// generate form types from zod validation schema
export type ConnectionFormTypes = z.infer<typeof connectionFormSchema>;
