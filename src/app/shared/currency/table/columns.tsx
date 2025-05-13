'use client';

import DeletePopover from '@/app/shared/ui/delete-popover';
import { HeaderCell } from '@/app/shared/ui/table';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import { ActionIcon, Checkbox, Text, Tooltip } from 'rizzui';
import CreateEditRoleModal from '../modal/create-edit-modal';
import { Currency, CurrencyState } from '@/store/currency';

type Columns = {
  data: CurrencyState['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  openModal: (props: any) => void;
};

type Row = Currency;

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  openModal,
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
    title: <HeaderCell title="CODE" />,
    dataIndex: 'code',
    key: 'code',
    width: 200,
    render: (name: string) => <Text className="font-medium">{name}</Text>,
  },
  {
    title: <HeaderCell title="NAME" />,
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (name: string) => <Text className="font-medium">{name}</Text>,
  },
  {
    title: <HeaderCell title="SYMBOL" />,
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (name: string) => <Text className="font-medium">{name}</Text>,
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: Row) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Currency'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() =>
              openModal({
                view: <CreateEditRoleModal data={row} />,
              })
            }
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip size="sm" content={'View Role'} placement="top" color="invert">
          <ActionIcon
            onClick={() =>
              openModal({
                view: <CreateEditRoleModal isView data={row} />,
              })
            }
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          title={`Delete the role`}
          description={`Are you sure you want to delete this #${row.id} role?`}
          onDelete={() => onDeleteItem(row.id.toString())}
        />
      </div>
    ),
  },
];
