import {
  deleteRole,
  getPermissions,
  postCreateRole,
  putUpdateRole,
} from '@/service/role';
import { getRoles } from '@/service/user';
import { IParamGetRoles } from '@/types/paramTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetRoles(params: IParamGetRoles) {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles(params),
  });
}

export function usePostCreateRole() {
  return useMutation({
    mutationFn: postCreateRole,
  });
}

export function usePutUpdateRole() {
  return useMutation({
    mutationFn: putUpdateRole,
  });
}

export function useDeleteRole() {
  return useMutation({
    mutationFn: deleteRole,
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
