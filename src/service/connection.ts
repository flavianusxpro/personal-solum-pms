import { get, post } from '@/config/api';
import { IGetApiKeyConnectionResponse } from '@/types/ApiResponse';
import {
  IParamsGetApiConnection,
  IPayloadClinicConnection,
} from '@/types/paramTypes';

export function postClinicConnection(payload: IPayloadClinicConnection) {
  return post('/api/connection/connect', payload);
}

export function getApiKeyConnection(params: IParamsGetApiConnection) {
  return get<IGetApiKeyConnectionResponse>('/admin/setting/apis', { params });
}
