'use client';

import PatientLayout from '@/layouts/patient/patient-layout';
import { useIsMounted } from '@core/hooks/use-is-mounted';

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }
  return <PatientLayout>{children}</PatientLayout>;
}
