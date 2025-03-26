import { registerForClient } from '@/service/auth';
import { IPayloadRegisterForPatient } from '@/types/paramTypes';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () =>
  useMutation({
    mutationFn: async (payload: IPayloadRegisterForPatient) =>
      registerForClient(payload),
  });
