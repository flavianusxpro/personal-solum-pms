import { del, get, post, put } from '@/config/base-api';
import { IGetListScheduleResponse } from '@/types/ApiResponse';
import {
  IParamGetDoctorScheduleForMainClinic,
  IParamGetListSchedule,
  IParamGetScheduleSharingDoctorForMainClinic,
  IPayloadPostCreateSchedule,
  IPayloadPutUpdateSchedule,
} from '@/types/paramTypes';
import axios from 'axios';

export async function getlistSchedule(params: IParamGetListSchedule) {
  return get<IGetListScheduleResponse>('admin/schedule', {
    params,
  }).then((res) => res.data);
}

export async function getScheduleById(id: string) {
  return get<any>(`admin/schedule/${id}`);
}

export async function postCreateSchedule(payload: IPayloadPostCreateSchedule) {
  return post<any>('admin/schedule', payload);
}

export async function putUpdateSchedule(payload: IPayloadPutUpdateSchedule) {
  return put<any>(`admin/schedule/${payload.id}`, payload);
}

export async function deleteSchedule(ids: number[]) {
  return del<any>(`admin/schedule/`, { data: { ids } });
}

export async function getScheduleFromMainClinicByDoctorId(
  params: IParamGetDoctorScheduleForMainClinic
) {
  return axios.get<any>(`${params.apiUrl}/api/doctor/schedule`, {
    params: { doctorId: params.doctorId },
    headers: {
      'X-Session-ID': params.xSessionId,
      'X-Token': params.xtoken,
    },
  });
}

export async function getScheduleSharingDoctorFromMainClinic(
  params: IParamGetScheduleSharingDoctorForMainClinic
) {
  return get<IGetListScheduleResponse>(`/admin/doctor/sharing/schedule`, {
    params: { sharingDoctorId: params.sharingDoctorId },
  });
}
