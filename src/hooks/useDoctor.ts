import {
  deleteSpecialist,
  getAnalyticReportBillingByDoctorId,
  getDoctorById,
  getDoctorList,
  getSpecialists,
  postAssignDoctorToClinic,
  postCreateDoctor,
  postCreateSpecialist,
  putUpdateDoctor,
  putSettingBillingDoctor,
  putSettingMeetingDoctor,
  putUpdateSpecialist,
  deleteDoctor,
} from '@/service/doctor';

import {
  IParamGetAllDoctor,
  IParamGetSpecialists,
  IPayloadCreateEditDoctor,
  IPayloadSettingBillingDoctor,
  IPayloadSettingMeetingDoctor,
} from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetAllDoctors(params: IParamGetAllDoctor) {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      return await getDoctorList(params);
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useGetDoctorById(id: string) {
  return useQuery({
    queryKey: ['getDoctor' + id],
    queryFn: async () => {
      return await getDoctorById(id);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
}

export function useCreateDoctor() {
  return useMutation({
    mutationFn: async (payload: IPayloadCreateEditDoctor) => {
      return await postCreateDoctor(payload);
    },
  });
}

export function useUpdateDoctor() {
  return useMutation({
    mutationFn: async (payload: IPayloadCreateEditDoctor) => {
      return await putUpdateDoctor(payload);
    },
  });
}

export function useDeleteDoctor() {
  return useMutation({
    mutationFn: deleteDoctor,
  });
}

export function useUpdateSettingMeetingDoctor() {
  return useMutation({
    mutationFn: async (payload: IPayloadSettingMeetingDoctor) => {
      return await putSettingMeetingDoctor(payload);
    },
  });
}

export function useUpdateSettingBillingDoctor() {
  return useMutation({
    mutationFn: async (payload: IPayloadSettingBillingDoctor) => {
      return await putSettingBillingDoctor(payload);
    },
  });
}

export function usePostAssignDoctorToClinic() {
  return useMutation({
    mutationFn: postAssignDoctorToClinic,
  });
}

export function useGetAnalyticReportBillingByDoctorId(id: string) {
  return useQuery({
    queryKey: ['getAnalyticReportBillingByDoctorId' + id],
    queryFn: async () => {
      return await getAnalyticReportBillingByDoctorId(id);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
}

export function useGetSpecialists(params: IParamGetSpecialists) {
  return useQuery({
    queryKey: ['getSpecialists'],
    queryFn: async () => {
      return await getSpecialists(params);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
}

export function usePostCreateSpecialist() {
  return useMutation({
    mutationFn: postCreateSpecialist,
  });
}

export function usePutUpdateSpecialist() {
  return useMutation({
    mutationFn: putUpdateSpecialist,
  });
}

export function useDeleteSpecialist() {
  return useMutation({
    mutationFn: deleteSpecialist,
  });
}
