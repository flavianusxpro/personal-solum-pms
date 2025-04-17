import { getInvoiceList } from '@/service/invoice';
import { IParamGetAppointments } from '@/types/paramTypes';
import { useQuery } from '@tanstack/react-query';
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
