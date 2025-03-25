import { get, post } from '@/app/api/api';
import {
  IGetAllClinicForPatientResponse,
  IGetClinicByIdForPatientResponse,
  IGetDoctorByClinicForPatientResponse,
} from '@/types/ApiResponse';
import {
  IParamGetAllClinicForPatient,
  IParamGetDoctorByClinicForPatient,
  IPayloadRegisterForPatient,
} from '@/types/paramTypes';

export async function getAllClinicsForPatient(
  params: IParamGetAllClinicForPatient
) {
  return await get<IGetAllClinicForPatientResponse>('/patient/clinic', {
    params,
  });
}

export async function getClinicByIdForPatient(id: string) {
  return await get<IGetClinicByIdForPatientResponse>(
    '/patient/clinic/' + id
  ).then((res) => res.data);
}

export async function getDoctorByClinicForPatient(
  params: IParamGetDoctorByClinicForPatient
) {
  return await get<IGetDoctorByClinicForPatientResponse>(
    '/patient/clinic/' + params.id + '/doctor',
    {
      params,
    }
  ).then((res) => res.data);
}

export async function registerForClient(payload: IPayloadRegisterForPatient) {
  return await post<any>('/patient/auth/register', payload);
}
