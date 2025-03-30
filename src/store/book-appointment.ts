import {
  IGetAllClinicForPatientResponse,
  IGetDoctorByClinicForPatientResponse,
} from '@/types/ApiResponse';
import { atom } from 'jotai';

interface BookAppointmentState {
  appointmentDate?: string;
  doctor?: IGetDoctorByClinicForPatientResponse['data'][number] & {
    doctorTime?: string;
  };
  clinic?: IGetAllClinicForPatientResponse['data'][number];
  step1?: string;
  step2?: string;
  step3?: string;
}

export const defaultBookAppointment: BookAppointmentState = {};

// Original atom.
const bookAppointmentAtom = atom(defaultBookAppointment);

export default bookAppointmentAtom;
