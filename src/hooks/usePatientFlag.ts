import {
  deletePatientFlag,
  getPatientFlags,
  postCreatePatientFlag,
  putUpdatePatientFlag,
} from '@/service/patient-flag';

import { IParamsPatientFlags } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetPatientFlags(params: IParamsPatientFlags) {
  return useQuery({
    queryKey: ['patient-flags'],
    queryFn: () => getPatientFlags(params),
    enabled: !!params.patientId,
  });
}

export function useCreatePatientFLag() {
  return useMutation({
    mutationFn: postCreatePatientFlag,
  });
}

export function useUpdatePatientFLag() {
  return useMutation({
    mutationFn: putUpdatePatientFlag,
  });
}

export function useDeletePatientFLag() {
  return useMutation({
    mutationFn: deletePatientFlag,
  });
}
