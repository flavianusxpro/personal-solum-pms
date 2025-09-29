import { getType, postType, putType, deleteType } from '@/service/type';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetTypes(params: {
  page: number;
  perPage: number;
  sort?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ['types'],
    queryFn: () => getType(params),
  });
}

export function useCreateType() {
  return useMutation({
    mutationFn: postType,
  });
}

export function useUpdateType() {
  return useMutation({
    mutationFn: putType,
  });
}

export function useDeleteType() {
  // return useMutation({
  //   mutationFn: deleteType,
  // });
  return useMutation({
    mutationFn: (id: string) => deleteType(id),
  });
}
