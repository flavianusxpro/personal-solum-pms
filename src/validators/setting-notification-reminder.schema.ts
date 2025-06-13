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

  cancelled_email_status: z.boolean().optional(),
  cancelled_email_html: z.string().optional(),
  refund_email_status: z.boolean().optional(),
  refund_email_html: z.string().optional(),

  // reminder
  reminder_email_status: z.boolean().optional(),
  reminder_email_html: z.string().optional(),

  reminder_sms_status: z.boolean().optional(),
  reminder_sms_text: z.string().optional(),
});

// generate form types from zod validation schema
export type SettingNotificationReminderFormTypes = z.infer<
  typeof settingNotificationReminderFormSchema
>;
