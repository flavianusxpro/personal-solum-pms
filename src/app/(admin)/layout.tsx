'use client';

import { useIsMounted } from '@core/hooks/use-is-mounted';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import { useSession } from 'next-auth/react';
import { ROLES } from '@/config/constants';
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

  if (![ROLES.Admin, ROLES.Doctor].includes(data?.role?.name ?? ''))
    <AccessDenied />;

  return <HydrogenLayout>{children}</HydrogenLayout>;
}
