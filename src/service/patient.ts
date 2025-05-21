import { del, get, post, put } from '@/config/api';
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
  IPayloadCreatePatientProblem,
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

export async function deletePatient(ids: number[]) {
  return await del<any>(`/admin/patient`, {
    data: {
      ids,
    },
  });
}

export async function getPatientTypes(params: IParamGetPatientTypes) {
  return await get<IGetPatientTypeResponse>('/admin/patient/type', {
    params,
  }).then((res) => {
    return res.data;
  });
}

export async function getPatientProblem(params: IParamGetPatientProblem) {
  return await get<IGetPatientProblemResponse>('/admin/patient/problem', {
    params,
  });
}

export async function createPatientProblem(
  payload: IPayloadCreatePatientProblem
) {
  return await post('/admin/patient/problem', payload);
}

export async function updatePatientProblem(
  payload: IPayloadCreatePatientProblem
) {
  return await put('/admin/patient/problem/' + payload.id, payload);
}

export async function deletePatientProblem(id: string) {
  return await del(`/admin/patient/problem/${id}`);
}

export async function putUpdateAssignDoctor(
  params: IPayloadUpdateAssignDoctor
) {
  return await put<IUpdateDoctorAssignResponse>(
    `/admin/patient/${params.patient_id}/assign-doctor/`,
    params
  );
}
