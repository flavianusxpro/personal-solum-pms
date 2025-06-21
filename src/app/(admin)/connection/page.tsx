'use client';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import ExportButton from '@/app/shared/ui/export-button';
import { doctorData } from '@/data/doctor-data';
import { PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CreateDoctorModal from '@/app/shared/doctor/modal/create-doctor';
import DoctorTable from '@/app/shared/doctor/tableDataDoctor/table';
import CreateEditConnectionModal from '@/app/shared/connection/modal.tsx/CreateEdit';

const pageHeader = {
  title: 'Connection',
  breadcrumb: [
    {
      href: routes.connection,
      name: 'Connection',
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
                view: <CreateEditConnectionModal />,
                customSize: '600px',
              });
            }}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create Connection
            </Button>
          </Button>
        </div>
      </PageHeader>

      {/* <DoctorTable /> */}
    </>
  );
}
