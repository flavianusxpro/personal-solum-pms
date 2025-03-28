import { z } from 'zod';

// form zod validation schema
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(7, { message: 'Current Password is required' }),
  newPassword: z.string().min(7, { message: 'New Password is required' }),
  confirmPassword: z
    .string()
    .min(7, { message: 'Confirm Password is required' }),
});

// generate form types from zod validation schema
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
