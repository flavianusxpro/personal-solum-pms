import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const connectionFormSchema = z.object({
  hostname: z.string().min(1, { message: messages.hostnameIsRequired }),
  access_token: z.string().min(1, {
    message: messages.connectionNameRequired,
  }),
  x_token: z.string().optional(),
  x_session_id: z.string().optional(),
});

// generate form types from zod validation schema
export type ConnectionFormTypes = z.infer<typeof connectionFormSchema>;
