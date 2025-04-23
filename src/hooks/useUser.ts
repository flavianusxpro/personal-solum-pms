import {
  postCreateDoctorUser,
  getRoles,
  getUsers,
  postCreateUser,
  getUserById,
  getPermissions,
} from '@/service/user';
import { IParamGetUsers } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function usePostCreateDoctorUser() {
  return useMutation({ mutationFn: postCreateDoctorUser });
}

export function usePostCreateUser() {
  return useMutation({ mutationFn: postCreateUser });
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

export function useGetUserById(id: string) {
  return useQuery({
    queryKey: ['getUserById', id],
    queryFn: async () => {
      return await getUserById(id);
    },
  });
}

export function useGetPermissions() {
  return useQuery({
    queryKey: ['getPermissions'],
    queryFn: async () => {
      return await getPermissions({
        page: 1,
        perPage: 100,
      });
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
