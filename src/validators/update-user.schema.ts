import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from './common-rules';

// form zod validation schema
export const updateUserSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  email: validateEmail,
  roleId: z.number().min(1, { message: messages.roleIsRequired }),
  clinic_ids: z.array(z.string()).optional(),
});

// generate form types from zod validation schema
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
