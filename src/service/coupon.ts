import { del, get, post, put } from '@/config/base-api';
import {
  IGetCouponsResponse,
  IPostCouponCodeValidationResponse,
} from '@/types/ApiResponse';
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

export async function postCouponCodeValidation(payload: string) {
  return await post<IPostCouponCodeValidationResponse>(
    '/admin/coupon/validation',
    { coupon_code: payload }
  );
}
