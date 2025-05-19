import { del, get, post, put } from '@/config/api';
import { IGetCouponsResponse } from '@/types/ApiResponse';
import {
  IParamsGetCoupons,
  IPayloadCreateUpdateCoupon,
} from '@/types/paramTypes';

export async function getCoupons(params: IParamsGetCoupons) {
  return await get<IGetCouponsResponse>('/admin/coupon', { params });
}

export async function postCreateCoupon(payload: IPayloadCreateUpdateCoupon) {
  return await post('/admin/coupon', payload);
}

export async function putUpdateCoupon(payload: IPayloadCreateUpdateCoupon) {
  return await put(`/admin/coupon/${payload.id}`, payload);
}

export async function deleteCoupon(ids: number[]) {
  return await del(`/admin/coupon/`, { data: { ids } });
}
