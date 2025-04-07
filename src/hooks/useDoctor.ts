import {
  getDoctorById,
  getDoctorList,
  postCreateDoctor,
} from '@/service/doctor';

import {
  IParamGetAllDoctor,
  IPayloadCreateEditDoctor,
} from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetAllDoctors(params: IParamGetAllDoctor) {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      return await getDoctorList(params);
    },
  });
}

export function useGetDoctorById(id: string) {
  return useQuery({
    queryKey: ['getDoctor' + id],
    queryFn: async () => {
      return await getDoctorById(id);
    },
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

// export function useUpdatePatient() {
//   return useMutation({
//     mutationFn: async (payload: IPayloadCreatePatient) => {
//       return await putCreatePatient(payload);
//     },
//   });
// }
