import {
  postForgotPassword,
  postVerifyAccount,
  registerForClient,
} from '@/service/auth';
import { IPayloadRegisterForPatient } from '@/types/paramTypes';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () =>
  useMutation({
    mutationFn: async (payload: IPayloadRegisterForPatient) =>
      registerForClient(payload),
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: postForgotPassword,
  });

export function usePostVerifyAccount() {
  return useMutation({
    mutationFn: postVerifyAccount,
  });
}
