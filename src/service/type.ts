import { del, get, post, put } from '@/config/base-api';
import { IPayloadType } from '@/types/paramTypes';
import { IGetType } from '@/types/ApiResponse';

const url = 'admin/patient/type';

export async function getType(params: { page: number; perPage: number }) {
  return await get<IGetType>(url, { params });
}

export async function postType(payload: IPayloadType) {
  return await post(url, payload);
}

export async function putType(payload: IPayloadType) {
  return await put(`${url}/` + payload.id, payload);
}

// export async function deleteType(ids: string) {
//   return await del(`${url}/`, { data: { ids } });
// }
export async function deleteType(id: string) {
  return await del(`${url}/${id}`);
}
