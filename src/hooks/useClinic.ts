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
    queryKey: ['clinic-by-clinic-for-patient' + JSON.stringify(params)],
    queryFn: async () => getDoctorByClinic(params),
    enabled: !!params.id && !!params.date,
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
