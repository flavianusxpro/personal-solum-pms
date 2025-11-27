'use client';

import DeletePopover from '@/app/shared/ui/delete-popover';
import { HeaderCell } from '@/app/shared/ui/table';
import { routes } from '@/config/routes';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import Link from 'next/link';
import { PiCopy } from 'react-icons/pi';
import {
  ActionIcon,
  Badge,
  Checkbox,
  SelectOption,
  Text,
  Tooltip,
} from 'rizzui';

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
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

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: number[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  handleCopy: (text: string | number) => void;
  dataSpecialistsOptions?: SelectOption[];
  isPermissionWriteDoctor?: boolean;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  handleCopy,
  dataSpecialistsOptions,
  isPermissionWriteDoctor = true,
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
    onCell: () => ({
    onClick: (e: any) => e.stopPropagation(), 
  }),
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
    title: <HeaderCell title="DOCTOR ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 120,
    render: (value: string) => <Text>#{value}</Text>,
  },
  {
    title: <HeaderCell title="NAME" />,
    dataIndex: 'name',
    key: 'name',
    width: 170,
    render: (_: any, row: any) => (
      <p className="flex items-center gap-2 font-medium text-gray-700">
        {`Dr. ${row.first_name} ${row.last_name}`}
      </p>
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
    title: <HeaderCell title="CONTACT" />,
    dataIndex: 'number',
    key: 'number',
    width: 150,
    render: (_: any, row: any) => (
      <>
        <p className="flex items-center gap-2 font-medium text-gray-700">
          {row.email || '-'}
          <PiCopy
            onClick={(e) => {
              e.stopPropagation()
              handleCopy(row.email)
            }}
            className="cursor-pointer active:scale-[0.99]"
          />
        </p>
        <p className="flex items-center gap-2 font-medium text-slate-400">
          {row.mobile_number || '-'}
          <PiCopy
            onClick={(e) => { 
              e.stopPropagation()
              handleCopy(row.mobile_number)
            }}
            className="cursor-pointer active:scale-[0.99]"
          />
        </p>
      </>
    ),
  },
  {
    title: <HeaderCell title="SPECIALIST" />,
    dataIndex: 'specialist_type',
    key: 'specialist_type',
    width: 150,
    render: (value: string) =>
      getSpecialistDoctor(value, dataSpecialistsOptions),
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div 
        className="flex items-center justify-end gap-3 pe-4"
        onClick={(e) => e.stopPropagation()}
      >
        {isPermissionWriteDoctor && (
          <Tooltip
            size="sm"
            content={'Edit Data Doctor'}
            placement="top"
            color="invert"
          >
            <Link href={routes.doctor.edit(row.id)}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:text-gray-700"
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
        )}

        <Tooltip
          size="sm"
          content={'View Data Doctor'}
          placement="top"
          color="invert"
        >
          <Link href={routes.doctor.doctorDetail(row.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        {isPermissionWriteDoctor && (
          <DeletePopover
            title={`Delete the doctor`}
            description={`Are you sure you want to delete this #${row.id} doctor?`}
            onDelete={() => onDeleteItem([row.id])}
          />
        )}
      </div>
    ),
  },
];

function getSpecialistDoctor(
  specialist: string | number[],
  dataSpecialistsOptions?: SelectOption[]
) {
  // specialist is like "[15]" or can be an array of numbers
  const parsedSpecialist: number[] =
    typeof specialist === 'string'
      ? (JSON.parse(specialist) as number[])
      : (specialist as number[]);

  if (
    !parsedSpecialist ||
    !Array.isArray(parsedSpecialist) ||
    parsedSpecialist.length === 0
  )
    return <Text>-</Text>;

  const specialistOptions = parsedSpecialist
    .slice(0, 2)
    .map((spec: number) =>
      dataSpecialistsOptions?.find((option) => option.value === spec)
    )
    .filter(Boolean) as SelectOption[];

  const hasMoreSpecialists = parsedSpecialist.length > 2;

  return (
    <div className="flex flex-col">
      {specialistOptions.map((specialistOption, index) => (
        <Text key={index} className="font-medium text-gray-700">
          {specialistOption?.label || '-'}
        </Text>
      ))}
      {hasMoreSpecialists && (
        <Text className="text-xs text-gray-500">
          +{parsedSpecialist.length - 2} more
        </Text>
      )}
    </div>
  );
}
