import { z } from 'zod';
import { fileSchema } from './common-rules';

export const requirementDoctorSchema = z.object({
  driverLicenceNumber: z
    .string()
    .min(1, 'Driver licence is required')
    .optional(),
  cpr: z
    .array(
      z.object({
        file: fileSchema,
        expirationDate: z.string(),
      })
    )
    .optional(),
});

export type RequirementDoctorTypes = z.infer<typeof requirementDoctorSchema>;
