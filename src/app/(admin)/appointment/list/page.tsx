import { metaObject } from '@/config/site.config';
import AppointmentListPageHeader from './page-header';
import AppointmentList from './appoinment-list';

export const metadata = {
  ...metaObject('Appointment List'),
};

export default function AppointmentListPage() {
  return (
    <>
      <AppointmentListPageHeader />
      <AppointmentList />
    </>
  );
}
