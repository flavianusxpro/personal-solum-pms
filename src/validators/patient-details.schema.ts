import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail, validateEmailOptional } from './common-rules';

// form zod validation schema
export const patientDetailsFormSchema = z
  .object({
    title: z.string().min(1, { message: messages.titleRequired }),
    first_name: z.string().min(1, { message: messages.firstNameRequired }),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, { message: messages.lastNameRequired }),
    gender: z.string().min(1, {
      message: messages.genderIsRequired,
    }),
    email: validateEmail,
    mobile_number: z
      .string()
      .min(1, { message: messages.phoneNumberIsRequired }),
    status: z.number().optional(),
    address: z.string().optional(),
    hearAboutUs: z.string().optional(),
    addresses: z
      .array(
        z.object({
          address_type: z
            .string()
            .min(1, { message: 'Address Type is required' }),
          address_line_1: z
            .string()
            .min(1, { message: 'Street Address is required' }),
          address_line_2: z.string().optional(),
          suburb: z.string().min(1, { message: 'City is required' }),
          state: z.string().min(1, { message: 'State is required' }),
          post_code: z.string().min(1, { message: 'Post Code is required' }),
          country: z.string().min(1, { message: 'Country is required' }),
        })
      )
      .min(1, { message: 'At least one address is required' }),
    date_of_birth: z.string().min(1, {
      message: messages.dateOfBirthRequired,
    }),
    unit_number: z.string().optional(),
    address_line_1: z.string().optional(),
    address_line_2: z.string().optional(),
    is_australian_resident: z.boolean().optional(),
    ihi_number: z
      .string()
      .regex(/^\d+$/, {
        message: 'IHI number must contain only numbers',
      })
      .length(16, {
        message: 'IHI number must be exactly 16 digits',
      })
      .optional(),
    concession_card_type: z.string().optional(),
    concession_card_number: z.string().optional(),
    concession_card_expiry: z.date().optional(),
    medicare_card: z.string().optional(),
    medicare_expiry: z.date().optional(),
    position_on_card: z.string().optional(),
    avatar: z.string().optional(),
    password: z.string().optional(),
    timezone: z.string().optional(),
    patient_type: z.string().optional().nullable(),
    patient_problem: z.array(z.string()).optional(),
    dva_card_number: z.string().optional(),
    dva_card_type: z.string().optional(),
    first_name_emergency_contact: z
      .string().optional(),
    last_name_emergency_contact: z.string().optional(),
    email_emergency_contact: validateEmailOptional,
    mobile_number_emergency_contact: z.string().optional(),
    relationship_emergency_contact: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),

     // state: z.string().min(1, { message: 'State is required' }),
    // country: z.string().min(1, { message: 'Country is required' }),
    // suburb: z.string().min(1, { message: 'City is required' }),
    // post_code: z.string().min(1, { message: 'Post Code is required' }),
    // address_type: z.string().min(1, { message: 'Address Type is required' }),
    // street_name: z.string().min(1, { message: 'Street Address is required' }),
    // address_line1: z.string().min(1, { message: 'Street Address is required' }),
    // ihi_number: z
    //   .string()
    //   .regex(/^\d*$/, { message: 'IHI number must contain only numbers' })
    //   .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword || data.confirmPassword) {
      if (!data.newPassword || data.newPassword.length < 7) {
        ctx.addIssue({
          path: ['newPassword'],
          message: 'New Password must be at least 7 characters',
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.confirmPassword || data.confirmPassword.length < 7) {
        ctx.addIssue({
          path: ['confirmPassword'],
          message: 'Confirm Password must be at least 7 characters',
          code: z.ZodIssueCode.custom,
        });
      }

      if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
          path: ['confirmPassword'],
          message: 'Confirm Password must match New Password',
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // If Australian resident, medicare fields are required
    if (data.is_australian_resident === true) {
      if (!data.medicare_card || data.medicare_card.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Medicare card is required for Australian residents',
          path: ['medicare_card'],
        });
      }
      if (!data.position_on_card || data.position_on_card.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Position on card is required for Australian residents',
          path: ['position_on_card'],
        });
      }
      if (!data.medicare_expiry) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Medicare expiry date is required for Australian residents',
          path: ['medicare_expiry'],
        });
      }
    }

    // If NOT Australian resident, IHI number is required
    if (data.is_australian_resident === false) {
      if (!data.ihi_number || data.ihi_number.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'IHI number is required for non-Australian residents',
          path: ['ihi_number'],
        });
      }
    }

    // Validate medicare card length if provided
    if (
      data.medicare_card &&
      (data.medicare_card.length < 10 || data.medicare_card.length > 13)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Medicare card must be between 10 and 13 characters',
        path: ['medicare_card'],
      });
    }
  });

