import { post } from '@/config/api';
import { IPayloadClinicConnection } from '@/types/paramTypes';

export function postClinicConnection(payload: IPayloadClinicConnection) {
  return post('/api/connection/connect', payload);
}
