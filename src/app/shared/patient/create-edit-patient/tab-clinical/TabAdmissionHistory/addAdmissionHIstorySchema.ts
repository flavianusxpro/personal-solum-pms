import { messages } from '@/config/messages';
import z from 'zod';

export const addAdmissionHistorySchema = z.object({
  admissionDate: z.string().optional(),
  status: z.string().optional(),
  dischargeDate: z.string().optional(),
  clinicBranch: z.string().optional(),
  attendingProvider: z.string().optional(),
  reasonForPresentation: z.string().optional(),
  procedurePerformed: z.string().optional(),
  dischargeSummary: z.array(z.instanceof(File)).optional(),
  notes: z.string().optional(),
  confidential: z.boolean().optional(),
});

export type AddAdmissionHistoryForm = z.infer<typeof addAdmissionHistorySchema>;