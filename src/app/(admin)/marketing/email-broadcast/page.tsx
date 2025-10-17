import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import { PiPlusBold } from 'react-icons/pi';
import { metaObject } from '@/config/site.config';
import EmailBroadcastTable from '@/app/shared/email-broadcast/table/table';

export const metadata = {
  ...metaObject('Email Broadcast'),
};

const pageHeader = {
  title: 'Email Broadcast',
  breadcrumb: [
    {
      href: routes.invoice.home,
      name: 'Email Broadcast',
    },
    {
      name: 'List',
    },
  ],
};

export default function EmailBroadcastPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.marketing.createEmailBroadcast}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add New
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="flex flex-col gap-10 @container">
        <EmailBroadcastTable />
      </div>
    </>
  );
}
