import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createApiConnectSchema = z.object({
  name: z.string().min(1, { message: messages.connectionNameRequired }),
  hostname: z.string().min(1, { message: messages.hostnameIsRequired }),
});

// generate form types from zod validation schema
export type CreateApiConnectInput = z.infer<typeof createApiConnectSchema>;
