import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const connectionFormSchema = z.object({
  connection_name: z.string().min(1, {
    message: messages.connectionNameRequired,
  }),
  hostname: z.string().min(1, { message: messages.hostnameIsRequired }),
  access_token: z.string().min(1, {
    message: messages.connectionNameRequired,
  }),
});

// generate form types from zod validation schema
export type ConnectionFormTypes = z.infer<typeof connectionFormSchema>;
