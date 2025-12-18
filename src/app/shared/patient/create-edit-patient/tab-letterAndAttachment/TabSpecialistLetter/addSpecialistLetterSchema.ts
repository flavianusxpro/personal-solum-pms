import { messages } from '@/config/messages';
import { z } from 'zod';

export const addSpecialistLetterSchema = z
  .object({
    specialistType: z
      .string()
      .min(1, { message: 'Specialist type is required' }),
    referralPurpose: z
      .string()
      .min(1, { message: 'Referral purpose is required' }),

    patientConditionSummary: z.string().min(1, {
      message: 'Patient condition summary is required',
    }),
    pastMedicalHistory: z.string().optional(),
    attachment: z.array(z.instanceof(File)).optional(),
  })

export type AddSpecialistLetterForm = z.infer<
  typeof addSpecialistLetterSchema
>;
