import { get } from '@/app/api/api';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import { IParamGetInvoices } from '@/types/paramTypes';

export async function getInvoiceList(params: IParamGetInvoices) {
  return await get<IGetAppointmentListResponse>('/admin/invoice/', {
    params,
  });
}
