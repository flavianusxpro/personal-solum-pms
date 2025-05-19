import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const emailTemplateFormSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  html: z.string().min(1, { message: messages.htmlIsRequired }),
});

// generate form types from zod validation schema
export type EmailTemplateFormTypes = z.infer<typeof emailTemplateFormSchema>;
