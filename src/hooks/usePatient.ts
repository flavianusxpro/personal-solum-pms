import {
  getPatientById,
  getPatientList,
  getPatientProblem,
  getPatientTypes,
  postCreatePatient,
  putCreatePatient,
} from '@/service/patient';
import {
  IParamGetAllPatient,
  IParamGetPatientProblem,
  IParamGetPatientTypes,
  IPayloadCreateEditPatient,
} from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetAllPatients(params: IParamGetAllPatient) {
  return useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      return await getPatientList(params);
    },
  });
}

export function useGetPatientById(id: string) {
  return useQuery({
    queryKey: ['getPatient' + id],
    queryFn: async () => {
      return await getPatientById(id);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

export function useCreatePatient() {
  return useMutation({
    mutationFn: async (payload: IPayloadCreateEditPatient) => {
      return await postCreatePatient(payload);
    },
  });
}

export function useUpdatePatient() {
  return useMutation({
    mutationFn: async (payload: IPayloadCreateEditPatient) => {
      return await putCreatePatient(payload);
    },
  });
}

export function useGetPatientTypes(params: IParamGetPatientTypes) {
  return useQuery({
    queryKey: ['patientTypes'],
    queryFn: async () => {
      return await getPatientTypes(params);
    },
  });
}

export function useGetPatientProblem(params: IParamGetPatientProblem) {
  return useQuery({
    queryKey: ['patientProblem'],
    queryFn: async () => {
      return await getPatientProblem(params);
    },
  });
}
