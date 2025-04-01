'use client';
import { routes } from '@/config/routes';
import PageHeader from '../../page-header';
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
const pageHeader = {
  title: 'Alice Ronnie',
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

export default function CreateEditPatient() {
  const [tab, setTab] = useState(navItems[0].value);

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

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
              <PatientDetails nextTab={() => selectTab(navItems[1].value)} />
            )}
            {tab === 'password' && <TabPassword />}
            {tab === 'emergency' && <TabEmergencyContact />}
            {tab === 'billing' && <TabBillingAppointments />}
            {tab === 'documentation' && <TabDocumentation />}
            {tab === 'assign' && <TabAssignDoctor />}
          </div>
        </div>
      </div>
    </>
  );
}
