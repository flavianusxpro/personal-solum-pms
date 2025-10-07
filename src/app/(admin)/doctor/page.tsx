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
import PickDoctorModal from '@/app/shared/doctor/modal/pick-doctor';

const pageHeader = {
  title: 'Doctors',
  breadcrumb: [
    {
      href: routes.doctor.dashboard,
      name: 'Doctors',
    },
    {
      name: 'List',
    },
  ],
};

export default function DoctorPage() {
  const { openModal } = useModal();

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={doctorData}
            fileName="order_data"
            header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          />
          <Button
            onClick={() => {
              openModal({
                view: <PickDoctorModal />,
                customSize: '600px',
              });
            }}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Pick Doctor
            </Button>
          </Button>
          {/* {process.env.NEXT_PUBLIC_CLINIC_TYPE === 'MAIN' && (
            <Button
              onClick={() => {
                openModal({
                  view: <CreateDoctorModal />,
                  customSize: '600px',
                });
              }}
              className="w-full @lg:w-auto"
            >
              <Button as="span" className="w-full @lg:w-auto">
                <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                Add Doctor
              </Button>
            </Button>
          )} */}
        </div>
      </PageHeader>

      <DoctorTable />
    </>
  );
}
