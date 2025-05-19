import { getSmptConfig, putUpdateSmptConfig } from '@/service/smpt';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetSmtpConfig() {
  return useQuery({
    queryKey: ['smptConfig'],
    queryFn: () => getSmptConfig(),
  });
}

export function useUpdateSmtpConfig() {
  return useMutation({
    mutationFn: putUpdateSmptConfig,
  });
}
