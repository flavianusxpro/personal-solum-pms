import {
  getEmailNotificationSettings,
  getSmsNotificationSettings,
  putEmailNotificationSettings,
  putSmsNotificationSettings,
} from '@/service/notification';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetEmailNotificationSettings() {
  return useQuery({
    queryKey: ['getEmailNotificationSettings'],
    queryFn: () => getEmailNotificationSettings(),
  });
}

export function useGetSmsNotificationSettings() {
  return useQuery({
    queryKey: ['getSmsNotificationSettings'],
    queryFn: () => getSmsNotificationSettings(),
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
