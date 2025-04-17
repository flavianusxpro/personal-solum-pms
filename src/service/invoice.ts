import { get, post } from '@/app/api/api';
import {
  IGetAllItemsResponse,
  IGetAppointmentListResponse,
} from '@/types/ApiResponse';
import { IParamGetInvoices, IPayloadCreateInvoice } from '@/types/paramTypes';

export async function getInvoiceList(params: IParamGetInvoices) {
  return await get<IGetAppointmentListResponse>('/admin/invoice/', {
    params,
  });
}

export async function postCreateInvoice(payload: IPayloadCreateInvoice) {
  return await post('/admin/invoice/', payload);
}

export async function getItems() {
  return await get<IGetAllItemsResponse>('/admin/invoice/item').then(
    (res) => res.data
  );
}
