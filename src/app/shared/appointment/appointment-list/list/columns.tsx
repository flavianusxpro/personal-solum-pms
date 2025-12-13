'use client';

import { HeaderCell } from '@/app/shared/ui/table';
import {
  Text,
  Checkbox,
  Badge,
  Flex,
  Dropdown,
  Button,
  Tooltip,
} from 'rizzui';
import EyeIcon from '@core/components/icons/eye';
import { Type } from '@/data/appointment-data';
import { useModal } from '@/app/shared/modal-views/use-modal';
import AppointmentDetails from './appointment-details';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import dayjs from '@/config/dayjs';
import CSelect from '@/app/shared/ui/select';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useUpdateAppointment } from '@/hooks/useAppointment';
import toast from 'react-hot-toast';
import CreateUpdateAppointmentForm from '../../modal/appointment-form';
import { FaRegNoteSticky } from 'react-icons/fa6';
import { GrSchedules } from 'react-icons/gr';
import { RxCountdownTimer } from 'react-icons/rx';
import { MdNotes, MdOutlineFreeCancellation, MdOutlineVisibility, MdVerified } from 'react-icons/md';
import AddNotesForm from '../../modal/add-notes';
import CancelForm from '../../modal/cancel-form';
import RescheduleAppointmentForm from '../../modal/reschedule';
import RevertForm from '../../modal/revert-form';
import ShowNote from '../../modal/show-notes';
import timezonePlugin from 'dayjs/plugin/timezone';
import DeleteModal from '@/app/shared/ui/delete-modal';
import TrashIcon from '@/core/components/icons/trash';
import ShowConfirm from '../../modal/confirm-modal';
import ModalProfilePatient from '../../modal/profile-patient';
import ModalProfileDoctor from '../../modal/profile-doctor';
import ModalReminder from '../../modal/reminder-detail';
import StatusColumnCell from './StatusColumnCell';
import { BsArrowRepeat } from 'react-icons/bs';
import { routes } from '@/config/routes';
import Link from 'next/link';
import AvatarCardNew from '@/core/ui/avatar-card-new';

dayjs.extend(timezonePlugin);
const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const aptStatusOptions = [
  { label: 'Draft', value: 1 },
  { label: 'Scheduled', value: 2 },
  { label: 'Checked In', value: 3 },
  { label: 'Finished', value: 4 },
  { label: 'Cancelled', value: 5 },
  { label: 'On Going', value: 6 },
  { label: 'No Show', value: 7 },
];

type RowValue = IGetAppointmentListResponse['data'][number];

