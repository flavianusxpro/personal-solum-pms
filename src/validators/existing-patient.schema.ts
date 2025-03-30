import { z } from 'zod';

// form zod validation schema
export const existingPatientSchema = z.object({
  patientFirstName: z.string().min(1, { message: 'First Name is required' }),
  patientLastName: z.string().min(1, { message: 'Last Name is required' }),
  patientMobilePhone: z
    .string()
    .min(8, { message: 'Mobile Phone is required' }),
  patienDateBirth: z.string().min(1, { message: 'Date of birth is required' }),
});

// generate form types from zod validation schema
export type ExistingPatientSchema = z.infer<typeof existingPatientSchema>;
