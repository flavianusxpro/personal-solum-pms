import getDashboardSummary, {
  getDashboardAdminSummary,
} from '@/service/dashboard';
import { useQuery } from '@tanstack/react-query';

export function useGetDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: getDashboardSummary,
  });
}

export function useGetDashboardAdminSummary(params: { timezone: string }) {
  return useQuery({
    queryKey: ['dashboard-admin-summary'],
    queryFn: () => getDashboardAdminSummary(params),
  });
}
