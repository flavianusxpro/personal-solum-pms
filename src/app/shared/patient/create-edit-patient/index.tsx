'use client';
import { routes } from '@/config/routes';
import PageHeader from '../../ui/page-header';
import { TabButton } from '../../ui/tab-button';
import { startTransition, useState } from 'react';
import SimpleBar from 'simplebar-react';
import PatientDetails from './tab-patient-details';
import TabPassword from './tab-password';
import TabEmergencyContact from './tab-emergency-contact';
import TabBillingAppointments from './tab-billing-appointment';
import TabDocumentation from './tab-documentation';
import TabAssign from './tab-assign';
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
    label: 'Correspondence',
  },
  {
    value: 'assign',
    label: 'Assign',
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
      ? `${dataPatient?.first_name ?? '-'} ${dataPatient?.last_name ?? '-'} (${dataPatient?.patient_type})`
      : 'Create Patient',
    breadcrumb: [
      {
        href: routes.patient.dashboard,
        name: 'Patient',
      },
      {
        name: 'Account Settings',
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex flex-col @container">
        <SimpleBar>
          <nav className="mb-7 flex items-center gap-5 border-b border-gray-300 md:gap-7 lg:gap-10">
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
        {tab === 'assign' && <TabAssign isView={isView} />}
      </div>
    </>
  );
}
