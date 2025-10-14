'use client';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import EmailCommunications from '@/app/shared/email-communication';

const pageHeader = {
  title: 'Email',
  breadcrumb: [
    {
      href: routes.setting.communication,
      name: 'Communications',
    },
    {
      name: 'Email',
    },
  ],
};

export default function EmailCommunicationPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <EmailCommunications />
    </>
  );
}
