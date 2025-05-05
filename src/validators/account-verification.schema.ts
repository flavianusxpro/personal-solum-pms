import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from './common-rules';

// form zod validation schema
export const verificationAccountSchema = z
  .object({
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.passwordsDoNotMatch,
    path: ['confirmPassword', 'password'],
  });

// generate form types from zod validation schema
export type VerificationAccountSchemaForm = z.infer<
  typeof verificationAccountSchema
>;
