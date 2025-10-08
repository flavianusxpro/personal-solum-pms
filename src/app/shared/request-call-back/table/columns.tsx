'use client';

import { HeaderCell } from '@/app/shared/ui/table';
import { IGetRequestCallbackResponse } from '@/types/ApiResponse';
import EyeIcon from '@core/components/icons/eye';
import DateCell from '@core/ui/date-cell';
import { ActionIcon, Badge, Checkbox, Flex, Text, Tooltip } from 'rizzui';
import CreateEditModal from '../modal/create-edit-modal';
import AvatarCard from '@/core/ui/avatar-card';
import CSelect from '@/app/shared/ui/select';
import { useState } from 'react';
import { useUpdateRequestCallback } from '@/hooks/useRequestCallback';
import toast from 'react-hot-toast';
import { requestStatusOptions } from './filter-element';

const requestCallbackStatusOptions = [
  { label: 'Waiting for Call', value: 'waiting_for_call' },
  { label: 'Already Called', value: 'already_called' },
  { label: 'No Answer', value: 'no_answer' },
];

type Columns = {
  data: IGetRequestCallbackResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  openModal: (props: any) => void;
};

type Row = IGetRequestCallbackResponse['data'][number];

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  openModal,
}: Columns) => [
  {
    title: (
      <div className="ps-2">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-2">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 100,
    render: (value: number) => value,
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (_: string, row: Row) => (
      <AvatarCard
        name={row.patient_Name}
        src={row.patient_Name}
        description={row.patient_email}
        number={row.patient_phone}
      />
    ),
  },
  {
    title: <HeaderCell title="DATE" />,
    dataIndex: 'patient_preferred_time',
    key: 'patient_preferred_time',
    width: 100,
    render: (value: Date) => <DateCell clock date={value} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 150,
    render: (value: string, row: Row) => (
      <StatusSelect id={row.id} selectItem={value} />
    ),
  },
  {
    title: <HeaderCell title="Reason" />,
    dataIndex: 'patient_reason',
    key: 'patient_reason',
    width: 100,
    render: (value: string) => (
      <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
        {value}
      </div>
    ),
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: Row) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'View Request'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            onClick={() =>
              openModal({
                view: <CreateEditModal isView data={row} />,
              })
            }
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
      </div>
    ),
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'already_called':
      return (
        <Flex gap="1" align="center">
          <Badge color="success" renderAsDot />
          <Text className="font-medium text-green-dark">Already Called</Text>
        </Flex>
      );
    case 'waiting_for_call':
      return (
        <Flex gap="1" align="center">
          <Badge color="warning" renderAsDot />
          <Text className="font-medium text-yellow-600">Waiting for Call</Text>
        </Flex>
      );

    case 'new':
      return (
        <Flex gap="1" align="center">
          <Badge color="primary" renderAsDot />
          <Text className="font-medium text-green-dark">New</Text>
        </Flex>
      );
    case 'scheduled':
      return (
        <Flex gap="1" align="center">
          <Badge color="warning" renderAsDot />
          <Text className="font-medium text-yellow-600">Schedule</Text>
        </Flex>
      );
    case 'in-progress':
      return (
        <Flex gap="1" align="center">
          <Badge color="danger" renderAsDot />
          <Text className="font-medium text-red-dark">In Progress</Text>
        </Flex>
      );
    case 'completed':
      return (
        <Flex gap="1" align="center">
          <Badge color="success" renderAsDot />
          <Text className="font-medium text-red-dark">Completed</Text>
        </Flex>
      );
    case 'no_answer':
      return (
        <Flex gap="1" align="center">
          <Badge color="danger" renderAsDot />
          <Text className="font-medium text-red-dark">No Answer</Text>
        </Flex>
      );

    case 'cancelled':
      return (
        <Flex gap="1" align="center">
          <Badge color="danger" renderAsDot />
          <Text className="font-medium text-red-dark">Cancelled</Text>
        </Flex>
      );
    case 'closed':
      return (
        <Flex gap="1" align="center">
          <Badge color="info" renderAsDot />
          <Text className="font-medium text-green-dark">Closed</Text>
        </Flex>
      );
    default:
      return (
        <Flex gap="1" align="center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="font-medium text-gray-600">{status}</Text>
        </Flex>
      );
  }
}

function StatusSelect({ selectItem, id }: { selectItem: string; id: number }) {
  const selectItemValue = requestCallbackStatusOptions.find(
    (option) => option.value === selectItem
  )?.value;
  const [value, setValue] = useState(selectItemValue);

  const { mutate, isPending } = useUpdateRequestCallback();

  const handleChange = (value: string) => {
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
      options={requestStatusOptions}
      value={value}
      onChange={handleChange}
      isLoading={isPending}
      displayValue={(option: { value: string }) =>
        getStatusBadge(option?.value)
      }
    />
  );
}
