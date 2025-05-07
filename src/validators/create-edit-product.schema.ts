import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const productFormSchema = z.object({
  // sku: z.string({ required_error: messages.skuIsRequired }),
  // title: z.string({ required_error: messages.titleIsRequired }),
  code: z.string().min(1, {
    message: messages.codeIsRequired,
  }),
  name: z.string().min(1, {
    message: messages.codeIsRequired,
  }),
  description: z.string().optional(),
  price: z.string().min(1, {
    message: messages.priceIsRequired,
  }),
});

// generate form types from zod validation schema
export type ProductFormInput = z.infer<typeof productFormSchema>;
