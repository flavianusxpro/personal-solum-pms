import {
  getPatientById,
  getPatientList,
  getPatientProblem,
  getPatientTypes,
  postCreatePatient,
  putUpdatePatient,
  putUpdateAssignDoctor,
  deletePatient,
  createPatientProblem,
  updatePatientProblem,
  deletePatientProblem,
  postUploadPatientDocumentation,
  putUpdatePatientDocumentation,
  deletePatientDocumentation,
  getPatientDocumentation,
} from '@/service/patient';
import {
  IParamGetAllPatient,
  IParamGetPatientProblem,
  IParamGetPatientTypes,
  IParamsGetPatientDocumentation,
  IPayloadCreateEditPatient,
  IPayloadUpdateAssignDoctor,
} from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetAllPatients(params: IParamGetAllPatient) {
  return useQuery({
    queryKey: ['patients' + params],
    queryFn: async () => getPatientList(params),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
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
      return await putUpdatePatient(payload);
    },
  });
}

export function useDeletePatient() {
  return useMutation({
    mutationFn: deletePatient,
  });
}

export function useGetPatientTypes(params: IParamGetPatientTypes) {
  return useQuery({
    queryKey: ['patientTypes'],
    queryFn: async () => {
      return await getPatientTypes(params);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useGetPatientProblem(params: IParamGetPatientProblem) {
  return useQuery({
    queryKey: ['patientProblem'],
    queryFn: async () => {
      return await getPatientProblem(params);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useCreatePatientProblem() {
  return useMutation({
    mutationFn: createPatientProblem,
  });
}

export function useUpdatePatientProblem() {
  return useMutation({
    mutationFn: updatePatientProblem,
  });
}

export function useDeletePatientProblem() {
  return useMutation({
    mutationFn: deletePatientProblem,
  });
}

export function useUpdateAssignDoctor() {
  return useMutation({
    mutationFn: async (payload: IPayloadUpdateAssignDoctor) => {
      return await putUpdateAssignDoctor(payload);
    },
  });
}

export function useGetPatientDocumentation(
  params: IParamsGetPatientDocumentation
) {
  return useQuery({
    queryKey: ['patientDocumentation', params],
    queryFn: async () => {
      return await getPatientDocumentation(params);
    },
  });
}

export function useUploadPatientDocumentation() {
  return useMutation({
    mutationFn: postUploadPatientDocumentation,
  });
}

export function useUpdatePatientDocumentation() {
  return useMutation({
    mutationFn: putUpdatePatientDocumentation,
  });
}

export function useDeletePatientDocumentation() {
  return useMutation({
    mutationFn: deletePatientDocumentation,
  });
}
