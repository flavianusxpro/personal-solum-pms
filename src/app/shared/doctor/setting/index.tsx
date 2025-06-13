'use client';
import { routes } from '@/config/routes';
import PageHeader from '../../ui/page-header';
import { TabButton } from '../../ui/tab-button';
import { startTransition, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useParams } from 'next/navigation';
import { useGetDoctorById } from '@/hooks/useDoctor';
import SpecialistTable from './specialist/table/table';
import ModalButton from '../../ui/modal/modal-button';
import CreateEditSpecialistModal from './specialist/modal/create-edit-modal';
import CreateEditTreatmentModal from './treatment/modal/create-edit-modal';
import TreatmentTable from './treatment/table/table';
import ProblemTable from './problem/table/table';
import CreateEditProblemModal from './problem/modal/create-edit-modal';

export const navItems = [
  {
    value: 'specialist',
    label: 'Specialist',
  },
  {
    value: 'treatment',
    label: 'Treatment',
  },
  {
    value: 'problem',
    label: 'Problem',
  },
];

export default function SettingDoctor({
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
    title: 'Doctor Settings',
    breadcrumb: [
      {
        href: routes.doctor.dashboard,
        name: 'Doctors',
      },
      {
        name: 'Doctor Settings',
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton
          view={
            <>
              {tab === 'specialist' && <CreateEditSpecialistModal />}
              {tab === 'treatment' && <CreateEditTreatmentModal />}
              {tab === 'problem' && <CreateEditProblemModal />}
            </>
          }
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
                //   disabled={isPending}
              />
            ))}
          </nav>
        </SimpleBar>

        {tab === 'specialist' && <SpecialistTable />}
        {tab === 'treatment' && <TreatmentTable />}
        {tab === 'problem' && <ProblemTable />}
      </div>
    </>
  );
}
