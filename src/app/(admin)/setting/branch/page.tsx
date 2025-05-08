'use client';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import { PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CreateEditModal from '@/app/shared/branch/modal/create-edit-modal';
import BranchTable from '@/app/shared/branch/table/table';

const pageHeader = {
  title: 'Branch',
  breadcrumb: [
    {
      href: routes.setting.branch,
      name: 'Branch',
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
                view: <CreateEditModal />,
                size: 'xl',
              });
            }}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Branch
            </Button>
          </Button>
        </div>
      </PageHeader>

      <BranchTable />
    </>
  );
}
