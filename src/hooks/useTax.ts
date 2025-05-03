import {
  deleteTax,
  getTaxes,
  postCreateTax,
  putUpdateTax,
} from '@/service/tax';
import { IParamGetTaxes } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetTaxes(params: IParamGetTaxes) {
  return useQuery({
    queryKey: ['taxes'],
    queryFn: async () => getTaxes(params),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function usePostCreateTax() {
  return useMutation({
    mutationFn: postCreateTax,
  });
}

export function usePutUpdateTax() {
  return useMutation({
    mutationFn: putUpdateTax,
  });
}

export function useDeleteTax() {
  return useMutation({
    mutationFn: deleteTax,
  });
}
