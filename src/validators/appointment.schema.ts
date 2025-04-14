import { z } from 'zod';

export const appointmentBookSchema = {
  selectPatientAndClinic: z.object({
    patientId: z.string({ required_error: 'Patient is required' }),
    ClinicId: z.string({ required_error: 'Clinic is required' }),
  }),
  appointmentDate: z.string({ required_error: 'Appointment date is required' }),
  selectDoctorAndTime: z.object({
    doctorId: z.string({ required_error: 'Doctor is required' }),
    doctorTime: z.string({ required_error: 'Doctor time is required' }),
  }),
  selectAppointmentType: z.string({
    required_error: 'Appointment type is required',
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
