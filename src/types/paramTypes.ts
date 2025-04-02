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

export interface IPayloadCreatePatient {
  patient_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_number: string;
  status: number;
  address: string;
  date_of_birth: string;
  gender: string;
  medicare_card_number: string;
  medicare_expired_date: string;
  timezone: string;
}

export interface IParamGetAllPatient extends IParamGetDataWithPagination {}
