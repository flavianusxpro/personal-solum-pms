import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const addPatientDocumentationSchema = z.object({
  name: z.string().min(1, {
    message: messages.required('Name'),
  }),
  files: z.array(z.instanceof(File)).min(1, {
    message: messages.required('File'),
  }),
});

// generate form types from zod validation schema
export type AddPatientDocumentationForm = z.infer<
  typeof addPatientDocumentationSchema
>;
