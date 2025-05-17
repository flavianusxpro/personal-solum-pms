import { z } from 'zod';

// form zod validation schema
export const settingCommunicationFormSchema = z.object({
  email_server: z.string().optional(),
  email_address: z.string().optional(),
  email_port: z.string().optional(),
  security_type: z.string().optional(),
  email_password: z.string().optional(),

  sms_provider_status: z.boolean().optional(),
  twillio_status: z.boolean().optional(),
  twillio_id_key: z.string().optional(),
  twillio_pass_key: z.string().optional(),
  twillio_phone_number: z.string().optional(),
  aws_status: z.boolean().optional(),
  aws_id_key: z.string().optional(),
  aws_pass_key: z.string().optional(),
  google_status: z.boolean().optional(),
  google_id_key: z.string().optional(),
  google_pass_key: z.string().optional(),
  sms_api_key: z.string().optional(),
  sms_id: z.string().optional(),

  tawk_plugin_status: z.boolean().optional(),
  facebook_plugin_status: z.boolean().optional(),
});

// generate form types from zod validation schema
export type SettingCommunicationFormTypes = z.infer<
  typeof settingCommunicationFormSchema
>;
