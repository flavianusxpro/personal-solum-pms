import { RegisterSchema } from '@/validators/register.schema';
import { RoleType } from './constansTypes';
interface IParamGetDataWithPagination {
  page: number;
  perPage: number;
  sort?: 'ASC' | 'DESC';
  search?: string;
  q?: {};
}
export interface IParamGetAllClinic extends IParamGetDataWithPagination {
  role: RoleType;
}

export interface IParamGetDoctorByClinic extends IParamGetDataWithPagination {
  id: string;
  role?: RoleType;
  treatment_type: string;
  problem_type?: string;
  doctorId?: number;
}

export interface IParamsGetApiConnection extends IParamGetDataWithPagination {}

export interface IPayloadRegisterForPatient extends RegisterSchema {}

export interface IPayloadCheckout {
  amount: number;
}

export interface IParamsGetDoctorAvailability {
  clinicId: number;
  doctorId: number;
  appointment_date: string;
  appointment_type: string;
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
  position_of_card?: string;
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
  patient_problem?: string[];
  patient_type?: string;
  photo?: string;
  ihi_number?: string;
  concession_card_type?: string;
  concession_card_number?: string;
  concession_card_expire_date?: string;
  address_line_1?: string;
  address_line_2?: string;
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
  treatment_type?: string[];
  specialist_type?: number[];
  problem_type?: string[];
  medical_interest?: string;
  language?: string[];
}

export interface IParamGetAllPatient extends IParamGetDataWithPagination {
  from?: string;
  to?: string;
}
export interface IParamGetAllDoctor extends IParamGetDataWithPagination {
  from?: string;
  to?: string;
  isEnable?: boolean;
}

export interface IParamGetDoctorSharing extends IParamGetDataWithPagination {
  from?: string;
  to?: string;
  isEnable?: boolean;
}

export interface IParamGetAllDoctorForSubClinic extends IParamGetAllDoctor {
  xtoken?: string;
  xSessionId?: string;
  apiUrl?: string;
}
export interface IParamGetDoctorScheduleForMainClinic {
  xtoken?: string;
  xSessionId?: string;
  apiUrl?: string;
  doctorId?: number;
}
export interface IParamGetScheduleSharingDoctorForMainClinic {
  sharingDoctorId?: number;
}
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
export interface IParamsGetPharmachies extends IParamGetDataWithPagination {}
export interface IParamsPatientNotes extends IParamGetDataWithPagination {}
export interface IParamsPatientFlags extends IParamGetDataWithPagination {
  patientId: number;
}
export interface IParamGetAppointments extends IParamGetDataWithPagination {
  doctorId?: number;
  patientId?: number;
  from?: string;
  to?: string;
  status?: number;
  payment_status?: number;
  doctorName?: string;
  by_reschedule?: boolean;
  q?: string;
  clinicId?: number;
}
export interface IParamGetInvoices extends IParamGetDataWithPagination {
  doctorId?: number;
  patientId?: number;
}
export interface IParamsGetCoupons extends IParamGetDataWithPagination {
  type?: string;
  status?: string;
  category?: string;
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

export interface IPayloadCreatePatientProblem {
  id?: number;
  name?: string;
  is_active?: boolean;
}
export interface IParamGetPatientProblem extends IParamGetDataWithPagination {
  search?: string;
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
  enabled?: boolean;
}

export interface IPayloadPostCreateSchedule {
  id?: number;
  doctorId: number;
  description?: string;
  dates: Date[];
}
export interface IPayloadPutUpdateSchedule {
  id?: number;
  doctorId: number;
  description?: string;
  start_date: string;
  end_date: string;
  break_times: Breaktime[];
}
interface Breaktime {
  start_date: string;
  end_date: string;
}

interface Date {
  start_date: string;
  end_date: string;
  break_times: Breaktime[];
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
  // appointment_type: string;
  patient_type: string;
  patient_problem: string;
  payment_id?: string;
  meeting_preference: string;
  additional_information: Additionalinformation;
}

interface Additionalinformation {
  note?: string;
}

export interface IPayloadPostCancelAppoinment {
  id: number;
  reason: string;
}

export interface IPayloadPostRescheduleByDate {
  id: number;
  date: string;
  doctorId?: number;
  note?: string;
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
  description?: string;
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
  sharing_doctor_id?: number;
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
  reminder_sms_status: boolean;
  reminder_sms_text: string;
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
  reminder_email_status: boolean;
  reminder_email_html: string;
  cancelled_email_status?: boolean;
  cancelled_email_html?: string;
  refund_email_status?: boolean;
  refund_email_html?: string;
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

export interface IPayloadCreateUpdateClinic {
  id?: string;
  name: string;
  email: string;
  mobile_number: string;
  address: string;
  url_logo?: string;
  default: boolean;
  status: number;
}

export interface IPayloadCreateEditPharmachy {
  id?: number;
  clinicId: number;
  name: string;
  dispense_email: string;
  phone: string;
  billing_email: string;
  website?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postcode: string;
  url_logo?: string;
}

export interface IPayloadPasientNote {
  id?: number;
  patient_id: number;
  description: string;
}

export interface IPayloadPasientFlag {
  id?: number;
  patient_id: number;
  category: string;
  description: string;
}

export interface IPayloadCreateUpdateCoupon {
  id?: number;
  name: string;
  type: string;
  description: string;
  code: string;
  discount_type: string;
  discount_amount: number;
  expiry_date: string;
  patient_limit_use: number;
  limit: number;
  category: string;
  restrict_patient: number[];
}

export interface IPayloadUpdateTwilioConfig {
  account_id: string;
  auth_token: string;
  from_number: string;
  status: boolean;
}

export interface IPayloadUpdateSmtpConfig {
  smtp_host: string;
  smtp_port: string;
  smtp_username: string;
  smtp_password: string;
  secure_type: string;
  mail_from: string;
}

export interface IPayloadDoctorCost {
  id?: number;
  doctorId: number;
  treatmentId: number;
  amount: number;
}

export interface IPayloadUpdateAwsS3Config {
  aws_access_id: string;
  aws_secret_key: string;
  bucket: string;
  region: string;
  endpoint: string;
  status: boolean;
}

export interface IParamsGetPatientDocumentation
  extends IParamGetDataWithPagination {
  patientId: number;
}

export interface IPayloadPatientAssignClinic {
  uuid: string;
  clinic_ids: number[];
}

export interface IPayloadClinicConnection {
  base_url: string;
  name: string;
  access_token: string;
}
export interface IPayloadCreateEditApiConnection {
  id?: number;
  name: string;
  hostname: string;
}
