import { getTwilioConfig, putUpdateTwilioConfig } from '@/service/twilio';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetTwilioConfig(clinicId?: number) {
  return useQuery({
    queryKey: ['twilioConfig'],
    queryFn: () => getTwilioConfig(clinicId),
    enabled: !!clinicId,
  });
}

export function useUpdateTwilioConfig() {
  return useMutation({
    mutationFn: putUpdateTwilioConfig,
  });
}
