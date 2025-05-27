import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const addPatientDocumentationSchema = z.object({
  name: z.string().min(1, {
    message: messages.required('Name'),
  }),
  file: z
    .instanceof(File, {
      message: messages.required('File'),
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: messages.maxFileSize('File', '5MB'),
    }),
});

// generate form types from zod validation schema
export type AddPatientDocumentationForm = z.infer<
  typeof addPatientDocumentationSchema
>;
