import { get, post } from '@/app/api/api';
import {
  IGetAllPatientsResponse,
  IGetPatientByIdResponse,
} from '@/types/ApiResponse';
import { IParamGetAllPatient, IPayloadCreatePatient } from '@/types/paramTypes';

export async function getPatientList(params: IParamGetAllPatient) {
  return await get<IGetAllPatientsResponse>('/admin/patient', {
    params,
  }).then((res) => {
    return res.data;
  });
}

export async function getPatientById(id: string) {
  return await get<IGetPatientByIdResponse>(`/admin/patient/detail/${id}`).then(
    (res) => {
      return res.data;
    }
  );
}
export async function postCreatePatient(payload: IPayloadCreatePatient) {
  return await post<any>('/admin/patient', payload);
}
