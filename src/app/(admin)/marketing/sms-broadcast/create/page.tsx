import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/ui/page-header';
import { metaObject } from '@/config/site.config';
import CreateEditSmsBroadcast from '@/app/shared/sms-broadcast/create-edit';

export const metadata = {
  ...metaObject('Create Sms Broadcast'),
};

const pageHeader = {
  title: 'Create Sms Broadcast',
  breadcrumb: [
    {
      href: routes.invoice.home,
      name: 'Sms Broadcast',
    },
    {
      name: 'Create',
    },
  ],
};

export default function EmailBroadcastCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title="Upload File" className="mt-4 @lg:mt-0" /> */}
      </PageHeader>

      <CreateEditSmsBroadcast />
    </>
  );
}
