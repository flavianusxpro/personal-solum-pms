import { z } from 'zod';

export const emailBroadcastsSchema = z.object({
  recipient_group: z.string().optional(),
  sender_name: z.string().optional(),
  email_subject: z.string().optional(),
  template: z.string().optional(),
  email_body: z.string().optional(),
  attachment: z.string().optional(),
  schedule_send: z.string().optional(),
});

export const smsBroadcastsSchema = z.object({
  recipient_group: z.string().optional(),
  sender_id: z.string().optional(),
  template: z.string().optional(),
  message_content: z.string().optional(),
  schedule_send: z.string().optional(),
});

export type EmailBroadcastSchema = z.infer<typeof emailBroadcastsSchema>;
export type SmsBroadcastSchema = z.infer<typeof smsBroadcastsSchema>;
