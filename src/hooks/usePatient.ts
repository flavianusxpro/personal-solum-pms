import {
  getPatientById,
  getPatientList,
  postCreatePatient,
} from '@/service/patient';
import { IParamGetAllPatient, IPayloadCreatePatient } from '@/types/paramTypes';
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
  });
}

export function useCreatePatient() {
  return useMutation({
    mutationFn: async (payload: IPayloadCreatePatient) => {
      return await postCreatePatient(payload);
    },
  });
}
