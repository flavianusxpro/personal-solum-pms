import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const refundInvoiceSchema = z.object({
  payment_method: z.string().optional(),
  reason: z.string().optional(),
});

// generate form types from zod validation schema
export type RefundInvoiceForm = z.infer<typeof refundInvoiceSchema>;
