import {
  deleteClinic,
  getAllClinics,
  getCalendarScheduleByClinicId,
  getClinicById,
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
    queryKey: [
      'clinic-by-clinic-for-patient',
      params.id,
      params.treatment_type,
      params.problem_type,
    ],
    queryFn: async () => getDoctorByClinic(params),
    enabled: !!params.id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0, // Data selalu dianggap stale, force refetch
    gcTime: 5 * 60 * 1000, // Cache hanya 5 menit
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
    queryKey: [
      'doctor-availability-by-clinic',
      payload.clinicId,
      payload.doctorId,
      payload.appointment_date,
      payload.appointment_type,
    ],
    queryFn: async () => postGetDoctorAvailabilityByClinic(payload),
    enabled:
      !!payload.clinicId && !!payload.doctorId && !!payload.appointment_date,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0, // Data selalu dianggap stale, force refetch
    gcTime: 5 * 60 * 1000, // Cache hanya 5 menit
  });
}

export function useGetCalendarScheduleByClinicId(clinicId: number) {
  return useQuery({
    queryKey: ['calendar-schedule-by-clinic' + clinicId],
    queryFn: async () => getCalendarScheduleByClinicId(clinicId),
    enabled: !!clinicId,
  });
}

export function useGetClinicById(clinicId?: number) {
  return useQuery({
    queryKey: ['clinic-by-id', clinicId],
    queryFn: async () => getClinicById(clinicId),
    enabled: !!clinicId,
  });
}
