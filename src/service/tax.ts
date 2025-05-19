import { del, get, post, put } from '@/config/api';
import { IGetTaxesResponse } from '@/types/ApiResponse';
import { IParamGetTaxes, IPayloadCreateEditTax } from '@/types/paramTypes';

export async function getTaxes(params: IParamGetTaxes) {
  return get<IGetTaxesResponse>('/admin/setting/taxes', { params });
}

export async function postCreateTax(payload: IPayloadCreateEditTax) {
  return post('/admin/setting/taxes', payload);
}

export async function putUpdateTax(payload: IPayloadCreateEditTax) {
  return put(`/admin/setting/taxes/${payload.id}`, payload);
}

export async function deleteTax(id: string) {
  return del(`/admin/setting/taxes/${id}`);
}
