import {
  getlistSchedule,
  postCreateSchedule,
  putUpdateSchedule,
} from '@/service/schedule';
import {
  IParamGetListSchedule,
  IPayloadPostCreateSchedule,
} from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetListSchedule(params: IParamGetListSchedule) {
  return useQuery({
    queryKey: ['getListSchedule', params],
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
    mutationFn: (payload: IPayloadPostCreateSchedule) =>
      putUpdateSchedule(payload),
  });
}
