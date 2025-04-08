'use client';

import { HeaderCell } from '@/app/shared/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select, Badge } from 'rizzui';
import EyeIcon from '@core/components/icons/eye';
import DeletePopover from '@/app/shared/delete-popover';
import DateCell from '@core/ui/date-cell';
import { Type } from '@/data/appointment-data';
import { useState } from 'react';
import { PiCheckCircleBold, PiClockBold, PiCopy } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CreateUpdateAppointmentForm from '../appointment-form';
import AppointmentDetails from './appointment-details';
import AvatarCard from '@core/ui/avatar-card';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';

const statusOptions = [
  { label: 'Waiting', value: 'Waiting' },
  { label: 'Scheduled', value: 'Scheduled' },
];

type Columns = {
  data?: IGetAppointmentListResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
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
      dataIndex: 'patientId',
      key: 'patientId',
      width: 250,
      render: (patient: string) => (
        <AvatarCard
          src={'https://randomuser.me/api/portraits'}
          name={'Default Name'}
          // Removed the number property as it is not defined in AvatarCardProps
          description={'Default Email'}
        />
      ),
    },
    {
      title: <HeaderCell title="Date" />,
      dataIndex: 'date',
      key: 'date',
      width: 250,
      render: (createdDate: Date) => <DateCell date={createdDate} />,
    },
    {
      title: <HeaderCell title="Appointment To" />,
      // onHeaderCell: () => onHeaderCellClick('doctor.name'),
      dataIndex: 'doctorId',
      key: 'doctorId',
      width: 320,
      render: (doctorId: string) => (
        <Text>{doctorId}</Text>
        // <AvatarCard
        //   number={doctorId}
        //   src={'https://randomuser.me/api/portraits'}
        //   name={doctorId}
        //   description={doctorId}
        // />
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
      width: 250,
      render: (value: string) => getScheduleStatusBadge(value),
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
      render: (status: number | string) => getPaymentStatusBadge(status),
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
  row: any;
  onDeleteItem: (id: string) => void;
}) {
  const { openModal, closeModal } = useModal();
  function handleCreateModal() {
    closeModal(),
      openModal({
        view: <CreateUpdateAppointmentForm />,
        customSize: '700px',
      });
  }
  return (
    <div className="flex items-center justify-end gap-3 pe-3">
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
                <AppointmentDetails
                  data={row}
                  onDelete={() => onDeleteItem(row.id)}
                  onEdit={handleCreateModal}
                />
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
        onDelete={() => onDeleteItem(row.id)}
      />
    </div>
  );
}

function getPaymentStatusBadge(status: number | string) {
  switch (status) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Paid</Text>
        </div>
      );
    case 1:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Unpaid</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

function getScheduleStatusBadge(status: number | string) {
  switch (status) {
    case 2:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-yellow-600">{status}</Text>
        </div>
      );
    case 3:
      return (
        <div className="items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Paid</Text>
          <p className={`whitespace-nowrap font-medium text-gray-700`}>
            Reschedule From Previous Date
          </p>
        </div>
      );
    case 'Cancelled':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Unpaid</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-blue-600">{status}</Text>
        </div>
      );
  }
}
