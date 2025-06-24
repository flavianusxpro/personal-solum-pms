import { post } from '@/config/base-api';
import { IPayloadCheckout } from '@/types/paramTypes';

export async function postCheckout(payload: IPayloadCheckout) {
  return await post<any>('/checkout', payload);
}
