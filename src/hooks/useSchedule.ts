import {
  deleteSchedule,
  getlistSchedule,
  getScheduleFromMainClinicByDoctorId,
  postCreateSchedule,
  putUpdateSchedule,
} from '@/service/schedule';
import {
  IParamGetDoctorScheduleForMainClinic,
  IParamGetListSchedule,
  IPayloadPostCreateSchedule,
  IPayloadPutUpdateSchedule,
} from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetListSchedule(params: IParamGetListSchedule) {
  return useQuery({
    queryKey: ['getListSchedule' + params],
    queryFn: () => getlistSchedule(params),
  });
}

export function usePostCreateSchedule() {
  return useMutation({
    mutationKey: ['postCreateSchedule'],
    mutationFn: (payload: IPayloadPostCreateSchedule) =>
      postCreateSchedule(payload),
  });
}

export function usePutUpdateSchedule() {
  return useMutation({
    mutationKey: ['putUpdateSchedule'],
    mutationFn: (payload: IPayloadPutUpdateSchedule) =>
      putUpdateSchedule(payload),
  });
}

export function useDeleteSchedule() {
  return useMutation({
    mutationFn: deleteSchedule,
  });
}

export function useGetDoctorScheduleByIdFromMainClinic(
  params: IParamGetDoctorScheduleForMainClinic
) {
  return useQuery({
    queryKey: ['getDoctorScheduleByIdFromMainClinic', params],
    queryFn: () => {
      return getScheduleFromMainClinicByDoctorId(params);
    },
    enabled: !!params.doctorId,
  });
}
