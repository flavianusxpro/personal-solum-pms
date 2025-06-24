import {
  getApiKeyConnection,
  postClinicConnection,
} from '@/service/connection';
import { IParamsGetApiConnection } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useRequesClinicConnection() {
  return useMutation({
    mutationFn: postClinicConnection,
  });
}

export function useGetApiConnection(params: IParamsGetApiConnection) {
  return useQuery({
    queryKey: ['api-connection'],
    queryFn: () => getApiKeyConnection(params),
  });
}
