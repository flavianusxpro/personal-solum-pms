
import { del, get, post, put } from '@/config/base-api';
import { IPayloadPostPaymentConfiguration } from '@/types/paramTypes';

export async function getPaymentConfiguration(params: any) {
    return await get<any>('/admin/payment-method-configuration', {
        params
    })
}

export async function putPaymentConfiguration(payload: IPayloadPostPaymentConfiguration) {
  return await put<any>('/admin/payment-method-configuration/' + payload.payment_method_id, payload);
}