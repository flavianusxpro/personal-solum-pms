import { z } from 'zod';

export const requirementDoctorSchema = z.object({
  driverLicenceNumber: z
    .string()
    .min(1, 'Driver licence is required')
    .optional(),
});

export type RequirementDoctorTypes = z.infer<typeof requirementDoctorSchema>;
