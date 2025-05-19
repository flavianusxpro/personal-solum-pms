'use client';

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import { PiPlusBold } from 'react-icons/pi';
import { orderData } from '@/data/order-data';
import ExportButton from '@/app/shared/ui/export-button';
import UsersTable from '@/app/shared/user/users-table';
import ModalButton from '@/app/shared/ui/modal-button/modal-button';
import CreateUserModal from '@/app/shared/user/modal/create-modal';

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
          {/* <ExportButton
            data={orderData}
            fileName="order_data"
            header="Patient ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          /> */}
          <ModalButton view={<CreateUserModal />}>Create User</ModalButton>
        </div>
      </PageHeader>

      <UsersTable />
    </>
  );
}
