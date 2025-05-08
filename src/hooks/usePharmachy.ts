import {
  deletePharmachy,
  getPharmachyList,
  postCreatePharmachy,
  putUpdatePharmachy,
} from '@/service/pharmachy';
import { IParamsGetPharmachies } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetPharmachyList(params: IParamsGetPharmachies) {
  return useQuery({
    queryKey: ['pharmachy'],
    queryFn: () => getPharmachyList(params),
  });
}

export function usePostCreatePharmachy() {
  return useMutation({
    mutationFn: postCreatePharmachy,
  });
}

export function usePutUpdatePharmachy() {
  return useMutation({
    mutationFn: putUpdatePharmachy,
  });
}

export function useDeletePharmachy() {
  return useMutation({
    mutationFn: deletePharmachy,
  });
}
