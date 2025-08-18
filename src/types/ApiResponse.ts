interface UserData {
  access_token: string;
  role: Role;
  name?: string;
  email?: string;
}

export interface SignInApiResponse {
  success: boolean;
  data: UserData;
}

export interface SignInApiInvalidResponse {
  error: string;
  status: number;
  ok: boolean;
  url: null;
}

interface ApiResponseWithPagination {
  success: boolean;
  count: number;
  page: number;
  perPage: number;
  data: any;
}
interface ApiUsersResponseWithPagination {
  success: boolean;
  count: number;
  page: number;
  perPage: number;
  users: any;
}
export interface IGetAllClinicForPatientResponse
  extends ApiResponseWithPagination {
  data: {
    id: number;
    name: string;
    email: string;
    mobile_number: string;
    address: string;
    logo: string;
    default: boolean;
    status: number;
    created_at: string;
    updated_at: string;
  }[];
}

interface ApiResponse {
  success: boolean;
  data: {};
}

export interface IGetClinicByIdForPatientResponse extends ApiResponse {
  data: {
    id: number;
    name: string;
    email: string;
    mobile_number: string;
    address: string;
    logo: string;
    default: boolean;
    status: number;
    created_at: string;
    updated_at: string;
  };
}

export interface IGetDoctorByClinicResponse extends ApiResponse {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    photo: null;
    specialist_type: string;
    treatment_type: string;
    problem_type: string;
    medical_interest: string;
    language: string;
    description: null;
    cost: Cost;
  }[];
}

interface Cost {
  name: string;
  duration: number;
  amount: string;
}
interface Booked_Times {
  date: string;
  booked_times: string[];
}

export interface Appointmentschedule {
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

interface Appointmentfee {
  initial: string;
  followup: string;
  script_renewal: string;
}

interface Appointmentduration {
  initial: number;
  followup: number;
}

export interface DoctorSchedule {
  doctor?: string;
  id: number;
  description: string;
  start_date: Date;
  end_date: Date;
  break_times: BreakTime[];
  created_at: string;
  updated_at: string;
}

interface BreakTime {
  start_date: string;
  end_date: string;
}

export interface IGetProfileResponse extends ApiResponse {
  data: {
    id: number;
    name: string;
    email: string;
    status: number;
    role: Role;
    clinics: IClinic[];
  };
}

export interface IPostOneTimePaymentResponse extends ApiResponse {
  data: {
    id: string;
    clientSecret: string;
  };
}

export interface IGetAllPatientsResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    patient_id: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    status: number;
    address: string;
    date_of_birth: string;
    gender: string;
    medicare_card_number: string;
    medicare_expired_date: string;
    patient_type: null;
    patient_problem: null;
    emergency_first_name: null;
    emergency_last_name: null;
    emergency_mobile_number: null;
    emergency_email: null;
    emergency_relationship: null;
    verification_token: null | string;
    timezone: string;
    created_at: string;
    updated_at: string;
    photo: string | null;
  }[];
}

export interface IGetPatientByIdResponse extends ApiResponse {
  data: {
    id: number;
    patient_id: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    status: number;
    title: null;
    potition_on_card: null;
    photo: null;
    country: null;
    unit_number: null;
    street_name: null;
    suburb: null;
    state: null;
    postcode: null;
    date_of_birth: string;
    gender: string;
    medicare_card_number: string;
    medicare_expired_date: string;
    patient_type: string | null;
    patient_problem: string[] | null;
    emergency_first_name: null;
    emergency_last_name: null;
    emergency_mobile_number: null;
    emergency_email: null;
    emergency_relationship: null;
    verification_token: string;
    position_of_card: string;
    ihi_number: string;
    concession_card_expire_date: string;
    concession_card_number: string;
    concession_card_type: string;
    timezone: string;
    created_at: string;
    updated_at: string;
    doctors: IDoctor[];
    clinics: IClinic[];
    address_line_1: string;
    address_line_2: string;
  };
}

