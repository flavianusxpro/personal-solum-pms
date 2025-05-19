import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/ui/page-header';
import { metaObject } from '@/config/site.config';
import CreateEditInvoice from '@/app/shared/invoice/create-edit-form';

export const metadata = {
  ...metaObject('Edit Invoice'),
};

const pageHeader = {
  title: 'Edit Invoice',
  breadcrumb: [
    {
      href: routes.invoice.home,
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

interface InvoiceEditPageProps {
  params: { id: string };
}

export default function InvoiceEditPage({ params }: InvoiceEditPageProps) {
  const { id } = params;

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ImportButton title="Upload File" className="mt-4 @lg:mt-0" /> */}
      </PageHeader>

      <CreateEditInvoice id={id} />
    </>
  );
}
