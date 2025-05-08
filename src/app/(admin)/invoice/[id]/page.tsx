import InvoiceDetails from '@/app/shared/invoice/invoice-details';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Invoice'),
};

interface InvoiceDetailsPageProps {
  params: { id: string };
}

export default function InvoiceDetailsPage({
  params,
}: InvoiceDetailsPageProps) {
  const { id } = params;
  return <InvoiceDetails id={id} />;
}
