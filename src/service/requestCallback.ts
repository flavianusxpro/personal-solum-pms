import { axiosApi } from '@/config/base-api';
import { IParamsGetRequestCallback } from '@/types/paramTypes';

export function getRequestCallback(params: IParamsGetRequestCallback) {
  return axiosApi.get('/admin/clinic/request-callback');
}
