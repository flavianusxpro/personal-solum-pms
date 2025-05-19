import {
  deleteItem,
  getItems,
  postCreateItem,
  putUpdateItem,
} from '@/service/items';
import { IParamsGetItems } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetItems(params: IParamsGetItems) {
  return useQuery({
    queryKey: ['getItems'],
    queryFn: () => getItems(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

export function usePostCreateItem() {
  return useMutation({
    mutationFn: postCreateItem,
  });
}

export function useUpdateItem() {
  return useMutation({
    mutationFn: putUpdateItem,
  });
}

export function useDeleteItem() {
  return useMutation({
    mutationFn: deleteItem,
  });
}
