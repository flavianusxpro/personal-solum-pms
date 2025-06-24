import { get, post } from '@/config/api';
import { IGetApiKeyConnectionResponse } from '@/types/ApiResponse';
import { IPayloadClinicConnection } from '@/types/paramTypes';

export function postClinicConnection(payload: IPayloadClinicConnection) {
  return post('/api/connection/connect', payload);
}

export function getApiKeyConnection() {
  return get<IGetApiKeyConnectionResponse>('/admin/setting/apis');
}
