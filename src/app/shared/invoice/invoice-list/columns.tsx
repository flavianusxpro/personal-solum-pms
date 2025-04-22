'use client';

import Link from 'next/link';
// import { type Invoice } from '@/data/invoice-data';
import { routes } from '@/config/routes';
import { Text, Badge, Tooltip, Checkbox, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/app/shared/ui/table';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import DeletePopover from '@/app/shared/ui/delete-popover';
import DateCell from '@core/ui/date-cell';
import TableAvatar from '@core/ui/avatar-card';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';

type IRowType = IGetAppointmentListResponse['data'][number];

function getPaymentStatusBadge(status: number) {
  switch (status) {
    case 1:
      return (
        <div className="flex items-center">
          <Badge color="secondary" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">Draft</Text>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot />
          <Text className="text-gray-dark ms-2 font-medium">Open</Text>
        </div>
      );
    case 3:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Paid</Text>
        </div>
      );
    case 4:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="text-gray-dark ms-2 font-medium">Void</Text>
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
  data: IGetAppointmentListResponse['data'];
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
    title: <HeaderCell title="INVOICE ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 450,
    render: (id: string) => <p className="w-max">#{id}</p>,
  },
  {
    title: <HeaderCell title="PATIENT NAME" />,
    dataIndex: 'patien',
    key: 'patien',
    render: (_: string, row: IRowType) => (
      <TableAvatar
        src={row?.patient?.photo || ''}
        name={`${row?.patient?.first_name} ${row?.patient?.last_name}`}
        description={row.patient?.email}
      />
    ),
  },
  {
    title: <HeaderCell title="TOTAL" />,
    dataIndex: 'total_amount',
    key: 'total_amount',
    width: 250,
    render: (value: string) => `$${value}`,
  },
  {
    title: <HeaderCell title="PAYMENT STATUS" />,
    dataIndex: 'status',
    key: 'status',
    width: 650,
    render: (value: number) => getPaymentStatusBadge(value),
  },
  {
    title: <HeaderCell title="CREATED BY" />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 600,
    render: (created_at: Date) => <DateCell clock date={created_at} />,
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 140,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip
          size="sm"
          content={'Edit Invoice'}
          placement="top"
          color="invert"
        >
          <Link href={routes.invoice.edit(row.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Invoice'}
          placement="top"
          color="invert"
        >
          <Link href={routes.invoice.details(row.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the invoice`}
          description={`Are you sure you want to delete this #${row.id} invoice?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
