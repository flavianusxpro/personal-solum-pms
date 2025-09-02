import { getRequestCallback } from '@/service/requestCallback';
import { IParamsGetRequestCallback } from '@/types/paramTypes';
import { useQuery } from '@tanstack/react-query';

export function useGetRequestCallback(params: IParamsGetRequestCallback) {
  return useQuery({
    queryKey: ['get-request-callback'],
    queryFn: () => getRequestCallback(params).then((res) => res.data),
  });
}
