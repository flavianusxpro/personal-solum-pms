'use client';

import AppointmentListTable from '@/app/shared/appointment/appointment-list/list';
import AppointmentListStats from '@/app/shared/appointment/appointment-list/stats';
import { useState } from 'react';

export default function AppointmentList() {
  const [range, setRange] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-10 @container">
      <AppointmentListStats
        range={range}
        setRange={setRange}
      />
      <AppointmentListTable
        range={range}
      />
    </div>
  );
}
