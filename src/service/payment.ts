
import { del, get, post, put } from '@/config/base-api';

export async function getPaymentConfiguration(params: any) {
    return await get<any>('/admin/payment-method-configuration', {
        params
    })
}

export async function putPaymentConfiguration(payload: any) {
  return await put<any>('/admin/patient/' + payload.id, payload);
}