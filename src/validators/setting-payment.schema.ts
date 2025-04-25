import { z } from 'zod';

// form zod validation schema
export const settingPaymentFormSchema = z.object({
  // payment
  card_payment_status: z.boolean().optional(),
  payment_method: z.array(z.string()).optional(),
  eftpos_status: z.boolean().optional(),
  cash_status: z.boolean().optional(),
});

// generate form types from zod validation schema
export type SettingPaymentFormTypes = z.infer<typeof settingPaymentFormSchema>;
