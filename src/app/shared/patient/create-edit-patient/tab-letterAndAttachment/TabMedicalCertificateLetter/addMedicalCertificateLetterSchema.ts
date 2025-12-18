import { messages } from '@/config/messages';
import { z } from 'zod';

export const addMedicalCertificateLetterSchema = z
  .object({
    certificateType: z
      .string()
      .min(1, { message: 'Certificate type is required' }),

    startDate: z.coerce.date({
      required_error: 'Start date is required',
      invalid_type_error: 'Invalid start date',
    }),

    endDate: z.coerce.date({
      required_error: 'End date is required',
      invalid_type_error: 'Invalid end date',
    }),

    reason: z.string().min(1, {
      message: messages.required('Description'),
    }),

    doctorSignature: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.endDate < data.startDate) {
      ctx.addIssue({
        path: ['endDate'],
        message: 'End date must be after or equal to start date',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type AddMedicalCertificateLetterForm = z.infer<
  typeof addMedicalCertificateLetterSchema
>;
