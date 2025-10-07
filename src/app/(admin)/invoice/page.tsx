import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import { PiPlusBold } from 'react-icons/pi';
import { invoiceData } from '@/data/invoice-data';
import ExportButton from '@/app/shared/ui/export-button';
import { metaObject } from '@/config/site.config';
import InvoiceTableList from '@/app/shared/invoice/invoice-list/table';
import InvoiceListStats from '@/app/shared/invoice/invoice-list/stats';

export const metadata = {
  ...metaObject('Invoices'),
};

const pageHeader = {
  title: 'Invoices',
  breadcrumb: [
    {
      href: routes.invoice.home,
      name: 'Invoices',
    },
    {
      name: 'List',
    },
  ],
};

export default function InvoiceListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={invoiceData}
            fileName="invoice_data"
            header="ID,Name,Username,Avatar,Email,Due Date,Amount,Status,Created At"
          />
          <Link href={routes.invoice.create} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Invoice
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="flex flex-col gap-10 @container">
        <InvoiceListStats />
        <InvoiceTableList />
      </div>
    </>
  );
}
