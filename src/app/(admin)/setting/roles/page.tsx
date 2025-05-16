'use client';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import { PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import RolesTable from '@/app/shared/roles/table/table';
import CreateEditRoleModal from '@/app/shared/roles/modal/create-edit-modal';

const pageHeader = {
  title: 'Roles',
  breadcrumb: [
    {
      href: routes.setting.roles,
      name: 'Roles',
    },
    {
      name: 'List',
    },
  ],
};

export default function Page() {
  const { openModal } = useModal();
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            onClick={() => {
              openModal({
                view: <CreateEditRoleModal />,
                customSize: '600px',
              });
            }}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Role
            </Button>
          </Button>
        </div>
      </PageHeader>

      <RolesTable />
    </>
  );
}
