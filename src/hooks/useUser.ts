import {
  postCreateDoctorUser,
  getUsers,
  postCreateUser,
  getUserById,
  deleteUserById,
  putUpdateUserById,
} from '@/service/user';
import { IParamGetUsers } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function usePostCreateDoctorUser() {
  return useMutation({ mutationFn: postCreateDoctorUser });
}

export function usePostCreateUser() {
  return useMutation({ mutationFn: postCreateUser });
}

export function useGetUsers(params: IParamGetUsers) {
  return useQuery({
    queryKey: ['getUsers' + params],
    queryFn: async () => {
      return await getUsers(params);
    },
    refetchOnWindowFocus: true,
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

export function useUpdateUser() {
  return useMutation({
    mutationFn: putUpdateUserById,
  });
}

export function useDeleteUserById() {
  return useMutation({
    mutationFn: deleteUserById,
  });
}
