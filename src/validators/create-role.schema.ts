import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createRoleSchema = z.object({
  name: z.string().min(1, { message: messages.roleIsRequired }),
  permissions: z.array(
    z.string().min(1, { message: messages.permissionIsRequired })
  ),
});

// generate form types from zod validation schema
export type CreateRoleInput = z.infer<typeof createRoleSchema>;
