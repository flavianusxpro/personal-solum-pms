import AppointmentDashboard from '@/app/shared/appointment/dashboard';
import { metaObject } from '@/config/site.config';
import { useSession } from 'next-auth/react';

export const metadata = {
  ...metaObject('Appointment'),
};

export default function AppointmentPage() {
  return <AppointmentDashboard />;
}
