import {
  deleteInvoice,
  getInvoiceById,
  getInvoiceList,
  postCreateInvoice,
  putCreateInvoice,
} from '@/service/invoice';
import { IParamGetAppointments } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

export function useGetInvoices(params: IParamGetAppointments) {
  const paramsValue = {
    page: params.page,
    perPage: params.perPage,
    from: dayjs(params.from).format('YYYY-MM-DD'),
    to: dayjs(params.to).format('YYYY-MM-DD'),
    status: params.status,
  };
  return useQuery({
    queryKey: ['getInvoices' + params],
    queryFn: async () => getInvoiceList(params),
  });
}

export function useGetInvoiceById(id?: string) {
  return useQuery({
    queryKey: ['getInvoiceById' + id],
    queryFn: async () => getInvoiceById(id as string),
    enabled: !!id,
  });
}

export function usePostCreateInvoice() {
  return useMutation({
    mutationFn: postCreateInvoice,
  });
}

export function usePutUpdateInvoice() {
  return useMutation({
    mutationFn: putCreateInvoice,
  });
}

export function useDeleteInvoice() {
  return useMutation({
    mutationFn: deleteInvoice,
  });
}
