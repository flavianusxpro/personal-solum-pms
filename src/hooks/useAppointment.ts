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
import { useQueryClient } from '@tanstack/react-query';

export function useGetAppointments(
  params: IParamGetAppointments,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['getAppointments', params.patientId, params],
    queryFn: async () => getAppointmentList(params),
    enabled: enabled,
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putUpdateAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAppointments'] });
    },
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRescheduleAppointmentByDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAppointments'] });
    },
  });
}
