import { z } from 'zod';

// form zod validation schema
export const settingNotificationReminderFormSchema = z.object({
  // notification
  booking_confirmation_email_status: z.boolean().optional(),
  booking_confirmation_sms_status: z.boolean().optional(),
  booking_confirmation_email_html: z.string().optional(),
  booking_confirmation_sms_text: z.string().optional(),

  reschedule_email_status: z.boolean().optional(),
  reschedule_sms_status: z.boolean().optional(),
  reschedule_email_html: z.string().optional(),
  reschedule_sms_text: z.string().optional(),

  account_created_email_status: z.boolean().optional(),
  account_created_sms_status: z.boolean().optional(),
  account_created_email_html: z.string().optional(),
  account_created_sms_text: z.string().optional(),

  payment_confirmation_email_status: z.boolean().optional(),
  payment_confirmation_sms_status: z.boolean().optional(),
  payment_confirmation_email_html: z.string().optional(),
  payment_confirmation_sms_text: z.string().optional(),

  account_verification_email_status: z.boolean().optional(),
  account_verification_email_html: z.string().optional(),

  forgot_password_email_status: z.boolean().optional(),
  forgot_password_email_html: z.string().optional(),

  birthday_email_status: z.boolean().optional(),
  birthday_email_html: z.string().optional(),

  // reminder
  booking_reminder_days_interval: z.number().optional(),
  booking_reminder_days_template: z.string().optional(),
  booking_reminder_hours_interval: z.number().optional(),
  booking_reminder_hours_template: z.string().optional(),
  consent_form_reminder_template: z.string().optional(),
  driver_licence_reminder_status: z.boolean().optional(),
  photo_id_reminder_status: z.boolean().optional(),
  insurance_reminder_status: z.boolean().optional(),
  police_check_reminder_status: z.boolean().optional(),
  wwcc_reminder_status: z.boolean().optional(),
  contract_reminder_status: z.boolean().optional(),
  asic_document_reminder_status: z.boolean().optional(),
  send_follow_up_appoinment_reminder_status: z.boolean().optional(),
});

// generate form types from zod validation schema
export type SettingNotificationReminderFormTypes = z.infer<
  typeof settingNotificationReminderFormSchema
>;
