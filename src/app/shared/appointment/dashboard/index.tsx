'use client';

import AppointmentStats from '@/app/shared/appointment/dashboard/appointment-stats';
import ScheduleList from '@/app/shared/appointment/dashboard/schedule-list';
import AppointmentTodo from '@/app/shared/appointment/dashboard/appointment-todo';

export default function AppointmentDashboard() {
  return (
    <div className="grid grid-cols-12 gap-6 @container @[59rem]:gap-7">
      <AppointmentStats className="col-span-full" />
      <ScheduleList className="col-span-7 @[59rem]:col-span-7 @[90rem]:col-span-7" />
      <AppointmentTodo className="col-span-5 @[59rem]:col-span-5 @[90rem]:col-span-5" />
    </div>
  );
}
