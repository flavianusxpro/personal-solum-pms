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
  return await get<IGetAppointmentListResponse>('/admin/appointment', {
    params,
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
