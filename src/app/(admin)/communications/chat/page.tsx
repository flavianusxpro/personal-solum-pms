'use client';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import SmsCommunication from '@/app/shared/sms-communication';

const pageHeader = {
  title: 'Chat',
  breadcrumb: [
    {
      href: routes.setting.communication,
      name: 'Communications',
    },
    {
      name: 'Chat',
    },
  ],
};

export default function SmsCommunicationPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <SmsCommunication />
    </>
  );
}
