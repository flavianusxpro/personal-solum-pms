import { post } from '@/app/api/api';
import { IPayloadCheckout } from '@/types/paramTypes';

export async function postCheckout(payload: IPayloadCheckout) {
  return await post<any>('/checkout', payload);
}
