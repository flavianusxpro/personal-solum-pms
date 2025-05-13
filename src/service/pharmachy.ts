import { del, get, post, put } from '@/app/api/api';
import { IGetPharmachyListResponse } from '@/types/ApiResponse';
import {
  IParamsGetPharmachies,
  IPayloadCreateEditPharmachy,
} from '@/types/paramTypes';

export async function getPharmachyList(params: IParamsGetPharmachies) {
  return await get<IGetPharmachyListResponse>('/admin/clinic/pharmacy', {
    params,
  });
}

export async function postCreatePharmachy(
  payload: IPayloadCreateEditPharmachy
) {
  return await post('/admin/clinic/pharmacy', payload);
}

export async function putUpdatePharmachy(payload: IPayloadCreateEditPharmachy) {
  return await put(`/admin/clinic/pharmacy/${payload.id}`, payload);
}

export async function deletePharmachy(ids: number[]) {
  return await del(`/admin/clinic/pharmacy/`, { data: { ids } });
}
