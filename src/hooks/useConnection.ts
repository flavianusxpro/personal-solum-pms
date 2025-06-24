import {
  deleteApiKeyConnection,
  getApiKeyConnection,
  postClinicConnection,
  postCreateApiKeyConnection,
  putUpdateApiKeyConnection,
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

export function useCreateApiConnection() {
  return useMutation({
    mutationFn: postCreateApiKeyConnection,
  });
}

export function useUpdateApiConnection() {
  return useMutation({
    mutationFn: putUpdateApiKeyConnection,
  });
}

export function useDeleteApiConnection() {
  return useMutation({
    mutationFn: deleteApiKeyConnection,
  });
}
