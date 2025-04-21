import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const doctorDetailsFormSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string({ required_error: messages.lastNameRequired }),
  email: validateEmail,
  password: z.string({ required_error: messages.passwordRequired }),
  mobile_number: z.string(),
  date_of_birth: z.string({ required_error: messages.dateOfBirthIsRequired }),
  gender: z.string({ required_error: messages.genderIsRequired }),
  country: z.string({ required_error: messages.countryIsRequired }),
  street_number: z.string({ required_error: messages.streetIsRequired }),
  street_name: z.string({ required_error: messages.streetIsRequired }),
  address_line_1: z.string({ required_error: messages.addressLineOneRequired }),
  address_line_2: z.string({ required_error: messages.addressLineTwoRequired }),
  suburb: z.string({ required_error: messages.cityIsRequired }),
  state: z.string({ required_error: messages.stateIsRequired }),
  postcode: z.string({ required_error: messages.postCodeIsRequired }),
  emergency_first_name: z.string({
    required_error: messages.firstNameRequired,
  }),
  emergency_last_name: z.string({ required_error: messages.lastNameRequired }),
  emergency_mobile_number: z.string({
    required_error: messages.phoneNumberIsRequired,
  }),
  emergency_email: validateEmail,
  medical_interest: z.string({
    required_error: messages.medicalInterestIsRequired,
  }),
  specialist_type: z.array(
    z.string().min(1, { message: messages.specialistTypeIsRequired })
  ),
  treatment_type: z.string({
    required_error: messages.treatmentTypeIsRequired,
  }),
  language: z.array(z.string()),

  doctorType: z.array(z.string()).optional(),
  about: z.string().optional(),
  avatar: fileSchema.optional(),
});

// generate form types from zod validation schema
export type DoctorDetailsFormTypes = z.infer<typeof doctorDetailsFormSchema>;

export const defaultValues = {
  first_name: '',
  last_name: undefined,
  email: '',
  avatar: undefined,
  role: undefined,
  country: undefined,
  timezone: undefined,
  bio: undefined,
  portfolios: undefined,
};
