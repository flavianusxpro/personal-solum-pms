import { get } from '@/config/base-api';
import {
  IGetDashboardAdminSummaryResponse,
  IGetDashboardSummaryResponse,
} from '@/types/ApiResponse';

export default async function getDashboardSummary() {
  return await get<IGetDashboardSummaryResponse>(
    '/admin/summary/dashboard'
  ).then((res) => {
    return res.data;
  });
}

export async function getDashboardAdminSummary(params: { timezone: string }) {
  return await get<IGetDashboardAdminSummaryResponse>(
    '/admin/summary/appointment',
    {
      headers: {
        "timezone-client": params.timezone,
      },
    }
  ).then((res) => {
    return res.data;
  });
}
