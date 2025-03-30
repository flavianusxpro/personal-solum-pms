import { z } from 'zod';

// form zod validation schema
export const patientSchema = z.object({
  patientTitle: z.string().min(1, { message: 'Title is required' }),
  patientGender: z.string().min(1, { message: 'Gender is required' }),
  patientFirstName: z.string().min(1, { message: 'First Name is required' }),
  patientLastName: z.string().min(1, { message: 'Last Name is required' }),
  patientEmailAddress: z
    .string()
    .email()
    .min(1, { message: 'Email Address is required' }),
  patientMobilePhone: z
    .string()
    .min(8, { message: 'Mobile Phone is required' }),
  patienDateBirth: z.string().min(1, { message: 'Date of birth is required' }),
  patientState: z.string().min(1, { message: 'State is required' }),
  patientSuburb: z.string().min(1, { message: 'Suburb is required' }),
  patientPostcode: z.string().min(1, { message: 'Postcode is required' }),
  patientAddressLine1: z
    .string()
    .min(1, { message: 'Address line is required' }),
  patientAddressLine2: z.string().optional(),

  medicareNumber: z.string().optional(),
  medicarePostOnCard: z.string().optional(),
  medicareExpiryDate: z.string().optional(),

  ConcessionCardType: z.string().optional(),
  ConcessionCardNumber: z.string().optional(),
  ConcessionExpiryDate: z.string().optional(),

  kinFullName: z.string().optional(),
  kinMobilePhone: z.string().optional(),
  kinRelationship: z.string().optional(),
});

// generate form types from zod validation schema
export type PatientSchema = z.infer<typeof patientSchema>;
