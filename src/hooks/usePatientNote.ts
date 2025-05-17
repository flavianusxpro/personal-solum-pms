import {
  deletePatientNote,
  getPatientNotes,
  postCreatePatientNote,
  putUpdatePatientNote,
} from '@/service/patient-notes';
import { IParamsPatientNotes } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetPatientNotes(params: IParamsPatientNotes) {
  return useQuery({
    queryKey: ['patient-notes'],
    queryFn: () => getPatientNotes(params),
  });
}

export function useCreatePatientNote() {
  return useMutation({
    mutationFn: postCreatePatientNote,
  });
}

export function useUpdatePatientNote() {
  return useMutation({
    mutationFn: putUpdatePatientNote,
  });
}

export function useDeletePatientNote() {
  return useMutation({
    mutationFn: deletePatientNote,
  });
}
