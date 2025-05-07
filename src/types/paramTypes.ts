import { RegisterSchema } from '@/validators/register.schema';
import { RoleType } from './constansTypes';
interface IParamGetDataWithPagination {
  page: number;
  perPage: number;
  sort?: 'ASC' | 'DESC';
  search?: string;
}
export interface IParamGetAllClinic extends IParamGetDataWithPagination {
  role: RoleType;
}

export interface IParamGetDoctorByClinic extends IParamGetDataWithPagination {
  id: string;
  role?: RoleType;
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
  first_name?: string;
  password?: string;
  last_name?: string;
  email?: string;
  mobile_number?: string;
  status?: number;
  date_of_birth?: string;
  gender?: string;
  unit_number?: string;
  medicare_card_number?: string;
  medicare_expired_date?: string;
  timezone?: string;
  emergency_first_name?: string;
  emergency_last_name?: string;
  emergency_mobile_number?: string;
  emergency_email?: string;
  emergency_relationship?: string;
  description?: string;
  address_line_1?: string;
  address_line_2?: string;
  street_number?: string;
  street_name?: string;
  suburb?: string;
  postcode?: string;
  country?: string;
  state?: string;
  // treatment_type?: number[];
  treatment_type?: string;
  specialist_type?: number[];
  medical_interest?: string;
  language?: string[];
}

export interface IParamGetAllPatient extends IParamGetDataWithPagination {}
export interface IParamGetAllDoctor extends IParamGetDataWithPagination {}
export interface IParamGetAllEmailTemplates
  extends IParamGetDataWithPagination {}
export interface IParamGetAllSmsTemplates extends IParamGetDataWithPagination {}
export interface IParamGetSpecialists extends IParamGetDataWithPagination {}
export interface IParamGetTreatments extends IParamGetDataWithPagination {}
export interface IParamGetRoles extends IParamGetDataWithPagination {}
export interface IParamGetPermissions extends IParamGetDataWithPagination {}
export interface IParamGetUsers extends IParamGetDataWithPagination {}
export interface IParamGetTaxes extends IParamGetDataWithPagination {}
export interface IParamsGetItems extends IParamGetDataWithPagination {}
export interface IParamGetAppointments extends IParamGetDataWithPagination {
  doctorId?: number;
  patientId?: number;
  from?: string;
  to?: string;
  status?: number;
  doctorName?: string;
  q?: string;
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
  microsoft_team_status?: boolean;
  zoom_meeting_link?: string;
  zoom_meeting_id?: string;
  zoom_meeting_passcode?: string;
  zoom_meeting_status?: boolean;
  skype_meeting_link?: string;
  skype_meeting_id?: string;
  skype_meeting_passcode?: string;
  skype_meeting_status?: boolean;
  initial_appointment_time?: number;
  follow_up_appointment_time?: number;
  telehealth_meeting_status?: boolean;
  f2f_meeting_status?: boolean;
  timeZone?: string;
}

export interface IPayloadSettingBillingDoctor {
  doctor_id: string;
  fee?: number;
  cancellation_fee?: number;
  initial_appointment_fee?: number;
  followup_appointment_fee?: number;
  script_renewal_fee?: number;
}

export interface IPayloadSettingAppointmentDoctor {
  doctor_id: string;
  practice_open_schedule_days?: number[];
  practice_open_schedule_clock?: string;
  practice_close_schedule_clock?: string;
  initial_appointment_time?: number;
  followup_appointment_time?: number;
  schedule?: Schedule;
}

interface Schedule {
  interval: string;
  week: Week[];
  dailyBreakTimes: DailyBreakTime[];
}

interface DailyBreakTime {
  startTime: string;
  endTime: string;
}

