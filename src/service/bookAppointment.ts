import { post } from '@/config/base-api';
import {
  IPostCouponCodeValidationResponse,
  IPostOneTimePaymentResponse,
} from '@/types/ApiResponse';
import {
  IPayloadPostBookAppoinment,
  IPayloadPostPaymentMethod,
} from '@/types/paramTypes';

export async function postBookAppointment(payload: IPayloadPostBookAppoinment) {
  return await post<any>('/patient/appointment/book', payload);
}

export async function postOneTimePayment(payload: IPayloadPostPaymentMethod) {
  return await post<IPostOneTimePaymentResponse>(
    '/patient/payment/one-time',
    payload
  );
}
