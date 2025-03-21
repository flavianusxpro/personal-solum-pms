import { atom } from 'jotai';

interface BookAppointmentState {
  appointmentDate?: string;
}

export const defaultBookAppointment: BookAppointmentState = {};

// Original atom.
const bookAppointmentAtom = atom(defaultBookAppointment);

export default bookAppointmentAtom;
