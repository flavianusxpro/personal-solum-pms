import {
  postBookAppointment,
  postOneTimePayment,
} from '@/service/bookAppointment';
import {
  IPayloadPostBookAppoinment,
  IPayloadPostPaymentMethod,
} from '@/types/paramTypes';
import { useMutation } from '@tanstack/react-query';

export function useBookAppoinment() {
  return useMutation({
    mutationFn: async (payload: IPayloadPostBookAppoinment) =>
      postBookAppointment(payload),
  });
}

export function useOneTimePayment() {
  return useMutation({
    mutationFn: async (payload: IPayloadPostPaymentMethod) =>
      postOneTimePayment(payload),
  });
}
