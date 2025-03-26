import {
  IGetAllClinicForPatientResponse,
  IGetDoctorByClinicForPatientResponse,
} from '@/types/ApiResponse';
import { atom } from 'jotai';

interface BookAppointmentState {
  appointmentDate?: string;
  doctor?: IGetDoctorByClinicForPatientResponse['data'][number];
  clinic?: IGetAllClinicForPatientResponse['data'][number];
}

export const defaultBookAppointment: BookAppointmentState = {};

// Original atom.
const bookAppointmentAtom = atom(defaultBookAppointment);

export default bookAppointmentAtom;
