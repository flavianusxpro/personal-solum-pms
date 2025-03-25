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
