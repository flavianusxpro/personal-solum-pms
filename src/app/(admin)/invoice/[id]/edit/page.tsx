import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/ui/page-header';
import ImportButton from '@/app/shared/ui/import-button';
import CreateInvoice from '@/app/shared/invoice/create-invoice';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Edit Invoice'),
};

const pageHeader = {
  title: 'Edit Invoice',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Invoice',
    },
    {
      name: 'Edit',
    },
  ],
};

export default function InvoiceEditPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title="Upload File" className="mt-4 @lg:mt-0" />
      </PageHeader>

      <CreateInvoice />
    </>
  );
}
