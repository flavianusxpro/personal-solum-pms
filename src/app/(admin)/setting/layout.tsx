'use client';

import PageHeader from '@/app/shared/page-header';
import Navigation from '@/app/(admin)/setting/navigation';

const pageHeader = {
  title: 'Alice Ronnie',
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
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Navigation />
      {children}
    </>
  );
}