export interface IGetAllDoctorsResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    password: string;
    status: number;
    address: string;
    date_of_birth: null | string;
    gender: null;
    url_photo: null;
    description: null;
    medicare_card_number: string;
    medicare_expired_date: string;
    specialist: null | string;
    problem: null;
    emergency_first_name: null;
    emergency_last_name: null;
    emergency_mobile_number: null;
    emergency_email: null;
    emergency_relationship: null;
    timezone: string;
    created_at: string;
    updated_at: string;
    treatment_type: string;
    address_line_1: string;
    address_line_2: string;
    country: string;
    unit_number: null;
    street_name: string;
    suburb: string;
    state: string;
    postcode: string;
    medical_interest: string;
    specialist_type: string;
    problem_type: string;
    language: string;
  }[];
}

export interface IGetDoctorByIdResponse extends ApiResponse {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    status: number;
    date_of_birth: string;
    gender: string;
    photo: null;
    description: null;
    address_line_1: string;
    address_line_2: string;
    country: string;
    unit_number: null;
    street_name: string;
    suburb: string;
    state: string;
    postcode: string;
    specialist: null;
    problem: null;
    emergency_first_name: string;
    emergency_last_name: string;
    emergency_mobile_number: string;
    emergency_email: string;
    emergency_relationship: null;
    medical_interest: string;
    specialist_type: string;
    problem_type: string;
    treatment_type: string;
    language: string;
    timezone: string;
    created_at: string;
    updated_at: string;
    clinics: Clinic[];
    setting: Setting;
    user: User;
    sharing_doctor_id: number | null;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
  doctorId: number;
  status: number;
  sharing_doctors: null;
  gender: null;
  created_at: string;
  updated_at: string;
  clinics: Clinic[];
}
interface Setting {
  id: number;
  doctorId: number;
  microsoft_team_status: boolean;
  microsoft_team_link: null;
  microsoft_team_id: null;
  microsoft_team_passcode: null;
  zoom_meeting_status: boolean;
  zoom_meeting_link: null;
  zoom_meeting_id: null;
  zoom_meeting_passcode: null;
  skype_meeting_status: boolean;
  skype_meeting_link: null;
  skype_meeting_id: null;
  skype_meeting_passcode: null;
  f2f_meeting_status: boolean;
  f2f_meeting_link: null;
  f2f_meeting_id: null;
  f2f_meeting_passcode: null;
  telehealth_meeting_status: boolean;
  telehealth_meeting_link: null;
  telehealth_meeting_id: null;
  telehealth_meeting_passcode: null;
  fee: number;
  cancellation_fee: number;
  practice_open_schedule_days: string;
  practice_open_schedule_clock: string;
  practice_close_schedule_clock: string;
  initial_appointment_time: number;
  followup_appointment_time: number;
  initial_appointment_fee: string;
  followup_appointment_fee: string;
  script_renewal_fee: string;
  created_at: string;
  updated_at: string;
  schedule: string;
}

interface Clinic {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  address: string;
  logo: string;
  default: boolean;
  status: number;
  description: null;
  created_at: string;
  updated_at: string;
}

interface Clinic {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  address: string;
  logo: string;
  default: boolean;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface IGetAppointmentListResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    clinicId: number;
    patientId: number;
    doctorId: number;
    date: string;
    status: number;
    type: string;
    meeting_link: null;
    meeting_id: null;
    meeting_passcode: null;
    patient_type: string;
    patient_problem: string;
    note: string | null;
    sessionId: null;
    paymentId: number;
    created_at: string;
    updated_at: string;
    payment: IPayment | null;
    patient: IPatient | null;
    doctor: IDoctor;
    is_reschedule: boolean;
  }[];
}

export interface IGetInvoiceListResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    clinicId: number;
    patientId: number;
    date: string;
    due_date: string;
    status: number;
    note: string;
    amount: string;
    tax_fee: string;
    other_fee: string;
    total_amount: string;
    created_at: string;
    updated_at: string;
    patient: Patient;
  }[];
}

