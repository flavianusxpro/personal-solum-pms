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
} from 'rizzui';
import EyeIcon from '@core/components/icons/eye';
import DeletePopover from '@/app/shared/ui/delete-popover';
import { Type } from '@/data/appointment-data';
import { useModal } from '@/app/shared/modal-views/use-modal';
import AppointmentDetails from './appointment-details';
import AvatarCard from '@core/ui/avatar-card';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import dayjs from 'dayjs';
import ActionTooltipButton from '@/app/shared/ui/action-tooltip-button';
import PencilIcon from '@/core/components/icons/pencil';
import CSelect from '@/app/shared/ui/select';
import { useState } from 'react';
import { useUpdateAppointment } from '@/hooks/useAppointment';
import toast from 'react-hot-toast';
import CreateUpdateAppointmentForm from '../../modal/appointment-form';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';
import { FaRegNoteSticky } from 'react-icons/fa6';
import { GrSchedules } from 'react-icons/gr';
import { RxCountdownTimer } from 'react-icons/rx';
import { MdOutlineFreeCancellation } from 'react-icons/md';
import AddNotesForm from '../../modal/add-notes';
import CancelForm from '../../modal/cancel-form';
import RescheduleAppointmentForm from '../../modal/reschedule';
import RevertForm from '../../modal/revert-form';

const statusOptions = [
  { label: 'Draft', value: 1 },
  { label: 'Pending', value: 2 },
  { label: 'Confirmed', value: 3 },
  { label: 'Finished', value: 4 },
  { label: 'Cancelled', value: 5 },
  { label: 'Rescheduled', value: 6 },
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
};

export const GetColumns = ({
  handleSelectAll,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  data,
  checkedItems,
  onChecked,
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
      render: (_: any, row: IGetAppointmentListResponse['data'][number]) => (
        <div className="inline-flex ps-3.5">
          <Checkbox
            aria-label={'ID'}
            className="cursor-pointer"
            checked={checkedItems.includes(row.id.toString())}
            {...(onChecked && { onChange: () => onChecked(row.id.toString()) })}
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
          warning={row.note}
        />
      ),
    },
    {
      title: <HeaderCell title="Date" />,
      dataIndex: 'date',
      key: 'date',
      width: 250,
      render: (createdDate: Date) =>
        dayjs(createdDate).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: <HeaderCell title="Appointment To" />,
      // onHeaderCell: () => onHeaderCellClick('doctor.name'),
      dataIndex: 'doctor',
      key: 'doctor',
      width: 320,
      render: (doctorId: string, row: RowValue) => (
        <AvatarCard
          number={row.doctor.mobile_number}
          src={row.doctor.photo ?? ''}
          name={`${row.doctor.first_name} ${row.doctor.last_name}`}
          description={row.doctor.email}
        />
      ),
    },
    {
      title: (
        <HeaderCell
          title="APPOINTMENT TYPE"
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
      title: <HeaderCell title="APPOINT STATUS" />,
      onHeaderCell: () => onHeaderCellClick('status'),
      dataIndex: 'status',
      key: 'status',
      width: 260,
      render: (value: number, row: RowValue) => (
        <>
          {getScheduleStatusBadge(value)}
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
      render: (status: number | string, row: RowValue) => (
        <StatusSelect id={row.id} selectItem={row.status} />
      ),
    },
    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, row: any) => (
        <RenderAction row={row} onDeleteItem={onDeleteItem} />
      ),
    },
  ];
};

function RenderAction({
  row,
  onDeleteItem,
}: {
  row: RowValue;
  onDeleteItem: (id: number[]) => void;
}) {
  const { openModal, closeModal } = useModal();

  const isShowCancel = [1, 2, 3].includes(row.status);

  const isShowReschedule = [3].includes(row.status);

  function handleCreateModal() {
    closeModal(),
      openModal({
        view: <CreateUpdateAppointmentForm />,
        customSize: '600px',
      });
  }

  function handleEditModal(row: RowValue) {
    closeModal(),
      openModal({
        view: <CreateUpdateAppointmentForm data={row} />,
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
          <Tooltip size="sm" content={'Actions'} placement="top" color="invert">
            <ActionIcon
              as="span"
              aria-label={'Actions'}
              className="hover:!border-gray-900 hover:text-gray-700"
              size="sm"
              variant="outline"
              rounded="md"
            >
              <HiOutlineAdjustmentsVertical className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>
        </Dropdown.Trigger>
        <Dropdown.Menu className="divide-y">
          <Dropdown.Item onClick={addNotesModal}>
            <FaRegNoteSticky className="mr-2 h-4 w-4" />
            Add Notes
          </Dropdown.Item>
          {isShowReschedule && (
            <Dropdown.Item onClick={() => rescheduleModal(row)}>
              <GrSchedules className="mr-2 h-4 w-4" />
              Reschedule
            </Dropdown.Item>
          )}

          {isShowCancel && (
            <Dropdown.Item onClick={() => cancelModal(row)}>
              <MdOutlineFreeCancellation className="mr-2 h-4 w-4" />
              Cancel
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={() => revertModal(row)}>
            <RxCountdownTimer className="mr-2 h-4 w-4" />
            Revert Back
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <ActionTooltipButton
        tooltipContent="Edit Appointment"
        variant="outline"
        onClick={() => handleEditModal(row)}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionTooltipButton>

      <Tooltip
        size="sm"
        content={'View Appointment'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'View Appointment'}
          className="hover:!border-gray-900 hover:text-gray-700"
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
        </ActionIcon>
      </Tooltip>
      <DeletePopover
        title={`Delete the appointment`}
        description={`Are you sure you want to delete this #${row.id} appointment?`}
        onDelete={() => onDeleteItem([row.id])}
      />
    </div>
  );
}

export function getPaymentStatusBadge(status: number | string) {
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
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

function getScheduleStatusBadge(status: number | string) {
  switch (status) {
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
          <Text className="font-medium text-green-dark">Finished</Text>
        </Flex>
      );
    case 3:
      return (
        <Flex gap="1" align="center">
          <Badge color="info" renderAsDot />
          <Text className="font-medium text-blue-500">Confirmed</Text>
        </Flex>
      );
    case 2:
      return (
        <Flex gap="1" align="center">
          <Badge color="warning" renderAsDot />
          <Text className="font-medium text-yellow-600">Pending</Text>
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
  const selectItemValue = statusOptions.find(
    (option) => option.value === selectItem
  )?.value;
  const [value, setValue] = useState(selectItemValue);

  const { mutate, isPending } = useUpdateAppointment();

  const handleChange = (value: number) => {
    setValue(value);
    mutate(
      { id, status: value },
      {
        onSuccess: () => {
          toast.success('Status updated successfully');
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Error updating status'
          );
        },
      }
    );
  };

  return (
    <CSelect
      className={'min-w-[140px]'}
      dropdownClassName="h-auto"
      placeholder="Select Status"
      options={statusOptions}
      value={value}
      onChange={handleChange}
      isLoading={isPending}
      displayValue={(option: { value: number }) =>
        getScheduleStatusBadge(option.value)
      }
    />
  );
}
