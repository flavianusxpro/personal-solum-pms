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
