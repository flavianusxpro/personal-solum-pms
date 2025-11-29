import { z } from 'zod';

// form zod validation schema
export const settingPaymentFormSchema = z.object({
  // payment
  production_mode: z.boolean().optional(),
  public_key: z.string().optional(),
  secret_key: z.string().optional(),
  is_active: z.boolean().optional(),
});

// generate form types from zod validation schema
export type SettingPaymentFormTypes = z.infer<typeof settingPaymentFormSchema>;
