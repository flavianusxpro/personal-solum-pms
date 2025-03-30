import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const paymentMethodFormSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  cardNumber: z.string(),
  expiryDate: z.string().min(1, { message: messages.cardExpireIsRequired }),
  cvv: z.string().length(3, { message: messages.cvcNumberIsRequired }),
});

export type PaymentMethodFormInput = z.infer<typeof paymentMethodFormSchema>;
