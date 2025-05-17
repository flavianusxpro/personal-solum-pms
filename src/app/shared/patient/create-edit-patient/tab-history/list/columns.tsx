'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import { PiPencil, PiShareFat, PiTrashSimple } from 'react-icons/pi';
import { Title, Text, Checkbox, ActionIcon, Tooltip } from 'rizzui';
import { HeaderCell } from '@/app/shared/ui/table';
import Favorite from '@/app/shared/ui/file/favorite';
import ActionTooltipButton from '@/app/shared/ui/action-button';

type Columns = {
  data: any[];
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
          className="cursor-pointer"
          checked={checkedItems.length === data.length}
          onChange={handleSelectAll}
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 40,
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
    title: <HeaderCell title="Name" />,
    dataIndex: 'file',
    key: 'file',
    width: 420,
    render: (file: any, row: any) => (
      <div className="flex items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
          <Image
            src={file.avatar}
            className="aspect-square"
            width={26}
            height={26}
            alt=""
          />
        </div>
        <div className="ml-3 rtl:ml-0 rtl:mr-3">
          <Title as="h6" className="mb-0.5 !text-sm font-medium">
            {file.name}
          </Title>
        </div>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Size" />,
    dataIndex: 'size',
    key: 'size',
    width: 130,
    render: (value: any) => <span className="text-gray-500">{value}</span>,
  },
  {
    title: <HeaderCell title="Type" />,
    dataIndex: 'type',
    key: 'type',
    width: 130,
    render: (value: any) => (
      <span className="capitalize text-gray-500">{value}</span>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Uploaded"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'dueDate'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('modified'),
    dataIndex: 'modified',
    key: 'modified',
    width: 200,
    render: (value: Date) => (
      <>
        <Text className="mb-1 text-gray-500">
          {dayjs(value).format('DD MMM YYYY')}
        </Text>
      </>
    ),
  },
];
