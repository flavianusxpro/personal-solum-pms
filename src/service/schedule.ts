import { del, get, post, put } from '@/config/api';
import { IGetListScheduleResponse } from '@/types/ApiResponse';
import {
  IParamGetListSchedule,
  IPayloadPostCreateSchedule,
  IPayloadPutUpdateSchedule,
} from '@/types/paramTypes';

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
