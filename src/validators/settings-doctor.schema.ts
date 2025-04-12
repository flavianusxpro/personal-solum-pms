import { z } from 'zod';

export const settingsDoctorSchema = z.object({
  microsoft_team_link: z.string().optional(),
  microsoft_team_id: z.string().optional(),
  microsoft_team_passcode: z.string().optional(),
  microsoft_team_status: z.boolean().optional(),

  zoom_meeting_link: z.string().optional(),
  zoom_meeting_id: z.string().optional(),
  zoom_meeting_passcode: z.string().optional(),
  zoom_meeting_status: z.boolean().optional(),

  skype_link: z.string().optional(),
  skype_meeting_id: z.string().optional(),
  skype_meeting_passcode: z.string().optional(),
  skype_meeting_status: z.boolean().optional(),

  f2f: z.boolean().optional(),
  teleHealth: z.boolean().optional(),

  field1: z.string().optional(),
  field2: z.string().optional(),
  field3: z.string().optional(),
  field4: z.string().optional(),

  fee: z.number().optional(),
  cancellation_fee: z.number().optional(),
  initial_appointment_fee: z.number().optional(),
  follow_up_appointment_fee: z.number().optional(),

  doctor_timezone: z.string().optional(),
  initial_appointment_duration: z.number().optional(),
  follow_up_appointment_duration: z.number().optional(),
});

export type SettingsDoctorSchema = z.infer<typeof settingsDoctorSchema>;