interface Week {
  day: number;
  startTime: string;
  endTime: string;
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

export interface IParamGetListSchedule extends IParamGetDataWithPagination {
  doctorId?: number | string;
}

export interface IPayloadPostCreateSchedule {
  id?: string;
  doctorId: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  break_times?: Breaktime[];
}

interface Breaktime {
  start_date: string;
  end_date: string;
}

export interface IPayloadPostForgotPassword {
  email: string;
}

export interface IPayloadPostVerifyAccount {
  token: string;
  password: string;
}

export interface IPayloadPostAppoinment {
  clinicId: number;
  patientId: number;
  doctorId: number;
  date: string;
  note?: string;
  appointment_type: string;
  patient_type: string;
  patient_problem: string;
  payment_id?: string;
  meeting_preference: string;
}

export interface IPayloadPutUpdateAppoinment {
  id?: number;
  clinicId?: number;
  doctorId?: number;
  patientId?: number;
  patient_type?: string;
  patient_problem?: string;
  status?: number;
  appointment_type?: string;
  note?: string;
}

export interface IPayloadUploadImage {
  image: File;
  path_name: string;
}

export interface IPayloadCreateInvoice {
  id?: number;
  patientId: number;
  invoice_date: string;
  due_date: string;
  note: string;
  amount: number;
  other_fee: number;
  tax_fee: number;
  total_amount: number;
  items: Item[];
}
interface Item {
  code: string;
  name: string;
  description?: string;
  amount: number;
  qty: number;
  total_amount: number;
}

export interface IPayloadAssignDoctorToClinic {
  id: string;
  clinic_ids: number[];
}

export interface IPayloadCreateDoctorUser {
  name: string;
  email: string;
  password: string;
  roleId: number;
  clinic_ids: number[];
  doctor: Doctor;
}
export interface IPayloadCreateUser {
  name: string;
  email: string;
  password: string;
  roleId: number;
  clinic_ids: number[];
}
export interface IPayloadUpdateUser {
  id: string;
  name?: string;
  email?: string;
  roleId?: number;
  password?: string;
  clinic_ids?: number[];
}

interface Doctor {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_number: string;
  date_of_birth: string;
  gender: string;
  country: string;
  street_name: string;
  address_line_1: string;
  address_line_2: string;
  suburb: string;
  state: string;
  postcode: string;
  emergency_first_name: string;
  emergency_last_name: string;
  emergency_mobile_number: string;
  emergency_email?: string;
  medical_interest: string;
  specialist_type: number[];
  treatment_type: number[];
  language: string[];
}

export interface IPayloadUpdateSmsNotificationSettings {
  booking_confirmation_sms_status: boolean;
  booking_confirmation_sms_text: string;
  reschedule_sms_status: boolean;
  reschedule_sms_text: string;
  account_created_sms_status: boolean;
  account_created_sms_text: string;
  payment_confirmation_sms_status: boolean;
  payment_confirmation_sms_text: string;
}

export interface IPayloadUpdateEmailNotificationSettings {
  booking_confirmation_email_status: boolean;
  booking_confirmation_email_html: string;
  reschedule_email_status: boolean;
  reschedule_email_html: string;
  account_created_email_status: boolean;
  account_created_email_html: string;
  payment_confirmation_email_status: boolean;
  payment_confirmation_email_html: string;
  account_verification_email_status: boolean;
  account_verification_email_html: string;
  forgot_password_email_status: boolean;
  forgot_password_email_html: string;
  birthday_email_status: boolean;
  birthday_email_html: string;
}

export interface IPayloadCreateEditEmailTemplate {
  id?: string;
  name: string;
  html: string;
}

export interface IPayloadCreateEditSmsTemplate {
  id?: string;
  name: string;
  text: string;
}

export interface IPayloadCreateEditRole {
  id?: string;
  name: string;
  permissions: string[];
}

export interface IPayloadPostCreateEditSpecialist {
  id?: string;
  name: string;
  description?: string;
}

export interface IPayloadCreateEditTreatment {
  id?: string;
  name: string;
  description?: string;
}
export interface IPayloadCreateEditTax {
  id?: string;
  name: string;
  description?: string;
  value: number;
}

export interface IPayloadCreateItem {
  id?: string;
  code: string;
  name: string;
  description?: string;
  price: number;
}
