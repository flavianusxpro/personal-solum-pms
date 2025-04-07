import { get, post, put } from '@/app/api/api';
import {
  IGetAllPatientsResponse,
  IGetPatientByIdResponse,
} from '@/types/ApiResponse';
import {
  IParamGetAllPatient,
  IPayloadCreateEditPatient,
} from '@/types/paramTypes';

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
export async function postCreatePatient(payload: IPayloadCreateEditPatient) {
  return await post<any>('/admin/patient', payload);
}

export async function putCreatePatient(payload: IPayloadCreateEditPatient) {
  return await put<any>('/admin/patient/' + payload.patient_id, payload);
}
