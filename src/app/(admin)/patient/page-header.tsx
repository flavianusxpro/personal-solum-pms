'use client';
import { Button } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';
import { orderData } from '@/data/order-data';
import ExportButton from '@/app/shared/ui/export-button';
import PageHeader from '@/app/shared/ui/page-header';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CreatePatientModal from '@/app/shared/patient/modal/create-modal';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Patients',
  breadcrumb: [
    {
      href: routes.patient.list,
      name: 'Patients',
    },
    {
      name: 'List',
    },
  ],
};

export default function PatientPageHeader() {
  const { openModal } = useModal();

  return (
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      <div className="mt-4 flex items-center gap-3 @lg:mt-0">
        <ExportButton
          data={orderData}
          fileName="order_data"
          header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
        />
        <Button
          onClick={() => {
            openModal({
              view: <CreatePatientModal />,
              customSize: '600px',
            });
          }}
          className="w-full @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Patient
          </Button>
        </Button>
      </div>
    </PageHeader>
  );
}
