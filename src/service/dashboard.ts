import { get } from '@/config/api';
import { IGetDashboardSummaryResponse } from '@/types/ApiResponse';

export default async function getDashboardSummary() {
  return await get<IGetDashboardSummaryResponse>(
    '/admin/summary/dashboard'
  ).then((res) => {
    return res.data;
  });
}