type Columns = {
  data?: IGetAppointmentListResponse['data'];
  sortConfig?: any;
  handleSelectAllRow: any;
  checkedItems: any;
  onDeleteItem: (id: number[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  idAppointment: number | string;
  setIdAppointment: Dispatch<SetStateAction<number | string>>;
  setStatusChanged: Dispatch<SetStateAction<boolean>> | undefined
};
interface StatusCellProps {
  id: number;
  status: number;
  date: string | null | undefined;
  setStatusValue: (value: number) => void;
}

export const GetColumns = ({
  handleSelectAllRow,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  data,
  checkedItems,
  onChecked,
  isOpen,
  setIsOpen,
  idAppointment,
  setIdAppointment,
  setStatusChanged
}: Columns) => {
  const { openModal, closeModal } = useModal();
  return [
    {
      title: (
        <div className="ps-2">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAllRow}
            checked={checkedItems?.length === data?.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 30,
      onCell: () => ({
        onClick: (e: any) => e.stopPropagation(),
      }),
      render: (_: any, row: any) => (
        <div className="inline-flex ps-3.5">
          <Checkbox
            aria-label={'ID'}
            className="cursor-pointer"
            checked={checkedItems.some((item: any) => item.id === row.id)}
            {...(onChecked && { onChange: () => onChecked(row) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="PATIENT NAME" />,
      dataIndex: 'patient',
      key: 'patient',
      width: 320,
      render: (_: any, row: RowValue) => {
        const isVerified = row?.patient?.has_filled_consent_form === true && row?.patient?.ihi_number && row?.patient?.ihi_number !== '';

        return (
          <div
            onClick={(e) => {
              e.stopPropagation()
              closeModal(),
                openModal({
                  view: <ModalProfilePatient data={row} />,
                  customSize: '1100px',
                });
            }}
          >
            <AvatarCardNew
              className='cursor-pointer'
              src={row?.patient?.photo || ''}
              name={`${row?.patient?.first_name} ${row?.patient?.middle_name ? row?.patient?.middle_name : ''} ${row?.patient?.last_name}`}
              otherIcon={
                [
                  () => {
                    const isVerified = row?.patient?.has_filled_consent_form === true && row?.patient?.ihi_number && row?.patient?.ihi_number !== '';
                    return (
                      <Tooltip
                        color={isVerified ? 'info' : 'danger'}
                        content={
                          isVerified
                            ? 'Consent form completed and IHI number available'
                            : 'Consent form uncompleted or IHI number not available'
                        }
                      >
                        <span className='inline-flex'>
                          <MdVerified
                            className={`cursor-pointer ${isVerified ? 'text-blue-600' : 'text-gray-400'}`}
                            title={isVerified ? 'Consent form completed and IHI number available' : 'Consent form uncompleted or IHI number not available'}
                            key="verified"
                          />
                        </span>
                      </Tooltip>
                    );
                  },
                ]
              }
            />
          </div >
        )
      }
    },
    {
      title: <HeaderCell title="Date" />,
      dataIndex: 'date',
      key: 'date',
      width: 250,
      render: (date: Date, row: RowValue) => (
        <div>
          {dayjs(date).utc().format('DD MMM YYYY')}
        </div>
      ),
    },
    {
      title: <HeaderCell title="Time" />,
      dataIndex: 'date',
      key: 'date',
      width: 250,
      render: (date: Date, row: RowValue) => (
        <div className='flex flex-col'>
          <span>
            {dayjs(date).utc().format('hh:mm A')}
          </span>
          <span>
            {row.doctor.timezone}
          </span>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Doctor" />,
      dataIndex: 'doctor',
      key: 'doctor',
      width: 320,
      render: (doctorId: string, row: RowValue) => (
        <div className='flex items-center gap-2'>
          <span
            className='font-bold cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              closeModal(),
                openModal({
                  view: <ModalProfileDoctor data={row} />,
                  customSize: '1100px',
                });
            }}
          >
            Dr. {row.doctor.first_name} {row.doctor.last_name}
          </span>
        </div>
      ),
    },
    {
      title: (
        <HeaderCell
          title="APT TYPE"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'type'
          }
        />
      ),
      dataIndex: 'patient_type',
      key: 'patient_type',
      width: 180,
      onHeaderCell: () => onHeaderCellClick('patient_type'),
      render: (type: Type, row: RowValue) => (
        <>
          <p className="whitespace-nowrap font-medium text-gray-900">{type}</p>
          <div className='flex items-center gap-2'>
            <p className="whitespace-nowrap font-medium text-gray-500">
              Reminder Sent
            </p>
            <span
              className='text-[16px] cursor-pointer font-bold'
              onClick={(e) => {
                e.stopPropagation();
                closeModal(),
                  openModal({
                    view: <ModalReminder data={row} />,
                    customSize: '900px',
                  });
              }}
            >
              <MdOutlineVisibility />
            </span>
          </div>
        </>
      ),
    },
    {
      title: <HeaderCell title="APT STATUS" />,
      onHeaderCell: () => onHeaderCellClick('status'),
      dataIndex: 'status',
      key: 'status',
      width: 260,
      render: (value: number, row: RowValue) => (
        <StatusColumnCell row={row} setStatusChanged={setStatusChanged} />
      ),
    },
    {
      title: (
        <HeaderCell
          title="PAYMENT STATUS"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
          }
        />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 260,
      onHeaderCell: () => onHeaderCellClick('status'),
      render: (status: number | string, row: RowValue) => (
        <div className='flex flex-col gap-[10px] p-4'>
          <span>
            {getPaymentStatusBadge(row?.payment?.status ?? 0)}
          </span>
          {/* <Link
            href={routes.invoice.details(row.id.toString())}
            className="w-full"
          >
            <span className='text-[#525252] font-semibold text-sm'>
              {row.clinicId}
            </span>
          </Link> */}
        </div>
      )
    },
    {
      title: <HeaderCell title="Action" />,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, row: any) => (
        <RenderAction
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          row={row}
          onDeleteItem={onDeleteItem}
          idAppointment={idAppointment}
          setIdAppointment={setIdAppointment}
          setStatusChanged={setStatusChanged}
        />
      ),
    },
  ];
};

function RenderAction({
  row,
  onDeleteItem,
  isOpen,
  setIsOpen,
  idAppointment,
  setIdAppointment,
  setStatusChanged
}: {
  row: RowValue;
  onDeleteItem: (id: number[]) => void;
  isOpen: boolean;
  setIsOpen: any;
  idAppointment: number | string;
  setIdAppointment: Dispatch<SetStateAction<number | string>>;
  setStatusChanged: Dispatch<SetStateAction<boolean>> | undefined;
}) {
  const { openModal, closeModal } = useModal();

  const isShowCancel = [1, 2, 3].includes(row.status);
  const isShowReschedule = [2, 3].includes(row.status);
  const isHasNote = !!row.note;

  function handleCreateModal() {
    closeModal(),
      openModal({
        view: <CreateUpdateAppointmentForm />,
        customSize: '600px',
      });
  }

  function showNoteModal() {
    closeModal(),
      openModal({
        view: <ShowNote notes={row.note || ''} />,
        customSize: '600px',
      });
  }

  function addNotesModal() {
    closeModal(),
      openModal({
        view: <AddNotesForm patient_id={row.patientId} />,
        customSize: '600px',
      });
  }

  function rescheduleModal(row: RowValue) {
    closeModal(),
      openModal({
        view: <RescheduleAppointmentForm setStatusChanged={setStatusChanged} data={row} />,
        customSize: '600px',
      });
  }

  function cancelModal(row: RowValue) {
    closeModal(),
      openModal({
        view: <CancelForm data={row} />,
        customSize: '600px',
      });
  }

  function revertModal(row: RowValue) {
    closeModal(),
      openModal({
        view: <RevertForm data={row} />,
        customSize: '600px',
      });
  }

  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <Dropdown placement="bottom-end">
        <Dropdown.Trigger onClick={(e) => e.stopPropagation()} >
          <Button
            as="span"
            variant="outline"
          >
            Action
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          {isShowCancel && (
            <Dropdown.Item onClick={(e) => {
              e.stopPropagation()
              cancelModal(row)
            }}
            >
              <MdOutlineFreeCancellation className="mr-2 h-4 w-4" />
              Cancel
            </Dropdown.Item>
          )}

          {isShowReschedule && (
            <Dropdown.Item onClick={(e) => {
              e.stopPropagation();
              rescheduleModal(row)
            }}>
              <GrSchedules className="mr-2 h-4 w-4" />
              Reschedule
            </Dropdown.Item>
          )}

          <Dropdown.Item onClick={(e) => {
            e.stopPropagation();
            revertModal(row)
          }}>
            <RxCountdownTimer className="mr-2 h-4 w-4" />
            Revert Back
          </Dropdown.Item>

          {isHasNote && (
            <Dropdown.Item onClick={(e) => {
              e.stopPropagation();
              showNoteModal()
            }}>
              <MdNotes className="mr-2 h-4 w-4" />
              Show Note
            </Dropdown.Item>
          )}

          <Dropdown.Item onClick={(e) => {
            e.stopPropagation();
            addNotesModal()
          }}>
            <FaRegNoteSticky className="mr-2 h-4 w-4" />
            Add Note
          </Dropdown.Item>

          <Dropdown.Item onClick={(e) => {
            e.stopPropagation();
            openModal({
              view: (
                <AppointmentDetails data={row} onEdit={handleCreateModal} />
              ),
              customSize: '1100px',
            })
          }}>
            <EyeIcon className="mr-2 h-4 w-4" />
            View
          </Dropdown.Item>

          <Dropdown.Item onClick={(e) => {
            e.stopPropagation();
            setIdAppointment(row.id);
            setIsOpen(true);
          }}>
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Delete the appointment`}
        description={`Are you sure you want to delete this #${idAppointment} appointment?`}
        onDelete={() => onDeleteItem([Number(idAppointment)])}
      />
    </div>
  );
}

export function getPaymentStatusBadge(status: number | string | undefined) {
  switch (status) {
    case 2:
      return (
        <Flex gap="1" align="center">
          <Badge color="success" renderAsDot />
          <Text className="font-medium text-green-dark">Paid</Text>
        </Flex>
      );
    case 3:
      return (
        <Flex gap="1" align="center">
          <Badge color="danger" renderAsDot />
          <Text className="text-yellow-dark font-medium">Canceled</Text>
        </Flex>
      );
    case 1:
      return (
        <Flex gap="1" align="center">
          <Badge color="warning" renderAsDot />
          <Text className="font-medium text-yellow-600">Pending</Text>
        </Flex>
      );
    case 0:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="font-medium text-gray-600">Not Paid</Text>
        </div>
      );
    case 4:
      return (
        <Flex gap="1" align="center">
          <Badge color="warning" renderAsDot />
          <Text className="font-medium text-red-dark">Unpaid</Text>
        </Flex>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

export function getAptStatusBadge(status: number | string) {
  switch (status) {
    case 7:
      return (
        <Flex gap="1" align="center">
          <Badge color="warning" renderAsDot />
          <Text className="font-medium text-green-dark">No Show</Text>
        </Flex>
      );
    case 6:
      return (
        <Flex gap="1" align="center">
          <Badge color="info" renderAsDot />
          <Text className="font-medium text-green-500">On Going</Text>
        </Flex>
      );
    case 5:
      return (
        <Flex gap="1" align="center">
          <Badge color="danger" renderAsDot />
          <Text className="font-medium text-red">Canceled</Text>
        </Flex>
      );
    case 4:
      return (
        <Flex gap="1" align="center">
          <Badge color="success" renderAsDot />
          <Text className="font-medium text-green-dark">Completed</Text>
        </Flex>
      );
    case 3:
      return (
        <Flex gap="1" align="center">
          <Badge color="info" renderAsDot />
          <Text className="font-medium text-blue-500">Checked In</Text>
        </Flex>
      );
    case 2:
      return (
        <Flex gap="1" align="center">
          <Badge color="warning" renderAsDot />
          <Text className="font-medium text-yellow-600">Scheduled</Text>
        </Flex>
      );
    case 1:
      return (
        <Flex gap="1" align="center">
          <Badge color="info" renderAsDot />
          <Text className="font-medium text-red-dark">Draft</Text>
        </Flex>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="font-medium text-blue-600">{status}</Text>
        </div>
      );
  }
}

export function StatusSelect({ selectItem, id, statusValue, setStatusChanged }: { selectItem: number; id: number, statusValue: number | null, setStatusChanged: Dispatch<SetStateAction<boolean>> | undefined }) {
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (statusValue !== null) {
      setValue(statusValue);
    }
  }, [statusValue]);

  const showConfirmModal = (
    id: number,
    onClick: (value: number) => void,
    status: string
  ) => {
    closeModal(),
      openModal({
        view: <ShowConfirm onClick={onClick} status={status} id={id} />,
        customSize: '550px',
      });
  };

  const selectItemValue = aptStatusOptions.find(
    (option) => option.value === selectItem
  )?.value;
  const [value, setValue] = useState(selectItemValue);
  const { mutate, isPending } = useUpdateAppointment();

  const handleSubmitStatus = (value: number) => {
    setValue(value);
    mutate(
      { id, status: value },
      {
        onSuccess: () => {
          setStatusChanged?.(true)
          toast.success('Status updated successfully');
          closeModal();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Error updating status'
          );
          closeModal();
        },
      }
    );
  };

  const handleChange = (value: number) => {
    // setValue(value);
    if (value == 1) {
      showConfirmModal(value, handleSubmitStatus, 'Draft');
    } else if (value == 2) {
      showConfirmModal(value, handleSubmitStatus, 'Scheduled');
    } else if (value == 3) {
      showConfirmModal(value, handleSubmitStatus, 'Check In');
    } else if (value == 4) {
      showConfirmModal(value, handleSubmitStatus, 'Finished');
    } else if (value == 5) {
      showConfirmModal(value, handleSubmitStatus, 'Cancelled');
    } else if (value == 6) {
      showConfirmModal(value, handleSubmitStatus, 'On Going');
    } else if (value == 7) {
      showConfirmModal(value, handleSubmitStatus, 'No Show');
    } else {
      handleSubmitStatus(value);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <CSelect
        className="min-w-[140px]"
        dropdownClassName="h-auto"
        placeholder="Select Status"
        options={aptStatusOptions}
        value={value}
        onChange={handleChange}
        isLoading={isPending}
        displayValue={(option: { value: number }) =>
          getAptStatusBadge(option.value)
        }
      />
    </div>
  );
}

export function StatusCell({
  id,
  status,
  date,
  setStatusValue,
}: StatusCellProps) {
  const { openModal, closeModal } = useModal();
  const { mutate, isPending } = useUpdateAppointment();

  if (!date) {
    return null;
  }

  const appointmentDate = new Date(date);

  if (isNaN(appointmentDate.getTime())) {
    return null;
  }

  const currentDate = new Date();
  const timeDiffMinutes = (appointmentDate.getTime() - currentDate.getTime()) / (1000 * 60);

  const isWithin30Minutes = timeDiffMinutes > 0 && timeDiffMinutes <= 30;

  const isPastAppointment = appointmentDate < currentDate;

  const showConfirmModal = (statusValue: number, statusLabel: string) => {
    openModal({
      view: (
        <ShowConfirm
          onClick={() => handleSubmitStatus(statusValue)}
          status={statusLabel}
          id={id}
        />
      ),
      customSize: '550px',
    });
  };

  const handleSubmitStatus = (statusValue: number) => {
    mutate(
      { id, status: statusValue },
      {
        onSuccess: () => {
          toast.success('Status updated successfully');
          closeModal();
          setStatusValue(statusValue)
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Error updating status'
          );
          closeModal();
        },
      }
    );
  };

  if (!isWithin30Minutes && !isPastAppointment) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {isWithin30Minutes && status !== 3 && status !== 4 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            showConfirmModal(3, 'Check In')
          }}
          className="flex items-center gap-[4px] text-sm text-[#3872F9] font-semibold"
          disabled={isPending}
        >
          <span>
            <BsArrowRepeat />
          </span>
          <span>
            Change to Check In
          </span>
        </button>
      )}

      {isPastAppointment && status !== 4 && status !== 5 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            showConfirmModal(4, 'Finished')
          }}
          className="flex items-center gap-[4px] text-sm text-[#3872F9] font-semibold"
          disabled={isPending}
        >
          <span className='text-lg'>
            <BsArrowRepeat />
          </span>
          Change to Finished
        </button>
      )}
    </div>
  );
}

