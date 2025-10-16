import { z } from 'zod';

export const emailSettingsSchema = z.object({
  signature_name: z.string().optional(),
  signature_content: z.string().optional(),
  for_new_email_use: z.string().optional(),
  on_reply_forward_use: z.string().optional(),
});

export type EmailSettingsSchema = z.infer<typeof emailSettingsSchema>;
