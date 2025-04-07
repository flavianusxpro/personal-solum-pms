import { get } from '@/app/api/api';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import { IParamGetAppointments } from '@/types/paramTypes';

export async function getAppointmentList(params: IParamGetAppointments) {
  return await get<IGetAppointmentListResponse>('/admin/appointment/', {
    params,
  }).then((res) => {
    return res.data;
  });
}
