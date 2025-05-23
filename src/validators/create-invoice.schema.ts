import { z } from 'zod';
import { messages } from '@/config/messages';

export const invoiceFormSchema = z.object({
  patientId: z
    .number()
    .min(1, { message: messages.patientRequired })
    .nullable(),
  invoice_date: z
    .date({ required_error: messages.invoiceDateRequired })
    .nullable(),
  due_date: z.date({ required_error: messages.dueDateIsRequired }).nullable(),
  invoice_number: z.string().optional(),
  reference: z.string().optional(),
  branding_theme: z.string().optional(),
  note: z.string().optional().nullable(),
  fee: z.number().optional(),
  total_amount: z.number().min(0, { message: messages.nonNegative }),
  items: z
    .array(
      z.object({
        item: z
          .string({ required_error: messages.itemIsRequired })
          .refine((val) => val !== null, { message: messages.itemIsRequired }),
        description: z.string().optional(),
        amount: z.number().min(0, { message: messages.nonNegative }).nullable(),
        qty: z
          .number()
          .min(1, { message: messages.itemQtyIsRequired })
          .nullable(),
        total_amount: z
          .number()
          .min(0, { message: messages.nonNegative })
          .nullable(),
        tax_fee: z.number().optional(),
        taxId: z.number().optional(),
      })
    )
    .min(1, { message: messages.itemIsRequired })
    .nullable(),
  taxFee: z.number().min(0, { message: messages.nonNegative }).optional(),
  otherFee: z.string().min(0, { message: messages.nonNegative }).optional(),
});

// generate form types from zod validation schema
export type InvoiceFormInput = z.infer<typeof invoiceFormSchema>;
