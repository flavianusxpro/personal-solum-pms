import { z } from 'zod';

export const configurationDoctorSchema = z.object({
  symthoms: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
      })
    )
    .optional(),
  specialist: z.array(z.string()).optional(),
});

export type ConfigurationDoctorTypes = z.infer<
  typeof configurationDoctorSchema
>;
