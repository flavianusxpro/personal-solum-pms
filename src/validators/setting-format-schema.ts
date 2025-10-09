import { z } from 'zod';

// form zod validation schema
export const settingFormatFormSchema = z.object({
  date_format: z.boolean().optional(),
  time_format: z.boolean().optional(),
});

// generate form types from zod validation schema
export type SettingFormatFormTypes = z.infer<typeof settingFormatFormSchema>;
