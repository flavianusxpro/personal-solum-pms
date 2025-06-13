import { del, get, post, put } from '@/config/api';
import {
  IGetAllPatientsResponse,
  IGetPatientByIdResponse,
  IGetPatientDocumentationResponse,
  IGetPatientProblemResponse,
  IGetPatientTypeResponse,
  IUpdateDoctorAssignResponse,
} from '@/types/ApiResponse';
import {
  IParamGetAllPatient,
  IParamGetPatientProblem,
  IParamGetPatientTypes,
  IParamsGetPatientDocumentation,
  IPayloadCreateEditPatient,
  IPayloadCreatePatientProblem,
  IPayloadPatientAssignClinic,
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

export async function getPatientDocumentation(
  params: IParamsGetPatientDocumentation
) {
  return await get<IGetPatientDocumentationResponse>('/admin/patient/file', {
    params,
  });
}

export async function postUploadPatientDocumentation(payload: FormData) {
  return await post('/admin/patient/file', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
export async function putUpdatePatientDocumentation(payload: FormData) {
  const id = payload.get('id');
  return await put(`/admin/patient/file/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function deletePatientDocumentation(ids: string[]) {
  return await del(`/admin/patient/file/`, {
    data: {
      ids,
    },
  });
}

export async function putPatientAssignClinic(
  payload: IPayloadPatientAssignClinic
) {
  return await put(`/admin/patient/${payload.uuid}/assign-clinic`, {
    clinic_ids: payload.clinic_ids,
  });
}
