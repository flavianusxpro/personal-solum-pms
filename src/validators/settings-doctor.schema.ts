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

  academic_degree: z.string().optional(),
  fellowship: z.string().optional(),
  certificate: z.string().optional(),
  other_qualification: z.string().optional(),

  fee: z.number().optional(),
  cancellation_fee: z.number().optional(),
  // initial_appointment_fee: z.number().optional(),
  // follow_up_appointment_fee: z.number().optional(),
  // script_renewal_fee: z.number().optional(),
  costs: z.array(
    z.object({
      costId: z.number().optional(),
      treatmentId: z.number(),
      amount: z.string().optional(),
      amount_moderated: z.string().optional(),
    })
  ),
  doctor_timezone: z.string().optional(),
  initial_appointment_time: z.number().optional(),
  follow_up_appointment_time: z.number().optional(),
});

export type SettingsDoctorSchema = z.infer<typeof settingsDoctorSchema>;
