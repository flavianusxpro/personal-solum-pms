import { getInvoiceList, getItems, postCreateInvoice } from '@/service/invoice';
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

export function usePostCreateInvoice() {
  return useMutation({
    mutationFn: postCreateInvoice,
  });
}

export function useGetItems() {
  return useQuery({
    queryKey: ['getItems'],
    queryFn: getItems,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
