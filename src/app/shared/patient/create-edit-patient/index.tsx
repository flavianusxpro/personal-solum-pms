'use client';
import { routes } from '@/config/routes';
import PageHeader from '../../ui/page-header';
import { TabButton } from '../../ui/tab-button';
import { startTransition, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import PatientDetails from './tab-patient-details';
import TabPassword from './tab-password';
import TabEmergencyContact from './tab-emergency-contact';
import TabBillingAppointments from './tab-billing-appointment';
import TabNotesFlags from './tab-notes-flag';
import TabAssign from './tab-assign';
import { useParams, useRouter } from 'next/navigation';
import { useGetPatientById } from '@/hooks/usePatient';
import TabHistory from './tab-history';
import TabDocumentation from './tab-documentation';
import TabLog from './tab-log';
import TabCommunications from './tab-communications';
import TabLetterAndAttachment from './tab-letterAndAttachment';
import TabClinical from './tab-clinical';
import TabSettings from './TabSettings';
import { Select } from 'rizzui';
import { FiPlus } from 'react-icons/fi';
import CreateUpdateAppointmentForm from '../../appointment/modal/appointment-form';
import { useModal } from '../../modal-views/use-modal';
import AddNotesForm from '../../appointment/modal/add-notes';
import RedFlagForm from '../modal/red-flag';

export const navItems = [
  {
    value: 'patient',
    label: 'Patient Details',
  },
  {
    value: 'billing',
    label: 'Billing & Appointments',
  },
  {
    value: 'communications',
    label: 'Communications',
  },
  {
    value: 'notes-flags',
    label: 'Notes & Flags',
  },
  {
    value: 'consent',
    label: 'Consent',
  },
  {
    value: 'letterAndAttachment',
    label: 'Letter & Attachment',
  },
  {
    value: 'clinical',
    label: 'Clinical',
  },
  {
    value: 'log',
    label: 'Log',
  },
  {
    value: 'settings',
    label: 'Settings',
  },
  // {
  //   value: 'history',
  //   label: 'History',
  // },
  // {
  //   value: 'password',
  //   label: 'Password',
  // },
  // {
  //   value: 'emergency',
  //   label: 'Emergency Contact',
  // },
];

export default function CreateEditPatient({
  isView = false,
}: {
  isView?: boolean;
}) {
  const id = useParams().id as string;
  const { closeModal, openModal } = useModal();
  const [tab, setTab] = useState(navItems[0].value);

  const { data: dataPatient } = useGetPatientById(id);

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  const pageHeader = {
    title: id
      ? `${dataPatient?.first_name ?? '-'} ${dataPatient?.last_name ?? '-'} ${dataPatient?.patient_type ? `(${dataPatient?.patient_type})` : ''}`
      : 'Create Patient',
    breadcrumb: [
      {
        href: routes.patient.list,
        name: 'Patient',
      },
      {
        name: 'Account Settings',
      },
    ],
  };

  const extraActions = [
    {
      label: 'Appointment',
      value: 'appointment',
    },
    {
      label: 'Invoice',
      value: 'invoice',
    },
    {
      label: 'Note',
      value: 'note',
    },
    {
      label: 'Flag',
      value: 'flag',
    },
  ]
  const [createAction, setCreateAction] = useState(null)
  const selectedOption = extraActions.find(opt => opt.value === createAction)
  const router = useRouter()

  useEffect(() => {
    if (createAction === 'appointment') {
      openModal({
        view: <CreateUpdateAppointmentForm setCreateAction={setCreateAction} />,
        customSize: '1000px',
      });
    }

    if (createAction === 'invoice') {
      router.push(routes.invoice.create);
    }

    if (createAction === 'note') {
      openModal({
        view: <AddNotesForm setCreateAction={setCreateAction} patient_id={Number(dataPatient?.patient_id)} />,
        customSize: '600px',
      });
    }

    if (createAction === 'flag') {
      openModal({
        view: <RedFlagForm setCreateAction={setCreateAction} patient_id={Number(dataPatient?.id)} modalType={'flag'} />,
        customSize: '600px',
      });
    }
  }, [createAction])

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex flex-col @container">
        <SimpleBar>
          <nav className="mb-7 flex justify-between items-center border-b border-gray-300 w-full flex-wrap gap-4">
            <div className='flex items-center gap-5 md:gap-7 lg:gap-10'>
              {navItems.map((nav) => (
                <TabButton
                  item={nav}
                  key={nav.value}
                  isActive={tab === nav.value}
                  onClick={() => selectTab(nav.value)}
                // disabled={isPending}
                />
              ))}
            </div>

            <div className='w-[200px]'>
              <Select
                prefix={<FiPlus />}
                placeholder='Create'
                options={extraActions}
                value={selectedOption}
                clearable={createAction !== null}
                onClear={() => setCreateAction(null)}
                onChange={(e: any) => setCreateAction(e.value)}
              />
            </div>
          </nav>
        </SimpleBar>

        {/* {tab === 'password' && <TabPassword isView={isView} />} */}
        {/* {tab === 'emergency' && <TabEmergencyContact isView={isView} />} */}
        {/* {tab === 'history' && <></>} */}
        {/* {tab === 'assign' && <TabAssign isView={isView} />} */}

        {tab === 'patient' && <PatientDetails isView={isView} />}
        {tab === 'billing' && <TabBillingAppointments isView={isView} />}
        {tab === 'communications' && <TabCommunications isView={isView} />}
        {tab === 'notes-flags' && <TabNotesFlags isView={isView} />}
        {tab === 'consent' && <TabDocumentation isView={isView} />}
        {tab === 'letterAndAttachment' && <TabLetterAndAttachment isView={isView} />}
        {tab === 'clinical' && <TabClinical isView={isView} />}
        {tab === 'log' && <TabLog />}
        {tab === 'settings' && <TabSettings />}
      </div>
    </>
  );
}
