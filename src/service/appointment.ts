import { del, get, post, put } from '@/app/api/api';
import {
  IGetAppointmentListResponse,
  IGetAppointmentSummaryResponse,
} from '@/types/ApiResponse';
import {
  IParamGetAppointments,
  IPayloadPostAppoinment,
  IPayloadPutUpdateAppoinment,
} from '@/types/paramTypes';

export async function getAppointmentList(params: IParamGetAppointments) {
  const q = JSON.stringify({
    doctorName: params.doctorName,
  });
  return await get<IGetAppointmentListResponse>('/admin/appointment', {
    params: {
      page: params.page,
      perPage: params.perPage,
      q,
    },
  });
}
export async function getSummaryAppointments() {
  return await get<IGetAppointmentSummaryResponse>(
    '/admin/appointment/analytics/summary'
  ).then((res) => {
    return res.data;
  });
}
export async function postCreateAppointment(payload: IPayloadPostAppoinment) {
  return await post<any>('/admin/appointment/', payload);
}

export async function putUpdateAppointment(
  payload: IPayloadPutUpdateAppoinment
) {
  return await put<any>(`/admin/appointment/${payload.id}`, payload);
}

export async function deleteAppointment(id: string) {
  return await del<any>(`/admin/appointment/${id}`);
}
