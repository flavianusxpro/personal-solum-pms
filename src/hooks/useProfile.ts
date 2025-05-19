import { getProfile, putUpdatePassword } from '@/service/profile';
import { IPayloadUpdatePassword } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: async () => getProfile(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

export function useUpdatePassword() {
  return useMutation({
    mutationFn: async (paylaod: IPayloadUpdatePassword) =>
      putUpdatePassword(paylaod),
  });
}
