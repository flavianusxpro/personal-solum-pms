import { metaObject } from '@/config/site.config';
import AppointmentListPageHeader from './page-header';
import AppointmentListStats from '@/app/shared/appointment/appointment-list/stats';
import AppointmentListTable from '@/app/shared/appointment/appointment-list/list';
import { useSession } from 'next-auth/react';
import AppointmentList from './AppointmentList';

export const metadata = {
  ...metaObject('Appointment List'),
};

export default function AppointmentListPage() {
  return (
    <>
      <AppointmentListPageHeader />
      <div className="flex flex-col gap-10 @container">
        <AppointmentListStats />
        <AppointmentList />
      </div>
    </>
  );
}
