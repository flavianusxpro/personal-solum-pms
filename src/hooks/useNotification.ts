import {
  getEmailNotificationSettings,
  getSmsNotificationSettings,
  putEmailNotificationSettings,
  putSmsNotificationSettings,
} from '@/service/notification';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetEmailNotificationSettings(clinicId?: number) {
  return useQuery({
    queryKey: ['getEmailNotificationSettings'],
    queryFn: () => getEmailNotificationSettings(clinicId),
    enabled: !!clinicId,
  });
}

export function useGetSmsNotificationSettings(clinicId?: number) {
  return useQuery({
    queryKey: ['getSmsNotificationSettings'],
    queryFn: () => getSmsNotificationSettings(clinicId),
    enabled: !!clinicId,
  });
}

export function useUpdateEmailNotificationSettings() {
  return useMutation({
    mutationFn: putEmailNotificationSettings,
  });
}

export function useUpdateSmsNotificationSettings() {
  return useMutation({
    mutationFn: putSmsNotificationSettings,
  });
}
