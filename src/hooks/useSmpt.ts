import { getSmptConfig, putUpdateSmptConfig } from '@/service/smpt';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetSmtpConfig(clinicId?: number) {
  return useQuery({
    queryKey: ['smptConfig'],
    queryFn: () => getSmptConfig(clinicId),
    enabled: !!clinicId,
  });
}

export function useUpdateSmtpConfig() {
  return useMutation({
    mutationFn: putUpdateSmptConfig,
  });
}
