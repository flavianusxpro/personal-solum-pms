'use client';
import { routes } from '@/config/routes';
import PageHeader from '../../ui/page-header';
import { TabButton } from '../../ui/tab-button';
import { startTransition, useState } from 'react';
import SimpleBar from 'simplebar-react';
import cn from '@/core/utils/class-names';
import PatientDetails from './tab-patient-details';
import TabPassword from './tab-password';
import TabEmergencyContact from './tab-emergency-contact';
import TabBillingAppointments from './tab-billing-appointment';
import TabDocumentation from './tab-documentation';
import TabAssignDoctor from './tab-assign-doctor';
import { useParams } from 'next/navigation';
import { useGetPatientById } from '@/hooks/usePatient';

export const navItems = [
  {
    value: 'patient',
    label: 'Patient Details',
  },
  {
    value: 'password',
    label: 'Password',
  },
  {
    value: 'emergency',
    label: 'Emergency Contact',
  },
  {
    value: 'billing',
    label: 'Billing & Appointments',
  },
  {
    value: 'documentation',
    label: 'Documentations',
  },
  {
    value: 'assign',
    label: 'Assign Doctor',
  },
];

export default function CreateEditPatient({
  isView = false,
}: {
  isView?: boolean;
}) {
  const id = useParams().id as string;

  const [tab, setTab] = useState(navItems[0].value);

  const { data: dataPatient } = useGetPatientById(id);

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  const pageHeader = {
    title: id
      ? `${dataPatient?.first_name ?? '-'} ${dataPatient?.last_name ?? '-'}`
      : 'Create Doctor',
    breadcrumb: [
      {
        href: routes.patient.dashboard,
        name: 'Patients',
      },
      {
        name: 'Account Settings',
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="@container">
        <SimpleBar>
          <nav className="-mb-7 flex w-full gap-3 overflow-x-auto scroll-smooth pb-7 md:gap-5 lg:gap-8">
            {navItems.map((nav) => (
              <TabButton
                item={nav}
                key={nav.value}
                isActive={tab === nav.value}
                onClick={() => selectTab(nav.value)}
                //   disabled={isPending}
              />
            ))}
          </nav>
        </SimpleBar>

        <div className={cn('relative z-[19] [&_label.block>span]:font-medium')}>
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {tab === 'patient' && (
              <PatientDetails
                nextTab={() => selectTab(navItems[1].value)}
                isView={isView}
              />
            )}
            {tab === 'password' && <TabPassword isView={isView} />}
            {tab === 'emergency' && <TabEmergencyContact isView={isView} />}
            {tab === 'billing' && <TabBillingAppointments isView={isView} />}
            {tab === 'documentation' && <TabDocumentation isView={isView} />}
            {tab === 'assign' && <TabAssignDoctor isView={isView} />}
          </div>
        </div>
      </div>
    </>
  );
}