interface Patient {
  id: number;
  patient_id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  status: number;
  title: string;
  potition_on_card: string;
  photo: null;
  country: string;
  unit_number: string;
  street_name: string;
  suburb: string;
  state: string;
  postcode: string;
  date_of_birth: string;
  gender: string;
  medicare_card_number: string;
  medicare_expired_date: string;
  patient_type: string;
  patient_problem: string;
  emergency_first_name: string;
  emergency_last_name: string;
  emergency_mobile_number: string;
  emergency_email: string;
  emergency_relationship: string;
  verification_token: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface IGetInvoiceByIdResponse extends ApiResponse {
  data: {
    id: number;
    clinicId: number;
    patientId: number;
    date: string;
    due_date: string;
    status: number;
    note: string;
    amount: string;
    tax_fee: string;
    other_fee: string;
    total_amount: string;
    created_at: string;
    updated_at: string;
    patient: Patient;
    clinic: Clinic;
    items: Item[];
  };
}

interface Item {
  id: number;
  invoiceId: number;
  code: string;
  name: string;
  description: string;
  amount: string;
  qty: number;
  taxId: number;
  tax_fee: string;
  total_amount: string;
  created_at: string;
  updated_at: string;
}

export interface IGetAppointmentSummaryResponse extends ApiResponse {
  data: {
    upcoming_appointment: number;
    today_appointment: number;
    finished_appointment: number;
    cancelled_appointment: number;
  };
}

interface IClinic {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  address: string;
  logo: string;
  default: boolean;
  status: number;
  description: null;
  created_at: string;
  updated_at: string;
}
export interface IDoctor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  password: string;
  status: number;
  date_of_birth: null;
  gender: null;
  photo: null;
  description: null;
  potition_on_card: null;
  address_line_1: null;
  address_line_2: null;
  country: null;
  unit_number: null;
  street_name: null;
  suburb: null;
  state: null;
  postcode: null;
  specialist: null;
  problem: null;
  emergency_first_name: null;
  emergency_last_name: null;
  emergency_mobile_number: null;
  emergency_email: null;
  emergency_relationship: null;
  timezone: string;
  created_at: string;
  updated_at: string;
}

interface IPayment {
  id: number;
  paymentId: string;
  amount: string;
  stripeId: string;
  type: string;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface IPatient {
  id: number;
  patient_id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  status: number;
  title: null;
  potition_on_card: string;
  photo: null;
  country: string;
  unit_number: null;
  street_name: string;
  suburb: string;
  state: string;
  postcode: string;
  date_of_birth: string;
  gender: string;
  medicare_card_number: string;
  medicare_expired_date: string;
  patient_type: null;
  patient_problem: null;
  emergency_first_name: string;
  emergency_last_name: string;
  emergency_mobile_number: string;
  emergency_email: string;
  emergency_relationship: string;
  verification_token: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface IGetPatientProblemResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }[];
}
export interface IGetPatientTypeResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IUpdateDoctorAssignResponse extends ApiResponse {
  success: boolean;
  message: string;
}

export interface IGetListScheduleResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    doctorId: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    break_times: BreakTime[];
    created_at: string;
    updated_at: string;
  }[];
}

export interface ApiResponseWithMessage {
  success: boolean;
  message: string;
}

export interface IPostUploadImageResponse extends ApiResponse {
  data: {
    public_url: string;
  };
}

export interface IGetAllItemsResponse extends ApiResponse {
  data: {
    id: number;
    code: string;
    name: string;
    description: string;
    price: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IGetSpecialistResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IGetTreatmentResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  }[];
}
export interface IGetTaxesResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    name: string;
    description: string;
    value: number;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IGetRolesResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    permissions: Permission[];
  }[];
}

export interface IGetPermissionsResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IGetAnalyticReportBillingByDoctorIdResponse
  extends ApiResponse {
  data: {
    total_appointment_in_last_30_days: number;
    total_upcoming_appointment: number;
    total_cancellation_appointment: number;
    total_today_appointment: number;
  };
}

export interface IGetUsersResponse extends ApiUsersResponseWithPagination {
  users: {
    id: number;
    name: string;
    email: string;
    status: number;
    role: Role;
    created_at: string;
    updated_at: string;
  }[];
}

interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
}

