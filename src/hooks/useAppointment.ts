import {
  deleteAppointment,
  getAppointmentList,
  getSummaryAppointments,
  postCreateAppointment,
  putUpdateAppointment,
} from '@/service/appointment';
import { IParamGetAppointments } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetAppointments(params: IParamGetAppointments) {
  return useQuery({
    queryKey: ['getAppointments' + params],
    queryFn: async () => getAppointmentList(params),
  });
}

export function useGetSummaryAppointments() {
  return useQuery({
    queryKey: ['getSummaryAppointments'],
    queryFn: async () => getSummaryAppointments(),
  });
}

export function usePostCreateAppointment() {
  return useMutation({
    mutationFn: postCreateAppointment,
  });
}

export function useUpdateAppointment() {
  return useMutation({
    mutationFn: putUpdateAppointment,
  });
}

export function useDeleteAppointment() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteAppointment(id);
    },
  });
}
