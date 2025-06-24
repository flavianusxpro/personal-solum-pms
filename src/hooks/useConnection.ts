import {
  getApiKeyConnection,
  postClinicConnection,
} from '@/service/connection';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useRequesClinicConnection() {
  return useMutation({
    mutationFn: postClinicConnection,
  });
}

export function useGetApiConnection() {
  return useQuery({
    queryKey: ['api-connection'],
    queryFn: getApiKeyConnection,
  });
}
