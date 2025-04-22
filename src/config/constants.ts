import { SelectOption } from 'rizzui';

export const CART_KEY = 'isomorphic-cart';
export const POS_CART_KEY = 'isomorphic-pos-cart';
export const DUMMY_ID = 'FC6723757651DB74';
export const CHECKOUT = 'isomorphic-checkout';
export const CURRENCY_CODE = 'USD';
export const LOCALE = 'en';
export const CURRENCY_OPTIONS = {
  formation: 'en-US',
  fractions: 2,
};

export const ROW_PER_PAGE_OPTIONS = [
  {
    value: 5,
    name: '5',
  },
  {
    value: 10,
    name: '10',
  },
  {
    value: 15,
    name: '15',
  },
  {
    value: 20,
    name: '20',
  },
];

export const ROLES = {
  SuperAdmin: 'superadmin',
  Admin: 'administrator',
  Patient: 'patient',
  Doctor: 'doctor',
};

export const patientTitle: SelectOption[] = [
  { label: 'Mr', value: 'mr' },
  { label: 'Mrs', value: 'mrs' },
  { label: 'Miss', value: 'miss' },
  { label: 'Ms', value: 'ms' },
  { label: 'Dr', value: 'dr' },
  { label: 'Other / Prefer Not Specify', value: '' },
];

export const step3Button = [
  'Natural therapy consult',
  'Follow up appointment',
  'Script renewal',
  'Standard Consult',
  'Medical certificate',
  'Travel medicine',
  'Nicotine Vaping Cessation',
  'Weight Loss',
];

export const genderOption: SelectOption[] = [
  {
    label: 'Male',
    value: 'MALE',
  },
  {
    label: 'Female',
    value: 'FEMALE',
  },
  {
    label: 'Prefer not to say',
    value: 'PREFER_NOT_TO_SAY',
  },
];

export const stateOption: SelectOption[] = [
  {
    label: 'NSW (New South Wales)',
    value: 'nsw',
  },
  {
    label: 'VIC (Victoria)',
    value: 'vic',
  },
  {
    label: 'QLD (Queensland)',
    value: 'qld',
  },
  {
    label: 'SA (South Australia)',
    value: 'sa',
  },
  {
    label: 'WA (Western Australia)',
    value: 'wa',
  },
  {
    label: 'TAS (Tasmania)',
    value: 'tas',
  },
  {
    label: 'NT (Northern Territory)',
    value: 'nt',
  },
  {
    label: 'ACT (Australian Capital Territory)',
    value: 'act',
  },
];

export const relationshipOption: SelectOption[] = [
  { label: 'Spouse', value: 'spouse' },
  { label: 'Parent', value: 'parent' },
  { label: 'Sibling', value: 'sibling' },
  { label: 'Child', value: 'child' },
  { label: 'Guardian', value: 'guardian' },
  { label: 'Relative', value: 'relative' },
  { label: 'Friend', value: 'friend' },
  { label: 'Colleague', value: 'colleague' },
  { label: 'Neighbour', value: 'neighbour' },
  { label: 'Other', value: 'other' },
];

export const doctorsOption = [
  { label: 'Dr. John Doe', value: 'dr-john-doe' },
  { label: 'Dr. Jane Smith', value: 'dr-jane-smith' },
  { label: 'Dr. Emily Johnson', value: 'dr-emily-johnson' },
  { label: 'Dr. Michael Brown', value: 'dr-michael-brown' },
  { label: 'Dr. Sarah Davis', value: 'dr-sarah-davis' },
];

export const doctorTypeOption = [
  { label: 'General Practitioner', value: 'general-practitioner' },
  { label: 'Specialist', value: 'specialist' },
  { label: 'Surgeon', value: 'surgeon' },
  { label: 'Pediatrician', value: 'pediatrician' },
  { label: 'Dermatologist', value: 'dermatologist' },
  { label: 'Psychiatrist', value: 'psychiatrist' },
  { label: 'Cardiologist', value: 'cardiologist' },
  { label: 'Orthopedic Surgeon', value: 'orthopedic-surgeon' },
  { label: 'Gynecologist', value: 'gynecologist' },
  { label: 'Ophthalmologist', value: 'ophthalmologist' },
  { label: 'ENT Specialist', value: 'ent-specialist' },
  { label: 'Neurologist', value: 'neurologist' },
];

export const languageOption = [
  { label: 'English', value: 'english' },
  { label: 'Indonesia', value: 'indonesia' },
];

export const timeZoneOption = [
  { label: 'UTC-12:00', value: 'Etc/GMT+12' },
  { label: 'UTC-11:00', value: 'Etc/GMT+11' },
  { label: 'UTC-10:00', value: 'Etc/GMT+10' },
  { label: 'UTC-09:00', value: 'Etc/GMT+9' },
  { label: 'UTC-08:00', value: 'Etc/GMT+8' },
  { label: 'UTC-07:00', value: 'Etc/GMT+7' },
  { label: 'UTC-06:00', value: 'Etc/GMT+6' },
  { label: 'UTC-05:00', value: 'Etc/GMT+5' },
  { label: 'UTC-04:00', value: 'Etc/GMT+4' },
];

export const weekIntervalOption = [
  {
    label: 'Every Week',
    value: 'every-week',
  },
  {
    label: '1 Week',
    value: '1 week',
  },
  {
    label: '2 Weeks',
    value: '2 weeks',
  },
  {
    label: '3 Weeks',
    value: '3 weeks',
  },
  {
    label: '4 Weeks',
    value: '4 weeks',
  },
];