export const patientCreateFormSchema = z
  .object({
    title: z.string().min(1, { message: messages.titleRequired }),
    first_name: z.string().min(1, { message: messages.firstNameRequired }),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, { message: messages.lastNameRequired }),
    gender: z.string().min(1, {
      message: messages.genderIsRequired,
    }),
    email: validateEmail,
    // mobile_number: z.string().min(10, { message: messages.mobileNumberMinimum }).max(10,{ message: messages.mobileNumberMaximum }).regex(/^04/, { message: messages.mobileNumberRequired }),
    mobile_number: z
      .string()
      .min(1, { message: 'Mobile number is required' })
      .refine((val) => val.length === 0 || val.startsWith('04'), {
        message: messages.mobileNumberRequired,
      })
      .refine((val) => val.length === 10, {
        message: messages.mobileNumberMinimum,
      }),
    status: z.number().optional(),
    address: z.string().optional(),
    date_of_birth: z.string().min(1, {
      message: messages.dateOfBirthRequired,
    }),
    state: z.string().min(1, { message: 'State is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    unit_number: z.string().optional(),
    address_line_1: z.string().optional(),
    address_line_2: z.string().optional(),
    suburb: z.string().min(1, { message: 'City is required' }),
    street_name: z.string().min(1, { message: 'Street Address is required' }),
    // address_line1: z.string().min(1, { message: 'Street Address is required' }),
    // address_type: z.string().min(1, { message: 'Address Type is required' }),
    post_code: z.string().min(1, { message: 'Post Code is required' }),
    is_australian_resident: z.boolean().optional(),
    ihi_number: z
      .string()
      .regex(/^\d*$/, { message: 'IHI number must contain only numbers' })
      .optional(),
    concession_card_type: z.string().optional(),
    concession_card_number: z.string().optional(),
    concession_card_expiry: z.date().optional(),

    medicare_card: z
      .string()
      .min(10, { message: 'Medicare card minimum 10 characters' })
      .max(13, { message: 'Medicare card maximum 13 characters' }),
    medicare_expiry: z.date().optional(),
    position_on_card: z.string().optional(),
    avatar: z.string().optional(),
    password: z.string().optional(),
    timezone: z.string().optional(),
    patient_type: z.string().optional(),
    patient_problem: z.array(z.string()).optional(),
    dva_card_number: z.string().optional(),
    dva_card_type: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // If Australian resident, medicare fields are required
    if (data.is_australian_resident === true) {
      if (!data.medicare_card || data.medicare_card.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Medicare card is required for Australian residents',
          path: ['medicare_card'],
        });
      }
      if (!data.position_on_card || data.position_on_card.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Position on card is required for Australian residents',
          path: ['position_on_card'],
        });
      }
      if (!data.medicare_expiry) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Medicare expiry date is required for Australian residents',
          path: ['medicare_expiry'],
        });
      }
    }

    // If NOT Australian resident, IHI number is required
    if (data.is_australian_resident === false) {
      if (!data.ihi_number || data.ihi_number.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'IHI number is required for non-Australian residents',
          path: ['ihi_number'],
        });
      }
    }

    // Validate medicare card length if provided
    if (
      data.medicare_card &&
      (data.medicare_card.length < 10 || data.medicare_card.length > 13)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Medicare card must be between 10 and 13 characters',
        path: ['medicare_card'],
      });
    }
  });

// generate form types from zod validation schema
export type PatientDetailsFormTypes = z.infer<typeof patientDetailsFormSchema>;
export type PatientCreateFormTypes = z.infer<typeof patientCreateFormSchema>;

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
