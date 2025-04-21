import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const productFormSchema = z.object({
  sku: z.string({ required_error: messages.skuIsRequired }),
  title: z.string({ required_error: messages.titleIsRequired }),
  description: z.string().optional(),
  cost_price: z.string({
    required_error: messages.costPriceIsRequired,
  }),
  sell_price: z.string({
    required_error: messages.sellPriceIsRequired,
  }),
});

// generate form types from zod validation schema
export type ProductFormInput = z.infer<typeof productFormSchema>;
