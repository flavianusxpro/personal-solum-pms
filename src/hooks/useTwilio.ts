import { getTwilioConfig, putUpdateTwilioConfig } from '@/service/twilio';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetTwilioConfig() {
  return useQuery({
    queryKey: ['twilioConfig'],
    queryFn: () => getTwilioConfig(),
  });
}

export function useUpdateTwilioConfig() {
  return useMutation({
    mutationFn: putUpdateTwilioConfig,
  });
}
