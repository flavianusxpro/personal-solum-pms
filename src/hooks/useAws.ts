import { getAwsS3Config, updateAwsS3Config } from '@/service/aws';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetAwsS3Config() {
  return useQuery({
    queryKey: ['awsS3Config'],
    queryFn: getAwsS3Config,
  });
}

export function useUpdateAwsS3Config() {
  return useMutation({
    mutationFn: updateAwsS3Config,
  });
}
