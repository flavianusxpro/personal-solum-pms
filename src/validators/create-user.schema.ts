import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from './common-rules';

// form zod validation schema
export const createUserSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  email: validateEmail,
  password: z.string().min(6, { message: messages.passwordIsRequired }),
  roleId: z.number().min(1, { message: messages.roleIsRequired }),
  clinic_ids: z.array(z.string()),
});

// generate form types from zod validation schema
export type CreateUserInput = z.infer<typeof createUserSchema>;
