import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const consentFormSchema = z.object({
  clientFirstName: z.string().min(1, { message: messages.firstNameRequired }),
  clientSurname: z.string().min(1, { message: messages.surnameRequired }),
  checkbox1: z.boolean().refine((val) => val === true, {
    message: messages.checkboxIsRequired,
  }),
  checkbox2: z.boolean().refine((val) => val === true, {
    message: messages.checkboxIsRequired,
  }),
  checkbox3: z.boolean().refine((val) => val === true, {
    message: messages.checkboxIsRequired,
  }),
  checkbox4: z.boolean().refine((val) => val === true, {
    message: messages.checkboxIsRequired,
  }),
  fullName: z.string().min(1, { message: messages.fullNameIsRequired }),
  date: z.string().min(1, { message: messages.dateIsRequired }),
  signature: z.string().min(1, { message: messages.signatureIsRequired }),
});

// generate form types from zod validation schema
export type ConsentFormInput = z.infer<typeof consentFormSchema>;
