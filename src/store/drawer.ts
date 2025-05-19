import { atom } from 'jotai';

interface PatientDrawerState {
  isOpen: boolean;
}

export const patientDrawerState: PatientDrawerState = {
  isOpen: false,
};

// Original atom.
const patientDrawerAtom = atom(patientDrawerState);

export default patientDrawerAtom;
