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
  Administrator: 'administrator',
  Patient: 'patient',
  Manager: 'Manager',
  Sales: 'Sales',
  Support: 'Support',
  Developer: 'Developer',
  HRD: 'HR Department',
  RestrictedUser: 'Restricted User',
  Customer: 'Customer',
} as const;

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
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
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
