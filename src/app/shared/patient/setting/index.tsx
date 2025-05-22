'use client';
import { routes } from '@/config/routes';
import PageHeader from '../../ui/page-header';
import { TabButton } from '../../ui/tab-button';
import { startTransition, useState } from 'react';
import SimpleBar from 'simplebar-react';
import ConditionTable from './condition/table/table';
import ModalButton from '../../ui/modal-button/modal-button';
import CreateEditSpecialistModal from './condition/modal/create-edit-modal';

export const navItems = [
  {
    value: 'condition',
    label: 'Patient Condition',
  },
];

export default function SettingPatient() {
  const [tab, setTab] = useState(navItems[0].value);

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  const pageHeader = {
    title: 'Patient Settings',
    breadcrumb: [
      {
        href: routes.patient.list,
        name: 'Patient List',
      },
      {
        name: 'Patient Settings',
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton
          view={<>{tab === 'condition' && <CreateEditSpecialistModal />}</>}
        />
      </PageHeader>
      <div className="flex flex-col @container">
        <SimpleBar>
          <nav className="mb-7 flex items-center gap-5 border-b border-gray-300 md:gap-7 lg:gap-10">
            {navItems.map((nav) => (
              <TabButton
                item={nav}
                key={nav.value}
                isActive={tab === nav.value}
                onClick={() => selectTab(nav.value)}
              />
            ))}
          </nav>
        </SimpleBar>

        {tab === 'condition' && <ConditionTable />}
      </div>
    </>
  );
}
