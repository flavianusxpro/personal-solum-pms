'use client';

import { useIsMounted } from '@core/hooks/use-is-mounted';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import { useSession } from 'next-auth/react';
import { ROLES } from '@/config/constants';
import AccessDenied from '../access-denied';
import { useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

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

  return <HydrogenLayout>{children}</HydrogenLayout>;
}
