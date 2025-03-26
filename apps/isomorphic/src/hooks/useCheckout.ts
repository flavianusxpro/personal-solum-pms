import { postCheckout } from '@/service/checkout';
import { IPayloadCheckout } from '@/types/paramTypes';
import { useMutation } from '@tanstack/react-query';

export const useCheckout = () => {
  return useMutation({
    mutationFn: async (payload: IPayloadCheckout) => postCheckout(payload),
  });
};
