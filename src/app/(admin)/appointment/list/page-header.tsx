'use client';

import { PiArrowLineUpBold, PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import ExportButton from '@/app/shared/ui/export-button';
import { appointmentData } from '@/data/appointment-data';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CreateUpdateAppointmentForm from '@/app/shared/appointment/modal/appointment-form';
import ExportAppointment from '@/app/shared/appointment/modal/appointment-export';

const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const pageHeader = {
  title: 'Appointment List',
  breadcrumb: [
    {
      href: routes.appointment.dashboard,
      name: 'Dashboard',
    },
    {
      name: 'Appointment List',
    },
  ],
};

interface HeaderProps {
  className?: string;
}

export default function AppointmentListPageHeader({ className }: HeaderProps) {
  const { closeModal, openModal } = useModal();
  function handleCreateModal() {
    closeModal(),
      openModal({
        view: <CreateUpdateAppointmentForm />,
        customSize: '1000px',
      });
  }

  function handleExport() {
    closeModal(),
    openModal({
      view: <ExportAppointment data={appointmentData} />,
      customSize: '500px'
    })
  }

  return (
    <PageHeader
      title={
        <>
          {pageHeader.title} <span className="text-sm font-normal">{localTimezone}</span>
        </>
      }
      breadcrumb={pageHeader.breadcrumb}
    >
      <div className="mt-4 flex flex-col items-center gap-3 @sm:flex-row @lg:mt-0">
        {/* <ExportButton
          data={appointmentData}
          fileName="appointment_data"
          header="ID,Patient,Doctor,Service Type,Date,Status,Payment,Duration"
        /> */}
        <Button variant='outline' className="w-full @lg:w-auto" onClick={handleExport}>
          <PiArrowLineUpBold className="me-1.5 h-[17px] w-[17px]" />
          Export
        </Button>
        <Button className="w-full @lg:w-auto" onClick={handleCreateModal}>
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          Create Appointment
        </Button>
      </div>
    </PageHeader>
  );
}
