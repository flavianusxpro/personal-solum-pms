'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import { PiCloudArrowDown } from 'react-icons/pi';
import { HeaderCell } from '@/app/shared/ui/table';
import { Checkbox, Title, Text, Button, Badge } from 'rizzui';
import { exportToCSV } from '@core/utils/export-to-csv';
import { billingHistoryData } from '@/data/billing-history';

const statusColors: any = {
  'In Progress': 'info',
  Paid: 'success',
  Canceled: 'secondary',
  'On hold': 'danger',
};

function handleDownloadRowData(row: { [key: string]: any }) {
  exportToCSV(
    [row],
    'Title,Amount,Date,Status,Shared',
    `billing_history_${row.id}`
  );
}

type Columns = {
  data: any;
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
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
    render: (_: any, row: (typeof billingHistoryData)[number]) => (
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
    title: <HeaderCell title="Invoice Number" />,
    dataIndex: 'title',
    key: 'title',
    render: (_: any, row: (typeof billingHistoryData)[number]) => {
      return (
        <Title as="h6" className="mb-0.5 !text-sm font-medium text-gray-700">
          {row.id}
        </Title>
      );
    },
  },
  {
    title: <HeaderCell title="Invoice Date" />,
    dataIndex: 'date',
    key: 'date',
    render: (value: Date) => (
      <Text className="mb-1 text-gray-700">
        {dayjs(value).format('DD MMM YYYY')}
      </Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Status"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'dueDate'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('status'),
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => getStatusBadge(status),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    render: (_: string, row: any) => (
      <Button
        variant="text"
        onClick={() => handleDownloadRowData(row)}
        className="flex w-full items-center justify-start px-4 py-2.5 focus:outline-none"
      >
        <PiCloudArrowDown className="h-6 w-6 text-gray-500" />
      </Button>
    ),
  },
];

function getStatusBadge(status: number | string) {
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
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
        </div>
      );
    case 1:
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
