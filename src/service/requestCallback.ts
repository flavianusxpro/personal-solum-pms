import { axiosApi } from '@/config/base-api';
import { IParamsGetRequestCallback } from '@/types/paramTypes';

export function getRequestCallback(params: IParamsGetRequestCallback) {
  return axiosApi.get('/admin/clinic/request-callback');
}

export function updateRequestCallback(id: number, data: { status: string }) {
  return axiosApi.put(`/admin/clinic/request-callback/${id}`, data);
}
