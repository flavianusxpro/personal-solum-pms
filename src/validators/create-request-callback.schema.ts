import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from './common-rules';

// form zod validation schema
export const createRequestCallbackSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  email: validateEmail,
  mobile_number: z.string().min(1, {
    message: messages.mobileNumberIsRequired,
  }),
  reason: z.string().min(1, {
    message: 'reason is required',
  }),
  status: z.string().optional(),
  patient_preferred_time: z.string().optional(),
  patient_time: z.string().optional(),
});

// generate form types from zod validation schema
export type CreateRequestCallbackForm = z.infer<
  typeof createRequestCallbackSchema
>;
