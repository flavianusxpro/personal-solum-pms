'use client';

import dayjs from 'dayjs';
import { Text, Checkbox, ModalSize } from 'rizzui';
import { HeaderCell } from '@/app/shared/ui/table';
import ActionTooltipButton from '@/app/shared/ui/action-button';
import PencilIcon from '@/core/components/icons/pencil';
import DeletePopover from '@/app/shared/ui/delete-popover';
import { IGetPatientFlagResponse } from '@/types/ApiResponse';
import FlagForm from '../modal/add-flag';

type Row = IGetPatientFlagResponse['data'][number];
type Columns = {
  data: IGetPatientFlagResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  openModal?: ({
    view,
    customSize,
    size,
  }: {
    view: React.ReactNode;
    customSize?: string;
    size?: ModalSize;
  }) => void;
};

export const getColumns = ({
  data,
  checkedItems,
  onDeleteItem,
  handleSelectAll,
  onChecked,
  openModal,
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
    title: <HeaderCell title="Category" />,
    dataIndex: 'category',
    key: 'category',
    width: 420,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Description" />,
    dataIndex: 'description',
    key: 'description',
    width: 130,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Type" />,
    dataIndex: 'category',
    key: 'category',
    width: 130,
    render: (value: any) => (
      <span className="capitalize text-gray-500">{value}</span>
    ),
  },
  {
    title: <HeaderCell title="Created By" />,
    dataIndex: 'created_by',
    key: 'created_by',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Created At" />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 200,
    render: (value: Date) => (
      <>
        <Text className="mb-1 text-gray-500">
          {dayjs(value).format('DD MMM YYYY')}
        </Text>
      </>
    ),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 100,
    render: (_: string, row: Row) => (
      <div className="relative flex items-center justify-end gap-3">
        <ActionTooltipButton
          onClick={() => {
            openModal?.({
              view: <FlagForm flagData={row} />,
            });
          }}
          tooltipContent="Edit"
          variant="outline"
        >
          <PencilIcon className="h-4 w-4" />
        </ActionTooltipButton>
        <DeletePopover
          title={`Delete the Patient`}
          description={`Are you sure you want to delete this #${row.id} Patient?`}
          onDelete={() => onDeleteItem([row?.id.toString()])}
        />
      </div>
    ),
  },
];
