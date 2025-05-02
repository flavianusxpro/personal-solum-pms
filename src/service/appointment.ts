import { del, get, post } from '@/app/api/api';
import {
  IGetAppointmentListResponse,
  IGetAppointmentSummaryResponse,
} from '@/types/ApiResponse';
import {
  IParamGetAppointments,
  IPayloadPostAppoinment,
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
  return await post<any>('/admin/appointment/', payload).then((res) => {
    return res.data;
  });
}

export async function deleteAppointment(id: string) {
  return await del<any>(`/admin/appointment/${id}`);
}
