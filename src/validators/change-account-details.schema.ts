import { z } from 'zod';

// form zod validation schema
export const changeMyDetailSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({
    message: 'Email is required',
  }),
});

// generate form types from zod validation schema
export type ChangeMyDetailSchema = z.infer<typeof changeMyDetailSchema>;
