import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from './common-rules';

// form zod validation schema
export const createBranchSchema = z.object({
  name: z.string().min(1, { message: messages.branchIsRequired }),
  email: validateEmail,
  mobile_number: z.string().min(1, {
    message: messages.mobileNumberIsRequired,
  }),
  address: z.string().min(1, {
    message: messages.addressIsRequired,
  }),
  url_logo: z.string().optional(),
  default: z.number().optional(),
  status: z.number().optional(),
});

// generate form types from zod validation schema
export type CreateBranchForm = z.infer<typeof createBranchSchema>;
