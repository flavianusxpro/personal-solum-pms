import { getAwsS3Config, updateAwsS3Config } from '@/service/aws';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetAwsS3Config(clinicId?: number) {
  return useQuery({
    queryKey: ['awsS3Config'],
    queryFn: () => getAwsS3Config(clinicId),
    enabled: !!clinicId,
  });
}

export function useUpdateAwsS3Config() {
  return useMutation({
    mutationFn: updateAwsS3Config,
  });
}
