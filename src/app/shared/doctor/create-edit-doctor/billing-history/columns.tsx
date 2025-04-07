'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import { PiCloudArrowDown } from 'react-icons/pi';
import { HeaderCell } from '@/app/shared/table';
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
  data: typeof billingHistoryData;
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
          checked={checkedItems.length === data.length}
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
    title: <HeaderCell title="Total Appointment in Last 30 Days" />,
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
    title: <HeaderCell title="Total Upcoming Appointment" />,
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
    title: <HeaderCell title="Total Cancelation" />,
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
    title: <HeaderCell title="Today Appointment" />,
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
