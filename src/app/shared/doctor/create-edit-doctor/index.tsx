'use client';
import { routes } from '@/config/routes';
import PageHeader from '../../ui/page-header';
import { TabButton } from '../../ui/tab-button';
import { startTransition, useState } from 'react';
import SimpleBar from 'simplebar-react';
import DoctorDetails from './tab-doctor-details';
import TabPassword from './tab-password';
import TabEmergencyContact from './tab-emergency-contact';
import TabBillingAppointments from './tab-report-billing';
import TabCompliance from './tab-compliance';
import TabCalendar from './tab-calendar';
import TabSettings from './tab-settings';
import { useParams } from 'next/navigation';
import { useGetDoctorById } from '@/hooks/useDoctor';
import TabAssign from './tab-assign';

const settingNavs = [
  {
    value: 'settings',
    label: 'Settings',
  },
];

export const navItems = [
  {
    value: 'doctor',
    label: 'Doctor Details',
  },
  // {
  //   value: 'password',
  //   label: 'Password',
  // },
  {
    value: 'emergency',
    label: 'Emergency Contact',
  },
  {
    value: 'billing',
    label: 'Billing Report',
  },
  {
    value: 'compliance',
    label: 'Compliance',
  },
  {
    value: 'calendar',
    label: 'Calendar',
  },
  // {
  //   value: 'assign',
  //   label: 'Assign',
  // },
  {
    value: 'settings',
    label: 'Settings',
  },
];

export default function CreateEditDoctor({
  isView = false,
  mode,
}: {
  isView?: boolean;
  mode?: string;
}) {
  const id = useParams().id as string;
  const [tab, setTab] = useState(
    mode == 'edit' ? settingNavs[0].value : navItems[0].value
  );

  const { data: dataDoctor } = useGetDoctorById(id);

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  const pageHeader = {
    title: id
      ? `Dr. ${dataDoctor?.first_name ?? '-'} ${dataDoctor?.last_name ?? '-'}`
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

  const tabItems = mode == 'edit' ? settingNavs : navItems;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex flex-col @container">
        <SimpleBar>
          <nav className="mb-7 flex items-center gap-5 border-b border-gray-300 md:gap-7 lg:gap-10">
            {tabItems.map((nav) => (
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

        {mode == 'edit' ? (
          tab === 'settings' && <TabSettings isView={isView} mode={mode} />
        ) : (
          <>
            {tab === 'doctor' && <DoctorDetails isView={true} />}
            {tab === 'password' && <TabPassword isView={isView} />}
            {tab === 'emergency' && <TabEmergencyContact isView={true} />}
            {tab === 'billing' && <TabBillingAppointments isView={isView} />}
            {tab === 'compliance' && <TabCompliance isView={true} />}
            {tab === 'calendar' && <TabCalendar isView={true} />}
            {tab === 'assign' && <TabAssign isView={isView} />}
            {tab === 'settings' && <TabSettings isView={isView} />}
          </>
        )}
      </div>
    </>
  );
}
