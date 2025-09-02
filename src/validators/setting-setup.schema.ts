import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const settingSetupFormSchema = z.object({
  logo: z.string().optional(),
  favicon: z.string().optional(),
  clinic_name: z.string().min(1, { message: messages.clinicNameRequired }),
  clinic_address: z
    .string()
    .min(1, { message: messages.clinicAddressRequired }),
  phone_numbers: z.string().min(1, { message: messages.phoneNumberIsRequired }),
  clinic_email: z.string().email({ message: messages.emailIsRequired }),
  frontend_url: z.string().optional(),
  contact_details: z.string().optional(),
  map_location: z.string().optional(),

  clinic_schedules: z
    .array(
      z.object({
        day: z.number().min(0).max(6),
        start_hour: z.date(),
        end_hour: z.date(),
        is_open: z.boolean(),
      })
    )
    .min(1, 'At least one schedule is required'),

  meta_title: z.string().optional(),
  meta_description: z.string().optional(),

  facebook_link: z.string().optional(),
  instagram_link: z.string().optional(),
  x_link: z.string().optional(),
  tiktok_link: z.string().optional(),

  login_page_notification: z.boolean().optional(),
  after_login_notification: z.boolean().optional(),
});

// generate form types from zod validation schema
export type SettingSetupFormTypes = z.infer<typeof settingSetupFormSchema>;
