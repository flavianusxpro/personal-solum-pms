import { del, get, post, put } from '@/app/api/api';
import {
  IGetInvoiceByIdResponse,
  IGetInvoiceListResponse,
} from '@/types/ApiResponse';
import { IParamGetInvoices, IPayloadCreateInvoice } from '@/types/paramTypes';

export async function getInvoiceList(params: IParamGetInvoices) {
  return await get<IGetInvoiceListResponse>('/admin/invoice/', {
    params,
  });
}

export async function getInvoiceById(id: string) {
  return await get<IGetInvoiceByIdResponse>(`/admin/invoice/detail/${id}`).then(
    (res) => res.data
  );
}

export async function postCreateInvoice(payload: IPayloadCreateInvoice) {
  return await post('/admin/invoice/', payload);
}

export async function putCreateInvoice(payload: IPayloadCreateInvoice) {
  return await put('/admin/invoice/' + payload.id, payload);
}

export async function deleteInvoice(ids: number[]) {
  return await del(`/admin/invoice`, {
    data: {
      ids,
    },
  });
}
