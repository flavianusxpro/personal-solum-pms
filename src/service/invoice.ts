import { del, get, post, put } from '@/app/api/api';
import {
  IGetAllItemsResponse,
  IGetAppointmentByIdResponse,
  IGetAppointmentListResponse,
} from '@/types/ApiResponse';
import { IParamGetInvoices, IPayloadCreateInvoice } from '@/types/paramTypes';

export async function getInvoiceList(params: IParamGetInvoices) {
  return await get<IGetAppointmentListResponse>('/admin/invoice/', {
    params,
  });
}

export async function getInvoiceById(id: string) {
  return await get<IGetAppointmentByIdResponse>(`/admin/invoice/detail/${id}`);
}

export async function postCreateInvoice(payload: IPayloadCreateInvoice) {
  return await post('/admin/invoice/', payload);
}

export async function putCreateInvoice(payload: IPayloadCreateInvoice) {
  return await put('/admin/invoice/' + payload.id, payload);
}

export async function getItems() {
  return await get<IGetAllItemsResponse>('/admin/invoice/item').then(
    (res) => res.data
  );
}

export async function deleteInvoice(id: string) {
  return await del(`/admin/invoice/${id}`);
}
