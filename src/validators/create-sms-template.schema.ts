import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const smsTemplateFormSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  text: z
    .string()
    .min(10, { message: messages.textIs100MinLength })
    .max(300, { message: messages.textIs100MaxLength }),
});

// generate form types from zod validation schema
export type SmsTemplateFormTypes = z.infer<typeof smsTemplateFormSchema>;
