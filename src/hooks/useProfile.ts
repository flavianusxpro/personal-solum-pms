import { getProfile, putUpdatePassword } from '@/service/profile';
import { IPayloadUpdatePassword } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: async () => getProfile(),
  });

export function useUpdatePassword() {
  return useMutation({
    mutationFn: async (paylaod: IPayloadUpdatePassword) =>
      putUpdatePassword(paylaod),
  });
}
