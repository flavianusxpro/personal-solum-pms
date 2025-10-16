'use client';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import SocialMediaCommunication from '@/app/shared/social-media-communication';

const pageHeader = {
  title: 'Social Media',
  breadcrumb: [
    {
      href: routes.setting.communication,
      name: 'Communications',
    },
    {
      name: 'Social Media',
    },
  ],
};

export default function SocialMediaCommunicationPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <SocialMediaCommunication />
    </>
  );
}
