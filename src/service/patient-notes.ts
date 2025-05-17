import { del, get, post, put } from '@/app/api/api';
import { IParamsPatientNotes, IPayloadPasientNote } from '@/types/paramTypes';

export async function getPatientNotes(params: IParamsPatientNotes) {
  return await get('admin/patient/note', { params });
}

export async function postCreatePatientNote(payload: IPayloadPasientNote) {
  return await post('admin/patient/note', payload);
}

export async function putUpdatePatientNote(payload: IPayloadPasientNote) {
  return await put('admin/patient/note/' + payload.id, payload);
}

export async function deletePatientNote(ids: string[]) {
  return await del('admin/patient/note/' + { data: ids });
}
