import { postCreateDoctorUser, getRoles, getUsers } from '@/service/user';
import { IParamGetUsers } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function usePostCreateDoctorUser() {
  return useMutation({ mutationFn: postCreateDoctorUser });
}

export function useGetRoles() {
  return useQuery({
    queryKey: ['getRoles'],
    queryFn: async () => {
      return await getRoles({
        page: 1,
        perPage: 100,
      });
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useGetUsers(params: IParamGetUsers) {
  return useQuery({
    queryKey: ['getUsers'],
    queryFn: async () => {
      return await getUsers(params);
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
