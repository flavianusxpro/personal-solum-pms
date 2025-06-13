import { getProfile, putUpdatePassword } from '@/service/profile';
import { IPayloadUpdatePassword } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useProfile = (enabled: boolean) =>
  useQuery({
    queryKey: ['profile' + enabled ? 'enabled' : 'disabled'],
    queryFn: async () => getProfile(),
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: enabled,
  });

export function useUpdatePassword() {
  return useMutation({
    mutationFn: async (paylaod: IPayloadUpdatePassword) =>
      putUpdatePassword(paylaod),
  });
}
