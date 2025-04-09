import { getInvoiceList } from '@/service/invoice';
import { IParamGetAppointments } from '@/types/paramTypes';
import { useQuery } from '@tanstack/react-query';

export function useGetInvoices(params: IParamGetAppointments) {
  return useQuery({
    queryKey: ['getInvoices' + params.doctorId || params.patientId],
    queryFn: async () => getInvoiceList(params),
  });
}
