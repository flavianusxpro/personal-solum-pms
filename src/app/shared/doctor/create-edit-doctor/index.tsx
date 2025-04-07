'use client';
import { routes } from '@/config/routes';
import PageHeader from '../../page-header';
import { TabButton } from '../../ui/tab-button';
import { startTransition, useState } from 'react';
import SimpleBar from 'simplebar-react';
import cn from '@/core/utils/class-names';
import DoctorDetails from './tab-doctor-details';
import TabPassword from './tab-password';
import TabEmergencyContact from './tab-emergency-contact';
import TabBillingAppointments from './tab-report-billing';
import TabQualification from './tab-qualification';
import TabCalendar from './tab-calendar';
import TabSettings from './tab-settings';
import { useParams } from 'next/navigation';
import { useGetDoctorById } from '@/hooks/useDoctor';

export const navItems = [
  {
    value: 'doctor',
    label: 'Doctor Details',
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
    label: 'Report Billing',
  },
  {
    value: 'qualification',
    label: 'Qualification',
  },
  {
    value: 'calendar',
    label: 'Calendar',
  },
  {
    value: 'settings',
    label: 'Settings',
  },
];

export default function CreateEditDoctor({
  isView = false,
}: {
  isView?: boolean;
}) {
  const id = useParams().id as string;
  const [tab, setTab] = useState(navItems[0].value);

  const { data: dataDoctor } = useGetDoctorById(id);

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  const pageHeader = {
    title: id
      ? `${dataDoctor?.first_name ?? '-'} ${dataDoctor?.last_name ?? '-'}`
      : 'Create Doctor',
    breadcrumb: [
      {
        href: routes.doctor.dashboard,
        name: 'Doctors',
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
            {tab === 'doctor' && (
              <DoctorDetails
                nextTab={() => selectTab(navItems[1].value)}
                isView={isView}
              />
            )}
            {tab === 'password' && <TabPassword isView={isView} />}
            {tab === 'emergency' && <TabEmergencyContact isView={isView} />}
            {tab === 'billing' && <TabBillingAppointments isView={isView} />}
            {tab === 'qualification' && <TabQualification isView={isView} />}
            {tab === 'calendar' && <TabCalendar isView={isView} />}
            {tab === 'settings' && <TabSettings isView={isView} />}
          </div>
        </div>
      </div>
    </>
  );
}
