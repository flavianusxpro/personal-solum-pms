import { RegisterSchema } from '@/validators/register.schema';

interface IParamGetDataWithPagination {
  page: number;
  perPage: number;
}
export interface IParamGetAllClinicForPatient
  extends IParamGetDataWithPagination {}

export interface IParamGetDoctorByClinicForPatient
  extends IParamGetDataWithPagination {
  id: string;
}

export interface IPayloadRegisterForPatient extends RegisterSchema {}

export interface IPayloadCheckout {
  amount: number;
}

export interface IPayloadPostBookAppoinment {
  doctorId: number;
  clinicId: number;
  patient_type: string;
  patient_problem: string;
  sessionId?: string;
  date: string;
  payment_id: string;
  additional_information: Additionalinformation;
  appointment_type: string;
}

interface Additionalinformation {}

export interface IPayloadPostPaymentMethod {
  payment_method: string;
  amount: number;
}

export interface IPayloadCreateEditPatient {
  patient_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  mobile_number?: string;
  status?: number;
  title?: string;
  potition_on_card?: string;
  country?: string;
  unit_number?: string;
  street_name?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  date_of_birth?: string;
  gender?: string;
  medicare_card_number?: string;
  medicare_expired_date?: string;
  timezone?: string;
  emergency_first_name?: string;
  emergency_last_name?: string;
  emergency_mobile_number?: string;
  emergency_email?: string;
  emergency_relationship?: string;
  patient_problem?: number;
  patient_type?: number;
}

export interface IPayloadCreateEditDoctor {
  doctor_id?: string;
  first_name: string;
  password?: string;
  last_name: string;
  email: string;
  mobile_number: string;
  status: number;
  address: string;
  date_of_birth: string;
  gender: string;
  medicare_card_number?: string;
  medicare_expired_date?: string;
  timezone: string;
}

export interface IParamGetAllPatient extends IParamGetDataWithPagination {}
export interface IParamGetAllDoctor extends IParamGetDataWithPagination {}
export interface IParamGetAppointments extends IParamGetDataWithPagination {
  doctorId?: number;
  patientId?: number;
}
export interface IParamGetInvoices extends IParamGetDataWithPagination {
  doctorId?: number;
  patientId?: number;
}

export interface IPayloadSettingMeetingDoctor {
  doctor_id: string;
  microsoft_team_link?: string;
  microsoft_team_id?: string;
  microsoft_team_passcode?: string;
  zoom_meeting_link?: string;
  zoom_meeting_id?: string;
  zoom_meeting_passcode?: string;
}

export interface IPayloadSettingBillingDoctor {
  doctor_id: string;
  fee?: number;
  cancellation_fee?: number;
  initial_appointment_fee?: number;
  followup_appointment_fee?: number;
}

export interface IParamGetPatientProblem {
  search: string;
}

export interface IParamGetPatientTypes {
  search: string;
}

export interface IPayloadUpdatePassword {
  oldPassword: string;
  password: string;
}

export interface IPayloadUpdateAssignDoctor {
  patient_id: string;
  doctor_ids: number[];
}
