interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  permissions: any[]; // You can replace 'any' with a more specific type if needed
}

interface UserData {
  access_token: string;
  role: Role;
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

export interface IGetDoctorByClinicForPatientResponse extends ApiResponse {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    gender: null;
    url_photo: null;
    specialist: null;
    description: null;
    appointment_duration: Appointmentduration;
    appointment_fee: Appointmentfee;
    appointment_schedule: Appointmentschedule;
    booked_times: Booked_Times[];
  }[];
}

interface Booked_Times {
  date: string;
  booked_times: string[];
}

interface Appointmentschedule {
  practices_open: string;
  practices_close: string;
}

interface Appointmentfee {
  initial: string;
  followup: string;
}

interface Appointmentduration {
  initial: number;
  followup: number;
}

export interface IGetProfileResponse extends ApiResponse {
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
    verification_token: string;
    timezone: string;
    created_at: string;
    updated_at: string;
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
    verification_token: null;
    timezone: string;
    created_at: string;
    updated_at: string;
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
    date_of_birth: null;
    gender: null;
    url_photo: null;
    description: null;
    medicare_card_number: string;
    medicare_expired_date: string;
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
  }[];
}

export interface IGetDoctorByIdResponse extends ApiResponse {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    password: string;
    status: number;
    address: string;
    date_of_birth: string;
    gender: null;
    url_photo: null;
    description: null;
    medicare_card_number: string;
    medicare_expired_date: string;
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
    clinics: Clinic[];
    setting: Setting;
  };
}

interface Setting {
  id: number;
  doctorId: number;
  microsoft_team_link: null;
  microsoft_team_id: null;
  microsoft_team_passcode: null;
  zoom_meeting_link: null;
  zoom_meeting_id: null;
  zoom_meeting_passcode: null;
  fee: number;
  cancellation_fee: number;
  practice_open_schedule_days: null;
  practice_open_schedule_clock: string;
  practice_close_schedule_clock: string;
  initial_appointment_time: number;
  followup_appointment_time: number;
  initial_appointment_fee: string;
  followup_appointment_fee: string;
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
