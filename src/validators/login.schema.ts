import { z } from 'zod';

// form zod validation schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7, { message: 'Password is required' }),
  rememberMe: z.boolean().optional(),
  role: z.string().optional(),
});

// generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;
