import { atom } from 'jotai';

interface BookAppointmentState {
  appointmentDate?: string;
  doctor?: any;
}

export const defaultBookAppointment: BookAppointmentState = {};

// Original atom.
const bookAppointmentAtom = atom(defaultBookAppointment);

export default bookAppointmentAtom;
