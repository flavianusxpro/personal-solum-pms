import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from './common-rules';

// form zod validation schema
export const createCouponSchema = z.object({
  select_type: z.string().min(1, { message: messages.typeIsRequired }),
  target_id: z.string().min(1, { message: messages.thisFieldIsRequired }),
  coupon_type: z.string().min(1, { message: messages.couponTypeIsRequired }),
  discount_type: z.string().min(1, {
    message: messages.discountTypeIsRequired,
  }),
  name: z.string().min(1, { message: messages.couponNameIsRequired }),
  code: z.string().min(1, { message: messages.couponCodeIsRequired }),
  value: z.string().min(1, { message: messages.valueIsRequired }),

  expiry_date: z.string().min(1, { message: messages.expiryDateIsRequired }),
  use_limit: z.string().min(1, { message: messages.useLimitIsRequired }),
  user_limit: z.string().min(1, { message: messages.userLimitIsRequired }),
});

// generate form types from zod validation schema
export type CreateCouponForm = z.infer<typeof createCouponSchema>;
