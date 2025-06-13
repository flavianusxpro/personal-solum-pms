'use client';

import PageHeader from '@/app/shared/ui/page-header';
import Navigation from '@/app/(admin)/setting/(setup)/navigation';
import { useProfile } from '@/hooks/useProfile';
import { useSession } from 'next-auth/react';

const pageHeader = {
  breadcrumb: [
    {
      href: '/appointment',
      name: 'Home',
    },
    {
      name: 'Account Settings',
    },
  ],
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const { data: dataProfile } = useProfile(status === 'authenticated');
  return (
    <>
      <PageHeader
        title={`${dataProfile?.name}`}
        breadcrumb={pageHeader.breadcrumb}
      />
      <Navigation />
      {children}
    </>
  );
}
