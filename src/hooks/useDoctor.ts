import {
  getAnalyticReportBillingByDoctorId,
  getDoctorById,
  getDoctorList,
  getSpecialists,
  postAssignDoctorToClinic,
  postCreateDoctor,
  putCreateDoctor,
  putSettingBillingDoctor,
  putSettingMeetingDoctor,
} from '@/service/doctor';

import {
  IParamGetAllDoctor,
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
      return await putCreateDoctor(payload);
    },
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

export function useGetSpecialists() {
  return useQuery({
    queryKey: ['getSpecialists'],
    queryFn: async () => {
      return await getSpecialists({ page: 1, perPage: 100 });
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
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
