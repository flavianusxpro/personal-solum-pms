import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import { PiPlusBold } from 'react-icons/pi';
import { orderData } from '@/data/order-data';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/app/shared/ui/export-button';
import UsersTable from '@/app/shared/user/users-table';

export const metadata = {
  ...metaObject('Users'),
};

const pageHeader = {
  title: 'Users',
  breadcrumb: [
    {
      href: routes.user.dashboard,
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
          <Link href={routes.user.create} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add User
            </Button>
          </Link>
        </div>
      </PageHeader>

      <UsersTable />
    </>
  );
}
