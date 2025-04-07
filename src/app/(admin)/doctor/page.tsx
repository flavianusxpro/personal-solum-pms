'use client';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { doctorData } from '@/data/doctor-data';
import { PiPlusBold } from 'react-icons/pi';
import DoctorList from '../../shared/doctor/DoctorList';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CreateDoctorModal from '@/app/shared/doctor/modal/create-modal';

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
                view: <CreateDoctorModal />,
                size: 'xl',
              });
            }}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Doctor
            </Button>
          </Button>
        </div>
      </PageHeader>

      <DoctorList />
    </>
  );
}
