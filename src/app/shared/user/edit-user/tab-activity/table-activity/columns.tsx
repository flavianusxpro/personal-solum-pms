'use client';

import dayjs from 'dayjs';
import { PiCloudArrowDown } from 'react-icons/pi';
import { HeaderCell } from '@/app/shared/ui/table';
import { Checkbox, Title, Text, Button, Badge } from 'rizzui';
import { exportToCSV } from '@core/utils/export-to-csv';
import { billingHistoryData } from '@/data/billing-history';

function handleDownloadRowData(row: { [key: string]: any }) {
  exportToCSV([row], 'ID,Activity,Date', `activity_${row.id}`);
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
    title: <HeaderCell title="ID" />,
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
    title: <HeaderCell title="Activity" />,
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
    title: <HeaderCell title="Date" />,
    dataIndex: 'date',
    key: 'date',
    render: (value: Date) => (
      <Text className="mb-1 text-gray-700">
        {dayjs(value).format('DD MMM YYYY')}
      </Text>
    ),
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
