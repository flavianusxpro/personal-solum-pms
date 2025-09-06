import { getRequestCallback, updateRequestCallback } from '@/service/requestCallback';
import { IParamsGetRequestCallback } from '@/types/paramTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetRequestCallback(params: IParamsGetRequestCallback) {
  return useQuery({
    queryKey: ['get-request-callback'],
    queryFn: () => getRequestCallback(params).then((res) => res.data),
  });
}

export function useUpdateRequestCallback() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateRequestCallback(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-request-callback'] });
    },
  });
}
