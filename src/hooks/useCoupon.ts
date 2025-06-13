import {
  deleteCoupon,
  getCoupons,
  postCouponCodeValidation,
  postCreateCoupon,
  putUpdateCoupon,
} from '@/service/coupon';
import { IParamsGetCoupons } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetCoupons(params: IParamsGetCoupons) {
  return useQuery({
    queryKey: ['coupons'],
    queryFn: () => getCoupons(params),
  });
}

export function useCreateCoupon() {
  return useMutation({
    mutationFn: postCreateCoupon,
  });
}

export function useUpdateCoupon() {
  return useMutation({
    mutationFn: putUpdateCoupon,
  });
}

export function useDeleteCoupon() {
  return useMutation({
    mutationFn: deleteCoupon,
  });
}

export function useCouponCodeValidation() {
  return useMutation({
    mutationFn: postCouponCodeValidation,
  });
}
