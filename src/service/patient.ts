import { del, get, post, put } from '@/app/api/api';
import {
  IGetAllPatientsResponse,
  IGetPatientByIdResponse,
  IGetPatientProblemResponse,
  IGetPatientTypeResponse,
  IUpdateDoctorAssignResponse,
} from '@/types/ApiResponse';
import {
  IParamGetAllPatient,
  IParamGetPatientProblem,
  IParamGetPatientTypes,
  IPayloadCreateEditPatient,
  IPayloadUpdateAssignDoctor,
} from '@/types/paramTypes';

export async function getPatientList(params: IParamGetAllPatient) {
  return await get<IGetAllPatientsResponse>('/admin/patient', {
    params,
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

export async function putUpdatePatient(payload: IPayloadCreateEditPatient) {
  return await put<any>('/admin/patient/' + payload.patient_id, payload);
}

export async function deletePatient(id: string) {
  return await del<any>(`/admin/patient/${id}`);
}

export async function getPatientTypes(params: IParamGetPatientTypes) {
  return await get<IGetPatientProblemResponse>('/admin/patient/type', {
    params,
  }).then((res) => {
    return res.data;
  });
}

export async function getPatientProblem(params: IParamGetPatientProblem) {
  return await get<IGetPatientTypeResponse>('/admin/patient/problem', {
    params,
  }).then((res) => {
    return res.data;
  });
}

export async function putUpdateAssignDoctor(
  params: IPayloadUpdateAssignDoctor
) {
  return await put<IUpdateDoctorAssignResponse>(
    `/admin/patient/${params.patient_id}/assign-doctor/`,
    params
  );
}
