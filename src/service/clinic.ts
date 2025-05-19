import { del, get, post, put } from '@/config/api';
import {
  IGetAllClinicForPatientResponse,
  IGetClinicByIdForPatientResponse,
} from '@/types/ApiResponse';
import {
  IParamGetAllClinic,
  IPayloadCreateUpdateClinic,
} from '@/types/paramTypes';

export async function getAllClinics(params: IParamGetAllClinic) {
  const url = `${params.role}/clinic`;
  return await get<IGetAllClinicForPatientResponse>(url, {
    params,
  });
}

export async function getClinicByIdForPatient(id: string) {
  return await get<IGetClinicByIdForPatientResponse>(
    '/patient/clinic/' + id
  ).then((res) => res.data);
}

export async function postCreateClinic(payload: IPayloadCreateUpdateClinic) {
  return await post('/admin/clinic', payload);
}

export async function putUpdateClinic(payload: IPayloadCreateUpdateClinic) {
  return await put('/admin/clinic/' + payload.id, payload);
}

export async function deleteClinic(id: string) {
  return await del('/admin/clinic/' + id);
}
