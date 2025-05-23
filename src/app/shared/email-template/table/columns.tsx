'use client';

import DeletePopover from '@/app/shared/ui/delete-popover';
import { HeaderCell } from '@/app/shared/ui/table';
import { routes } from '@/config/routes';
import { IGetEmailTemplatesResponse } from '@/types/ApiResponse';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import TableAvatar from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import Link from 'next/link';
import { PiCopy } from 'react-icons/pi';
import { ActionIcon, Badge, Checkbox, Text, Tooltip } from 'rizzui';
import ModalButton from '../../ui/modal/modal-button';
import CreateEditEmailTemplateModal from '../modal/create-edit-modal';

type Columns = {
  data: IGetEmailTemplatesResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  openModal: (props: any) => void;
};

type Row = IGetEmailTemplatesResponse['data'][number];

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
    title: <HeaderCell title="TEMPLATE NAME" />,
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (name: string) => <Text className="font-medium">{name}</Text>,
  },
  {
    title: <HeaderCell title="CREATED AT" />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 100,
    render: (value: Date) => <DateCell clock date={value} />,
  },
  {
    title: <HeaderCell title="UPDATE AT" />,
    dataIndex: 'updated_at',
    key: 'updated_at',
    width: 100,
    render: (value: Date) => <DateCell clock date={value} />,
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
          content={'Edit Template'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() =>
              openModal({
                view: <CreateEditEmailTemplateModal data={row} />,
                customSize: 'xl',
              })
            }
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Template'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            onClick={() =>
              openModal({
                view: <CreateEditEmailTemplateModal isView data={row} />,
                customSize: 'xl',
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
          title={`Delete the template`}
          description={`Are you sure you want to delete this #${row.id} template?`}
          onDelete={() => onDeleteItem(row.id.toString())}
        />
      </div>
    ),
  },
];
