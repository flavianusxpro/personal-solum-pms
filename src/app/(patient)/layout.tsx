'use client';

import { ROLES } from '@/config/constants';
import PatientLayout from '@/layouts/patient/patient-layout';
import { useIsMounted } from '@core/hooks/use-is-mounted';
import { useSession } from 'next-auth/react';
import AccessDenied from '../access-denied';

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const isMounted = useIsMounted();
  const { data } = useSession();

  if (!isMounted) {
    return null;
  }

  if (![ROLES.Admin, ROLES.Patient].includes(data?.role?.name ?? ''))
    <AccessDenied />;

  return <PatientLayout>{children}</PatientLayout>;
}
