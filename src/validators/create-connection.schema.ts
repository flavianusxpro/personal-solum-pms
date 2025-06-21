import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const connectionFormSchema = z.object({
  connection_name: z
    .string()
    .min(1, { message: messages.connectionNameRequired }),
});

// generate form types from zod validation schema
export type ConnectionFormTypes = z.infer<typeof connectionFormSchema>;

export const defaultValues = {
  first_name: '',
  last_name: undefined,
  email: '',
  avatar: undefined,
  role: undefined,
  country: undefined,
  timezone: undefined,
  bio: undefined,
  portfolios: undefined,
};
