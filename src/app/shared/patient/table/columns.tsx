'use client';

import Link from 'next/link';
import { Badge, Text, ActionIcon, Checkbox, Dropdown, Button } from 'rizzui';
import { routes } from '@/config/routes';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import DeletePopover from '@/app/shared/ui/delete-popover';
import { IGetAllPatientsResponse } from '@/types/ApiResponse';
import { HeaderCell } from '@/app/shared/ui/table';
import CSelect from '../../ui/select';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useUpdatePatient } from '@/hooks/usePatient';
import { PiFlag } from 'react-icons/pi';
import { useModal } from '../../modal-views/use-modal';
import RedFlagForm from '../modal/red-flag';
import { HiOutlineDotsVertical } from "react-icons/hi"

const statusOptions = [
  { label: 'Active', value: 1 },
  { label: 'Inactive', value: 2 },
];

type Row = IGetAllPatientsResponse['data'][number];

type Columns = {
  data: IGetAllPatientsResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: number[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
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
      render: (_: any, row: Row) => (
        <div className="inline-flex ps-2">
          <Checkbox
            className="cursor-pointer"
            checked={checkedItems.includes(row.id.toString())}
            {...(onChecked && { onChange: () => onChecked(row.id.toString()) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="PATIENT ID" />,
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (value: string) => <Text>#{value}</Text>,
    },
    {
      title: <HeaderCell title="PATIENT NAME" />,
      dataIndex: 'PATIENT NAME',
      key: 'PATIENT NAME',
      width: 300,
      render: (_: any, row: Row) => (
        <AvatarCard
          src={row.photo || ''}
          name={`${row.first_name} ${row.last_name}`}
          number={row.mobile_number}
          description={row.email.toLowerCase()}
        />
      ),
    },
    {
      title: <HeaderCell title="GENDER" />,
      dataIndex: 'gender',
      key: 'gender',
      width: 150,
      render: (value: string) => (
        <Text className="font-medium capitalize text-gray-700">
          {value?.toLowerCase() ?? '-'}
        </Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="BIRTH DATE"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'date_of_birth'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('date_of_birth'),
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      width: 200,
      render: (value: Date) => <DateCell date={value} />,
    },
    {
      title: (
        <HeaderCell
          title="LAST APPOINTMENT"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('created_at'),
      dataIndex: 'created_at',
      key: 'created_at',
      width: 200,
      render: (value: Date) => <DateCell clock={true} date={value} />,
    },
    {
      title: (
        <HeaderCell
          title="Modified"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'updated_at'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('updated_at'),
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 200,
      render: (value: Date) => <DateCell clock={true} date={value} />,
    },
    {
      title: <HeaderCell title="Status" />,
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (value: number, row: Row) => (
        <StatusSelect selectItem={value || 1} id={row?.patient_id} />
      ),
    },
    {
      // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
      title: <HeaderCell title="Actions" />,
      dataIndex: 'action',
      key: 'action',
      width: 130,
      render: (_: any, row: Row) => (
        <RenderAction row={row} onDeleteItem={onDeleteItem} />
      ),
    },
  ];

function RenderAction({
  row,
  onDeleteItem,
}: {
  row: Row;
  onDeleteItem: (id: number[]) => void;
}) {
  const { openModal, closeModal } = useModal();

  function handleRedFlagModal() {
    closeModal(),
      openModal({
        view: <RedFlagForm patient_id={row.id} />,
        customSize: '600px',
      });
  }

  return (
    <Dropdown placement='bottom-end'>
      <Dropdown.Trigger>
        <ActionIcon
          variant="outline"
          rounded="full"
        >
          <HiOutlineDotsVertical className="h-5 w-5" />
        </ActionIcon>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={handleRedFlagModal}
          className="flex items-center gap-2"
        >
          <PiFlag className="h-4 w-4 text-red-500" />
          <span>Red Flag Patient</span>
        </Dropdown.Item>

        <Dropdown.Item className="p-0">
          <Link
            href={routes.patient.edit(row?.patient_id?.toString())}
            className="flex items-center gap-2 px-2 py-1 w-full"
          >
            <PencilIcon className="h-4 w-4" />
            <span>Edit Data Patient</span>
          </Link>
        </Dropdown.Item>

        <Dropdown.Item className="p-0">
          <Link
            href={routes.patient.edit(row?.patient_id?.toString())}
            className="flex items-center gap-2 px-2 py-1 w-full"
          >
            <EyeIcon className="h-4 w-4" />
            <span>View Data Patient</span>
          </Link>
        </Dropdown.Item>

        <Dropdown.Item className="p-0">
          <DeletePopover
            title={`Delete the Patient`}
            description={`Are you sure you want to delete this #${row.id} Patient?`}
            onDelete={() => onDeleteItem([row?.id])}
          />
          <span>
            Delete the Patient
          </span>
        </Dropdown.Item>
      </Dropdown.Menu>

    </Dropdown>

    // <div className="flex items-center justify-end gap-3 pe-4">
    //   <ActionTooltipButton
    //     onClick={handleRedFlagModal}
    //     variant="outline"
    //     tooltipContent="Red Flag Patient"
    //   >
    //     <PiFlag className="h-4 w-4 text-red-500" />
    //   </ActionTooltipButton>

    //   <ActionTooltipButton
    //     tooltipContent="Edit Data Patient"
    //     onClick={() => {}}
    //     variant="outline"
    //   >
    //     <Link href={routes.patient.edit(row?.patient_id?.toString())}>
    //       <PencilIcon className="h-4 w-4" />
    //     </Link>
    //   </ActionTooltipButton>

    //   <ActionTooltipButton
    //     tooltipContent="View Data Patient"
    //     onClick={() => {}}
    //     variant="outline"
    //   >
    //     <Link href={routes.patient.patientDetail(row?.patient_id?.toString())}>
    //       <EyeIcon className="h-4 w-4" />
    //     </Link>
    //   </ActionTooltipButton>

    //   <DeletePopover
    //     title={`Delete the Patient`}
    //     description={`Are you sure you want to delete this #${row.id} Patient?`}
    //     onDelete={() => onDeleteItem([row?.id])}
    //   />
    // </div>
  );
}

function getStatusBadge(status: number) {
  switch (status) {
    case 1:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Inactive</Text>
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

function StatusSelect({ selectItem, id }: { selectItem: number; id: string }) {
  const selectItemValue = statusOptions.find(
    (option) => option.value === selectItem
  )?.value;

  const [value, setValue] = useState(selectItemValue);

  const { mutate, isPending } = useUpdatePatient();

  const handleChange = (value: number) => {
    mutate(
      { patient_id: id, status: value },
      {
        onSuccess: () => {
          setValue(value);
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
      className={'min-w-[120px]'}
      dropdownClassName="h-auto"
      placeholder="Select Status"
      options={statusOptions}
      value={value}
      onChange={handleChange}
      isLoading={isPending}
      displayValue={(option: { label: string; value: number }) =>
        getStatusBadge(option.value)
      }
    />
  );
}
