import { del, get, post, put } from '@/config/base-api';
import {
  IGetAppointmentListResponse,
  IGetAppointmentSummaryResponse,
} from '@/types/ApiResponse';
import {
  IParamGetAppointments,
  IPayloadPostAppoinment,
  IPayloadPostCancelAppoinment,
  IPayloadPostRescheduleByDate,
  IPayloadPutUpdateAppoinment,
} from '@/types/paramTypes';

export async function getAppointmentList(params: IParamGetAppointments) {
  return await get<IGetAppointmentListResponse>('/admin/appointment', {
    params,
    headers: {
      timezone_client: params.timezone_client,
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

export async function deleteAppointment(ids: number[]) {
  return await del<any>(`/admin/appointment`, {
    data: {
      ids,
    },
  });
}

export async function postCancelAppointment(
  payload: IPayloadPostCancelAppoinment
) {
  return await post(`/admin/appointment/${payload.id}/cancel`, payload);
}

export async function postRescheduleAppointmentByDate(
  payload: IPayloadPostRescheduleByDate
) {
  return await post(`/admin/appointment/${payload.id}/reschedule`, payload);
}
