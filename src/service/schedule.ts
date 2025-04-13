import { get, post, put } from '@/app/api/api';
import { IGetListScheduleResponse } from '@/types/ApiResponse';
import {
  IParamGetListSchedule,
  IPayloadPostCreateSchedule,
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

export async function putUpdateSchedule(payload: IPayloadPostCreateSchedule) {
  return put<any>(`admin/schedule/${payload.id}`, payload);
}
