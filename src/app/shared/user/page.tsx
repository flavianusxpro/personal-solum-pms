import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import OrdersTable from '@/app/shared/ecommerce/order/order-list/table';
import { PiPlusBold } from 'react-icons/pi';
import { orderData } from '@/data/order-data';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/app/shared/export-button';

export const metadata = {
  ...metaObject('Users'),
};

const pageHeader = {
  title: 'User',
  breadcrumb: [
    {
      href: routes.eCommerce.orders,
      name: 'Users',
    },
    {
      name: 'List',
    },
  ],
};

export default function UsersPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={orderData}
            fileName="order_data"
            header="Patient ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          />
          <Link
            href={routes.eCommerce.createProduct}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add User
            </Button>
          </Link>
        </div>
      </PageHeader>

      <OrdersTable data={orderData} />
    </>
  );
}
