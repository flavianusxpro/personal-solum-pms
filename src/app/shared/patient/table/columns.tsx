'use client';

import Link from 'next/link';
import { Badge, Text, ActionIcon, Checkbox, Dropdown, Button } from 'rizzui';
import { routes } from '@/config/routes';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { IGetAllPatientsResponse } from '@/types/ApiResponse';
import { HeaderCell } from '@/app/shared/ui/table';
import CSelect from '../../ui/select';
import toast from 'react-hot-toast';
import { Dispatch, SetStateAction, useState } from 'react';
import { useUpdatePatient } from '@/hooks/usePatient';
import { PiFlag } from 'react-icons/pi';
import { useModal } from '../../modal-views/use-modal';
import RedFlagForm from '../modal/red-flag';
import { HiOutlineDotsVertical } from "react-icons/hi"
import DeleteModal from '../../ui/delete-modal';
import TrashIcon from '@/core/components/icons/trash';

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
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  idPatient: number | string;
  setIdPatient: Dispatch<SetStateAction<number | string>>;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  isOpen,
  setIsOpen,
  idPatient,
  setIdPatient
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
      title: <HeaderCell title="Actions" />,
      dataIndex: 'action',
      key: 'action',
      width: 130,
      render: (_: any, row: Row) => (
        <div className="flex items-center justify-center gap-3 pe-4">
          <RenderAction
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            row={row}
            onDeleteItem={onDeleteItem}
            idPatient={idPatient}
            setIdPatient={setIdPatient}
          />
        </div>
      ),
    },
  ];

function RenderAction({
  row,
  onDeleteItem,
  isOpen,
  setIsOpen,
  idPatient,
  setIdPatient,
}: {
  row: Row;
  onDeleteItem: (id: number[]) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  idPatient: number | string;
  setIdPatient: Dispatch<SetStateAction<number | string>>;
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
    <>
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
          <div className="mb-2 flex items-center gap-2">
            <Button
              className="hover:border-gray-700 w-full hover:text-gray-700"
              variant='outline'
              onClick={handleRedFlagModal}
            >
              <PiFlag className="h-4 w-4 text-red-500" />
              <span>Red Flag Patient</span>{" "}
            </Button>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <Button
              className="hover:border-gray-700 w-full hover:text-gray-700"
              variant='outline'
              onClick={() => {
                <Link href={routes.patient.edit(row?.patient_id?.toString())} />
              }}
            >
              <PencilIcon className="h-4 w-4" />
              <span>Edit Data Patient</span>
            </Button>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <Button
              className="hover:border-gray-700 w-full hover:text-gray-700"
              variant='outline'
              onClick={() => {
                <Link href={routes.patient.edit(row?.patient_id?.toString())} />
              }}
            >
              <EyeIcon className="h-4 w-4" />
              <span>View Data Patient</span>
            </Button>
          </div>

          <div className="flex items-center justify-center">
            <Button
              className="hover:border-gray-700 w-full hover:text-gray-700"
              variant='outline'
              onClick={() => {
                setIdPatient(row.id)
                setIsOpen(true)
              }}
            >
              <TrashIcon className="h-4 w-4" />
              <span>Delete Patient</span>{" "}
            </Button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Delete the patient`}
        description={`Are you sure you want to delete this #${idPatient} patient?`}
        onDelete={() => onDeleteItem([Number(idPatient)])}
      />
    </>
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
