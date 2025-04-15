'use client';

import AppointmentListTable from '@/app/shared/appointment/appointment-list/list';
import AppointmentListStats from '@/app/shared/appointment/appointment-list/stats';

export default function AppointmentList() {
  return (
    <div className="flex flex-col gap-10 @container">
      <AppointmentListStats />
      <AppointmentListTable />
    </div>
  );
}