interface Permission {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IGetUserByIdResponse extends ApiResponse {
  data: {
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number;
    doctorId: null;
    status: number;
    created_at: string;
    updated_at: string;
    role: Role;
    doctor: null;
  };
}

export interface IGetEmailNotificationSettingsResponse extends ApiResponse {
  data: {
    booking_confirmation_email_status: boolean;
    booking_confirmation_email_html: null;
    reschedule_email_status: boolean;
    reschedule_email_html: null;
    account_created_email_status: boolean;
    account_created_email_html: null;
    payment_confirmation_email_status: boolean;
    payment_confirmation_email_html: null;
    account_verification_email_status: boolean;
    account_verification_email_html: null;
    forgot_password_email_status: boolean;
    forgot_password_email_html: null;
    birthday_email_status: boolean;
    birthday_email_html: null;
    reminder_email_status: boolean;
    reminder_email_html: null;
    refund_email_status: boolean;
    refund_email_html: null;
    cancelled_email_status: boolean;
    cancelled_email_html: null;
  };
}

export interface IGetSmsNotificationSettingsResponse extends ApiResponse {
  data: {
    booking_confirmation_sms_status: boolean;
    booking_confirmation_sms_text: null;
    reschedule_sms_status: boolean;
    reschedule_sms_text: null;
    account_created_sms_status: boolean;
    account_created_sms_text: null;
    payment_confirmation_sms_status: boolean;
    payment_confirmation_sms_text: null;
    reminder_sms_status: boolean;
    reminder_sms_text: null;
  };
}

export interface IGetEmailTemplatesResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    name: string;
    html: string;
    created_at: string;
    updated_at: string;
  }[];
}
export interface IGetSmsTemplatesResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    name: string;
    text: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IGetRolesResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    permissions: Permission[];
  }[];
}

export interface IGetDashboardSummaryResponse extends ApiResponse {
  data: {
    total_appointment: number;
    total_upcomping_appointment: number;
    total_patient: number;
    total_cancelled_appointment: number;
  };
}

export interface IGetPharmachyListResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    clinicId: number;
    name: string;
    phone: string;
    dispense_email: string;
    billing_email: string;
    website: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    postcode: string;
    url_logo: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IPostGetDoctorAvailabilityByClinicResponse
  extends ApiResponse {
  success: boolean;
  data: {
    time: string;
    available: boolean;
  }[];
}

export interface IGetPatientFlagResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    patientId: number;
    category: string;
    description: string;
    created_by: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IGetCouponsResponse extends ApiResponseWithPagination {
  data: {
    id: number;
    type: string;
    name: string;
    code: string;
    description: string;
    discount_type: string;
    discount_amount: string;
    expiry_date: string;
    patient_limit_use: number;
    limit: number;
    category: string;
    restrict_patient: number[];
  }[];
}

export interface IGetTwilioConfigResponse extends ApiResponse {
  data: {
    account_id: null;
    auth_token: null;
    from_number: null;
    id: number;
    created_at: string;
    updated_at: string;
    status: boolean;
  };
}

export interface IGetSmtpConfigResponse extends ApiResponse {
  data: {
    id: number;
    smtp_host: string;
    smtp_port: string;
    smtp_username: string;
    smtp_password: string;
    secure_type: string;
    mail_from: string;
    created_at: string;
    updated_at: string;
  };
}

export interface IGetDoctorCostByIdResponse extends ApiResponse {
  data: {
    id: number;
    doctorId: number;
    treatmentId: number;
    amount: string;
    amount_moderated: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IGetCalendarScheduleByClinicIdResponse extends ApiResponse {
  data: {
    date: string;
  }[];
}

export interface IGetAwsS3ConfigResponse extends ApiResponse {
  data: {
    id: number;
    aws_access_id: string;
    aws_secret_key: string;
    bucket: string;
    region: string;
    endpoint: string;
    status: boolean;
    created_at: string;
    updated_at: string;
  };
}

export interface IGetPatientDocumentationResponse
  extends ApiResponseWithPagination {
  data: {
    id: number;
    patientId: number;
    name: string;
    url: string;
    size: number;
    type: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IPostCouponCodeValidationResponse extends ApiResponse {
  data: {
    id: number;
    type: string;
    name: string;
    description: string;
    code: string;
    discount_type: string;
    discount_amount: number;
    expiry_date: string;
    patient_limit_use: number;
    limit: number;
    remaining_limit: number;
    category: string;
    restrict_patient: string;
    created_at: string;
    updated_at: string;
  };
}

export interface IGetApiKeyConnectionResponse
  extends ApiResponseWithPagination {
  data: {
    id: number;
    hostname: string;
    name: string;
    token: string;
    status: boolean;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IPostConnectMainClinicResponse extends ApiResponse {
  data: {
    sessionId: string;
    access_token: string;
  };
}

export interface IPostConnectionStatusResponse extends ApiResponse {
  data: {
    sessionId: string;
  };
}
