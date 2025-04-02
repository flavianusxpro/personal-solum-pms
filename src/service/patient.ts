import { get, post } from '@/app/api/api';
import { IGetAllPatientsResponse } from '@/types/ApiResponse';
import { IParamGetAllPatient, IPayloadCreatePatient } from '@/types/paramTypes';

export async function getPatientList(params: IParamGetAllPatient) {
  return await get<IGetAllPatientsResponse>('/admin/patient', {
    params,
  });
}

export async function getPatientById(id: string) {
  return await get<any>(`/admin/patient/detail/${id}`);
}
export async function postCreatePatient(payload: IPayloadCreatePatient) {
  return await post<any>('/admin/patient', payload);
}
