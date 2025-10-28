import {
  deleteInvoice,
  getInvoiceById,
  getInvoiceList,
  patchStatus,
  postCreateInvoice,
  postRefundInvoice,
  postResendInvoice,
  putCreateInvoice,
} from '@/service/invoice';
import { IParamGetAppointments } from '@/types/paramTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetInvoices(params: IParamGetAppointments) {
  return useQuery({
    queryKey: ['getInvoices', params],
    queryFn: async () => getInvoiceList(params),
    enabled: Boolean(params.clinicId),
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

export function useResendInvoice() {
  return useMutation({
    mutationFn: postResendInvoice,
  });
}

export function useRefundInvoice() {
  return useMutation({
    mutationFn: postRefundInvoice,
  });
}

export function useUpdatePaymentStatusInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getInvoices'] });
    },
  });
}
