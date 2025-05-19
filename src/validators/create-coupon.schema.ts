import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const createCouponSchema = z.object({
  select_type: z.string().min(1, { message: messages.typeIsRequired }),
  target_id: z.string().optional(),
  coupon_type: z.string().min(1, { message: messages.couponTypeIsRequired }),
  discount_type: z.string().min(1, {
    message: messages.discountTypeIsRequired,
  }),
  name: z.string().min(1, { message: messages.couponNameIsRequired }),
  code: z.string().min(1, { message: messages.couponCodeIsRequired }),
  discount_amount: z.string().min(1, { message: messages.valueIsRequired }),
  restrict_patient: z.array(z.string()).optional(),

  expiry_date: z.string().min(1, { message: messages.expiryDateIsRequired }),
  use_limit: z.string().min(1, { message: messages.useLimitIsRequired }),
  patient_limit_use: z
    .string()
    .min(1, { message: messages.userLimitIsRequired }),
  description: z.string().optional(),
});

// generate form types from zod validation schema
export type CreateCouponForm = z.infer<typeof createCouponSchema>;
