'use client';

import { HeaderCell } from '@/app/shared/ui/table';
import {
  Text,
  Checkbox,
  ActionIcon,
  Tooltip,
  Badge,
  Flex,
  Dropdown,
  Button,
} from 'rizzui';
import EyeIcon from '@core/components/icons/eye';
import DeletePopover from '@/app/shared/ui/delete-popover';
import { Type } from '@/data/appointment-data';
import { useModal } from '@/app/shared/modal-views/use-modal';
import AppointmentDetails from './appointment-details';
import AvatarCard from '@core/ui/avatar-card';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import dayjs from '@/config/dayjs';
import CSelect from '@/app/shared/ui/select';
import { Dispatch, SetStateAction, useState } from 'react';
import { useUpdateAppointment } from '@/hooks/useAppointment';
import toast from 'react-hot-toast';
import CreateUpdateAppointmentForm from '../../modal/appointment-form';
import { FaRegNoteSticky } from 'react-icons/fa6';
import { GrSchedules } from 'react-icons/gr';
import { RxCountdownTimer } from 'react-icons/rx';
import { MdNotes, MdOutlineFreeCancellation } from 'react-icons/md';
import AddNotesForm from '../../modal/add-notes';
import CancelForm from '../../modal/cancel-form';
import RescheduleAppointmentForm from '../../modal/reschedule';
import RevertForm from '../../modal/revert-form';
import ShowNote from '../../modal/show-notes';
import timezonePlugin from 'dayjs/plugin/timezone';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import DeleteModal from '@/app/shared/ui/delete-modal';
import TrashIcon from '@/core/components/icons/trash';
import ShowConfirm from '../../modal/confirm-modal';
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
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: number[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  idAppointment: number | string;
  setIdAppointment: Dispatch<SetStateAction<number | string>>;
};

