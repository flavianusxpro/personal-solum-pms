import { post } from '@/app/api/api';
import { IPayloadRegisterForPatient } from '@/types/paramTypes';

export async function registerForClient(payload: IPayloadRegisterForPatient) {
  return await post<any>('/patient/auth/register', payload);
}
