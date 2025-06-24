'use client';

import DeletePopover from '@/app/shared/ui/delete-popover';
import { HeaderCell } from '@/app/shared/ui/table';
import { routes } from '@/config/routes';
import { IGetApiKeyConnectionResponse } from '@/types/ApiResponse';
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

function getStatusBadge(status: boolean) {
  switch (status) {
    case true:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
        </div>
      );
    case false:
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

type Columns = {
  data: IGetApiKeyConnectionResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onChecked?: (id: string) => void;
  handleCopy: (text: string | number) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  handleSelectAll,
  onChecked,
  handleCopy,
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
    title: <HeaderCell title="API ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 120,
    render: (value: string) => <Text>#{value}</Text>,
  },
  {
    title: <HeaderCell title="HOSTNAME" />,
    dataIndex: 'hostname',
    key: 'hostname',
    width: 170,
    render: (value: string | null) => value || '-',
  },
  {
    title: <HeaderCell title="NAME" />,
    dataIndex: 'name',
    key: 'name',
    width: 170,
    render: (value: string | null) => value || '-',
  },
  {
    title: <HeaderCell title="STATUS" />,
    dataIndex: 'status',
    key: 'status',
    width: 150,
    render: (value: boolean) => getStatusBadge(value),
  },
  {
    title: <HeaderCell title="TOKEN" />,
    dataIndex: 'token',
    key: 'token',
    width: 200,
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <Text className="max-w-xl overflow-hidden text-ellipsis font-mono text-gray-700">
          {value}
        </Text>
        <ActionIcon
          size="sm"
          variant="outline"
          onClick={() => handleCopy(value)}
          className="hover:text-gray-700"
        >
          <PiCopy className="h-4 w-4" />
        </ActionIcon>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <></>
      // <div className="flex items-center justify-end gap-3 pe-4">
      //   <Tooltip
      //     size="sm"
      //     content={'View Data Doctor'}
      //     placement="top"
      //     color="invert"
      //   >
      //     <Link href={routes.doctor.doctorDetail(row.id)}>
      //       <ActionIcon
      //         as="span"
      //         size="sm"
      //         variant="outline"
      //         className="hover:text-gray-700"
      //       >
      //         <EyeIcon className="h-4 w-4" />
      //       </ActionIcon>
      //     </Link>
      //   </Tooltip>
      // </div>
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
