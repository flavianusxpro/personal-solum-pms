import { getProfile } from '@/service/profile';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: async () => getProfile(),
  });
