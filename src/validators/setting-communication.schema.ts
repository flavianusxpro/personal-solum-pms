import { z } from 'zod';
import { validateEmail } from './common-rules';

// form zod validation schema
export const settingCommunicationFormSchema = z.object({
  smtp_host: z.string().optional(),
  smtp_email_address: validateEmail.optional(),
  smtp_port: z.string().optional(),
  smtp_security_type: z.string().optional(),
  smtp_username: z.string().optional(),
  smtp_password: z.string().optional(),

  sms_provider_status: z.boolean().optional(),
  twillio_status: z.boolean().optional(),
  twillio_id_key: z.string().optional(),
  twillio_auth_token: z.string().optional(),
  twillio_phone_number: z.string().optional(),

  aws_status: z.boolean().optional(),
  aws_id: z.string().optional(),
  aws_secret_key: z.string().optional(),
  aws_region: z.string().optional(),
  aws_bucket: z.string().optional(),
  aws_endpoint: z.string().optional(),

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
