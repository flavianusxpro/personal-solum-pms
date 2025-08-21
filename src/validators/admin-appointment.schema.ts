import { z } from 'zod';

export const appointmentBookSchema = {
  selectPatientAndClinic: z.object({
    patient_id: z.number().min(1, { message: 'Patient is required' }),
    clinicId: z.number().min(1, { message: 'Clinic is required' }),
    treatment: z.string().min(1, {
      message: 'Treatment is required',
    }),
    note: z.string().optional(),
  }),
  appointmentDate: z.object({
    date: z.date({ required_error: 'Appointment date is required' }),
    doctorId: z.number({ required_error: 'Doctor is required' }),
    doctorTime: z.string({ required_error: 'Doctor time is required' }),
    fee: z.string(),
  }),
  selectDoctorAndTime: z.object({
    doctorId: z.number({ required_error: 'Doctor is required' }),
    doctorTime: z.string({ required_error: 'Doctor time is required' }),
    fee: z.string(),
  }),
  selectServiceType: z.object({
    appointment_type: z.string().optional(),
    patient_type: z.string().optional(),
    patient_problem: z.string().optional(),
    // patient_problem: z.array(z.string()).min(1, {
    //   message: 'Patient problem is required',
    // }),
    treatment: z.string().min(1, {
      message: 'Treatment is required',
    }),
    note: z.string().optional(),
  }),
  selectMeetingType: z.string({ required_error: 'Meeting type is required' }),
};

export type AppointmentBookSchema = {
  selectPatientAndClinic: z.infer<
    (typeof appointmentBookSchema)['selectPatientAndClinic']
  >;
  selectAppointmentDate: z.infer<
    (typeof appointmentBookSchema)['appointmentDate']
  >;
  selectDoctorAndTime: z.infer<
    (typeof appointmentBookSchema)['selectDoctorAndTime']
  >;
};
