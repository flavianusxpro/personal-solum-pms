import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/ui/page-header';
import CreateEditInvoice from '@/app/shared/invoice/create-edit-form';
import { metaObject } from '@/config/site.config';
import CreateEditEmailBroadcast from '@/app/shared/email-broadcast/create-edit-doctor';

export const metadata = {
  ...metaObject('Create Email Broadcast'),
};

const pageHeader = {
  title: 'Create Email Broadcast',
  breadcrumb: [
    {
      href: routes.invoice.home,
      name: 'Email Broadcast',
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

      <CreateEditEmailBroadcast />
    </>
  );
}
