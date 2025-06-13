import {
  deleteClinic,
  getAllClinics,
  getCalendarScheduleByClinicId,
  getClinicByIdForPatient,
  postCreateClinic,
  putUpdateClinic,
} from '@/service/clinic';
import {
  getDoctorByClinic,
  postGetDoctorAvailabilityByClinic,
} from '@/service/doctor';
import {
  IParamGetAllClinic,
  IParamGetDoctorByClinic,
  IParamsGetDoctorAvailability,
} from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetAllClinics(params: IParamGetAllClinic) {
  return useQuery({
    queryKey: ['all-clinics' + params],
    queryFn: async () => getAllClinics(params),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useGetClinicByIdForPatient(id: string) {
  return useQuery({
    queryKey: ['clinic-by-id-for-patient' + id],
    queryFn: async () => getClinicByIdForPatient(id),
    enabled: !!id,
  });
}

export function useGetDoctorByClinic(params: IParamGetDoctorByClinic) {
  return useQuery({
    queryKey: ['clinic-by-clinic-for-patient' + params.id],
    queryFn: async () => getDoctorByClinic(params),
    enabled: !!params.id,
  });
}

export function usePostCreateClinic() {
  return useMutation({
    mutationFn: postCreateClinic,
  });
}

export function usePutUpdateClinic() {
  return useMutation({
    mutationFn: putUpdateClinic,
  });
}

export function useDeleteClinic() {
  return useMutation({
    mutationFn: deleteClinic,
  });
}

export function useGetDoctorAvailabilityByClinic(
  payload: IParamsGetDoctorAvailability
) {
  return useQuery({
    queryKey: ['doctor-availability-by-clinic' + payload.doctorId],
    queryFn: async () => postGetDoctorAvailabilityByClinic(payload),
  });
}

export function useGetCalendarScheduleByClinicId(clinicId: number) {
  return useQuery({
    queryKey: ['calendar-schedule-by-clinic' + clinicId],
    queryFn: async () => getCalendarScheduleByClinicId(clinicId),
    enabled: !!clinicId,
  });
}
