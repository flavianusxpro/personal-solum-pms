import {
  getAllClinicsForPatient,
  getClinicByIdForPatient,
  getDoctorByClinicForPatient,
} from '@/service';
import {
  IParamGetAllClinicForPatient,
  IParamGetDoctorByClinicForPatient,
} from '@/types/paramTypes';
import { useQuery } from '@tanstack/react-query';

export function useGetAllClinicsForPatient(
  params: IParamGetAllClinicForPatient
) {
  return useQuery({
    queryKey: ['all-clinics-patient'],
    queryFn: async () => getAllClinicsForPatient(params),
  });
}

export function useGetClinicByIdForPatient(id: string) {
  return useQuery({
    queryKey: ['clinic-by-id-for-patient' + id],
    queryFn: async () => getClinicByIdForPatient(id),
    enabled: !!id,
  });
}

export function useGetDoctorByClinicForPatient(
  params: IParamGetDoctorByClinicForPatient
) {
  return useQuery({
    queryKey: ['clinic-by-clinic-for-patient' + params.id],
    queryFn: async () => getDoctorByClinicForPatient(params),
    enabled: !!params.id,
  });
}
