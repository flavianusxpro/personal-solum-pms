import { postCreateDoctorUser, getRoles } from '@/service/user';
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
