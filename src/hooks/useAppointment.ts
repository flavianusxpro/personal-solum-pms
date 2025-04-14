import {
  getAppointmentList,
  getSummaryAppointments,
} from '@/service/appointment';
import { IParamGetAppointments } from '@/types/paramTypes';
import { useQuery } from '@tanstack/react-query';

export function useGetAppointments(params: IParamGetAppointments) {
  return useQuery({
    queryKey: ['getAppointments' + params.doctorId || params.patientId],
    queryFn: async () => getAppointmentList(params),
  });
}

export function useGetSummaryAppointments() {
  return useQuery({
    queryKey: ['getSummaryAppointments'],
    queryFn: async () => getSummaryAppointments(),
  });
}