export const GetColumns = ({
  handleSelectAll,
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
}: Columns) => {
  return [
    {
      title: (
        <div className="ps-2">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
            checked={checkedItems?.length === data?.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 30,
      render: (_: any, row: any) => (
        <div className="inline-flex ps-3.5">
          <Checkbox
            aria-label={'ID'}
            className="cursor-pointer"
            checked={checkedItems.includes(row.id)}
            {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="ID" />,
      onHeaderCell: () => onHeaderCellClick('id'),
      dataIndex: 'id',
      key: 'id',
      width: 130,
      render: (id: string) => <Text>#{id}</Text>,
    },
    {
      title: <HeaderCell title="PATIENT NAME" />,
      // onHeaderCell: () => onHeaderCellClick('patient.name'),
      dataIndex: 'patient',
      key: 'patient',
      width: 320,
      render: (_: any, row: RowValue) => (
        <AvatarCard
          src={row?.patient?.photo ?? ''}
          name={`${row?.patient?.first_name} ${row?.patient?.last_name}`}
          description={row?.patient?.email}
          number={row?.patient?.mobile_number}
        />
      ),
    },
    {
      title: <HeaderCell title="Local Time" />,
      dataIndex: 'local_date',
      key: 'local_date',
      width: 250,
      render: (date: string) => (
        <div>
          {date}
          <div>{localTimezone}</div>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Date" />,
      dataIndex: 'date',
      key: 'date',
      width: 250,
      render: (date: Date, row: RowValue) => (
        <div>
          {dayjs(date).utc().format('DD/MM/YYYY hh:mm A')}
          <div>{row.doctor.timezone}</div>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Doctor" />,
      dataIndex: 'doctor',
      key: 'doctor',
      width: 320,
      render: (doctorId: string, row: RowValue) => (
        <AvatarCard
          number={row.doctor.mobile_number}
          src={row.doctor.photo ?? ''}
          name={`Dr. ${row.doctor.first_name} ${row.doctor.last_name}`}
          description={row.doctor.email}
        />
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
      render: (type: Type) => (
        <>
          <p className="whitespace-nowrap font-medium text-gray-900">{type}</p>
          <p className="whitespace-nowrap font-medium text-gray-500">
            Reminder Sent
          </p>
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
        <>
          <StatusSelect id={row.id} selectItem={row.status} />
          {row.is_reschedule && (
            <Text className="text-xs font-medium text-gray-400">
              (Rescheduled)
            </Text>
          )}
        </>
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
      render: (status: number | string, row: RowValue) =>
        getPaymentStatusBadge(row?.payment?.status ?? 0),
    },
    {
      title: <HeaderCell title="Actions" />,
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
}: {
  row: RowValue;
  onDeleteItem: (id: number[]) => void;
  isOpen: boolean;
  setIsOpen: any;
  idAppointment: number | string;
  setIdAppointment: Dispatch<SetStateAction<number | string>>;
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
        view: <RescheduleAppointmentForm data={row} />,
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
        <Dropdown.Trigger>
          <ActionIcon variant="outline" rounded="full">
            <HiOutlineDotsVertical className="h-5 w-5" />
          </ActionIcon>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          {isShowCancel && (
            <Dropdown.Item>
              <Button
                className="flex w-full gap-3 hover:border-gray-700 hover:text-gray-700"
                variant="outline"
                onClick={() => cancelModal(row)}
              >
                <MdOutlineFreeCancellation className="h-4 w-4" />
                <span>Cancel</span>{' '}
              </Button>
            </Dropdown.Item>
          )}

          {isShowReschedule && (
            <Dropdown.Item>
              <Button
                className="flex w-full gap-3 hover:border-gray-700 hover:text-gray-700"
                variant="outline"
                onClick={() => rescheduleModal(row)}
              >
                <GrSchedules className="h-4 w-4" />
                <span>Reschedule</span>{' '}
              </Button>
            </Dropdown.Item>
          )}

          <Dropdown.Item>
            <Button
              className="flex w-full gap-3 hover:border-gray-700 hover:text-gray-700"
              variant="outline"
              onClick={() => revertModal(row)}
            >
              <RxCountdownTimer className="h-4 w-4" />
              <span>Revert Back</span>{' '}
            </Button>
          </Dropdown.Item>

          {isHasNote && (
            <Dropdown.Item>
              <Button
                className="flex w-full gap-3 hover:border-gray-700 hover:text-gray-700"
                variant="outline"
                onClick={showNoteModal}
              >
                <MdNotes className="h-4 w-4" />
                <span>Show Note</span>{' '}
              </Button>
            </Dropdown.Item>
          )}

          <Dropdown.Item>
            <Button
              className="flex w-full gap-3 hover:border-gray-700 hover:text-gray-700"
              variant="outline"
              onClick={addNotesModal}
            >
              <FaRegNoteSticky className="h-4 w-4" />
              <span>Add Note</span>{' '}
            </Button>
          </Dropdown.Item>

          <Dropdown.Item>
            <Button
              className="flex w-full gap-3 hover:border-gray-700 hover:text-gray-700"
              variant="outline"
              onClick={() =>
                openModal({
                  view: (
                    <AppointmentDetails data={row} onEdit={handleCreateModal} />
                  ),
                  customSize: '900px',
                })
              }
            >
              <EyeIcon className="h-4 w-4" />
              <span>View Appointment</span>{' '}
            </Button>
          </Dropdown.Item>

          <Dropdown.Item>
            <Button
              className="flex w-full gap-3 hover:border-gray-700 hover:text-gray-700"
              variant="outline"
              onClick={() => {
                setIdAppointment(row.id);
                setIsOpen(true);
              }}
            >
              <TrashIcon className="h-4 w-4" />
              <span>Delete Appointment</span>{' '}
            </Button>
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

function StatusSelect({ selectItem, id }: { selectItem: number; id: number }) {
  const { openModal, closeModal } = useModal();

  const showConfirmModal = (
    id: number,
    onClick: (value: number) => void,
    status: string
  ) => {
    closeModal(),
      openModal({
        view: <ShowConfirm onClick={onClick} status={status} id={id} />,
        customSize: '600px',
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
    <CSelect
      className={'min-w-[140px]'}
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
  );
}
