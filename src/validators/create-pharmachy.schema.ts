import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from './common-rules';

// form zod validation schema
export const createPharmachySchema = z.object({
  clinicId: z.number().min(1, { message: messages.clinicIsRequired }),
  name: z.string().min(1, { message: messages.pharmachyNameIsRequired }),
  dispense_email: validateEmail,
  phone: z.string().min(1, {
    message: messages.phoneNumberIsRequired,
  }),
  billing_email: validateEmail,
  website: z.string().optional(),

  address_line_1: z.string().min(1, {
    message: messages.addressIsRequired,
  }),
  address_line_2: z.string().min(1, {
    message: messages.addressIsRequired,
  }),
  city: z.string().min(1, {
    message: messages.cityIsRequired,
  }),
  state: z.string().min(1, {
    message: messages.stateIsRequired,
  }),
  postcode: z
    .string()
    .min(1, {
      message: messages.postCodeIsRequired,
    })
    .max(4, {
      message: messages.maxLength,
    }),
  url_logo: z.string().optional(),
});

// generate form types from zod validation schema
export type CreatePharmachyForm = z.infer<typeof createPharmachySchema>;
