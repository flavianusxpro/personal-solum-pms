import { del, get, post, put } from '@/app/api/api';
import { IParamsPatientFlags, IPayloadPasientFlag } from '@/types/paramTypes';

export async function getPatientFlags(params: IParamsPatientFlags) {
  return await get('admin/patient/flag', { params });
}

export async function postCreatePatientFlag(payload: IPayloadPasientFlag) {
  return await post('admin/patient/flag', payload);
}

export async function putUpdatePatientFlag(payload: IPayloadPasientFlag) {
  return await put('admin/patient/flag/' + payload.id, payload);
}

export async function deletePatientFlag(ids: string[]) {
  return await del('admin/patient/flag/' + { data: ids });
}
