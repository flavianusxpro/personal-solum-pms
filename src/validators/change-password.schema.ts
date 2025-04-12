import { z } from 'zod';

// form zod validation schema
export const changePasswordSchema = z
  .object({
    email: z.string(),
    newPassword: z.string().min(7, { message: 'New Password is required' }),
    confirmPassword: z
      .string()
      .min(7, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Confirm Password must match New Password',
    path: ['confirmPassword'], // This specifies the error path
  });

// generate form types from zod validation schema
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
