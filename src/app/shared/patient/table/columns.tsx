'use client';

import Link from 'next/link';
import { HeaderCell } from '@/app/shared/table';
import { Badge, Text, Tooltip, ActionIcon, Checkbox } from 'rizzui';
import { routes } from '@/config/routes';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import TableAvatar from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { IGetAllPatientsResponse } from '@/types/ApiResponse';

function getStatusBadge(status: number | string) {
  switch (status) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 1:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
        </div>
      );
    case 0:
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
  data: IGetAllPatientsResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
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
    render: (_: any, row: IGetAllPatientsResponse['data'][number]) => (
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
    dataIndex: 'patient_id',
    key: 'patient_id',
    width: 120,
    render: (value: string) => <Text>#{value}</Text>,
  },
  {
    title: <HeaderCell title="PATIENT NAME" />,
    dataIndex: 'PATIENT NAME',
    key: 'PATIENT NAME',
    width: 300,
    render: (_: any, row: IGetAllPatientsResponse['data'][number]) => (
      <TableAvatar
        src={''}
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
      <Text className="font-medium text-gray-700">{value}</Text>
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
  // TODO
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
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: IGetAllPatientsResponse['data'][number]) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Data Patient'}
          placement="top"
          color="invert"
        >
          <Link href={routes.patient.edit(row.patient_id.toString())}>
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
        {/* <Tooltip
          size="sm"
          content={'View Data Patient'}
          placement="top"
          color="invert"
        >
          <Link
            href={routes.forms.profileSettings}
            onClick={() => {
              localStorage.setItem('role', 'patient');
            }}
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip> */}
        <DeletePopover
          title={`Delete the Patient`}
          description={`Are you sure you want to delete this #${row.id} Patient?`}
          onDelete={() => onDeleteItem(row.id.toString())}
        />
      </div>
    ),
  },
];

export const getWidgetColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: (
      <HeaderCell
        title="Patient ID"
        className="ps-4 [&>div]:whitespace-nowrap"
      />
    ),
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string, row: IGetAllPatientsResponse['data'][number]) => (
      <Link
        href={routes.patient.edit(row.id.toString())}
        className="ps-4 hover:text-gray-900 hover:underline"
      >
        #{value}
      </Link>
    ),
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'customer',
    key: 'customer',
    width: 300,
    render: (_: any, row: IGetAllPatientsResponse['data'][number]) => (
      <TableAvatar
        src={''}
        name={row.first_name + ' ' + row.last_name}
        number={''}
        description={row.email.toLowerCase()}
      />
    ),
  },
  {
    title: <HeaderCell title="Items" />,
    dataIndex: 'items',
    key: 'items',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Price"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">${value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (createdAt: Date) => <DateCell date={createdAt} />,
  },
  {
    title: (
      <HeaderCell
        title="Modified"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'updatedAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: IGetAllPatientsResponse['data'][number]) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Patient'}
          placement="top"
          color="invert"
        >
          <Link
            href={routes.patient.edit(row.patient_id.toString())}
            onClick={() => {
              localStorage.setItem('role', 'doctor');
            }}
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Patient'}
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Patient'}
          placement="top"
          color="invert"
        >
          <Link
            href={routes.patient.patientDetail(row.id.toString())}
            onClick={() => {
              localStorage.setItem('role', 'patient');
            }}
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'View Patient'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the patient`}
          description={`Are you sure you want to delete this #${row.id} patient?`}
          onDelete={() => onDeleteItem(row.id.toString())}
        />
      </div>
    ),
  },
];
