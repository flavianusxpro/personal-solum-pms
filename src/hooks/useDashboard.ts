import getDashboardSummary from '@/service/dashboard';
import { useQuery } from '@tanstack/react-query';

export function useGetDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: getDashboardSummary,
  });
}
