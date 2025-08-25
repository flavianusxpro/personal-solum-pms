import {
  deleteAppointment,
  getAppointmentList,
  getSummaryAppointments,
  postCancelAppointment,
  postCreateAppointment,
  postRescheduleAppointmentByDate,
  putUpdateAppointment,
} from '@/service/appointment';
import { IParamGetAppointments } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetAppointments(params: IParamGetAppointments) {
  return useQuery({
    queryKey: ['getAppointments' + params + params.patientId],
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
    mutationFn: deleteAppointment,
  });
}

export function usePostCancelAppointment() {
  return useMutation({
    mutationFn: postCancelAppointment,
  });
}

export function usePostRescheduleAppointmentByDate() {
  return useMutation({
    mutationFn: postRescheduleAppointmentByDate,
  });
}
