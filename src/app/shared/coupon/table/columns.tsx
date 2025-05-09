'use client';

import DeletePopover from '@/app/shared/ui/delete-popover';
import { HeaderCell } from '@/app/shared/ui/table';
import { IGetAllClinicForPatientResponse } from '@/types/ApiResponse';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import DateCell from '@core/ui/date-cell';
import { ActionIcon, Badge, Checkbox, Text, Tooltip } from 'rizzui';
import CreateEditModal from '../modal/create-edit-modal';
import AvatarCard from '@/core/ui/avatar-card';

type Columns = {
  data: IGetAllClinicForPatientResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  openModal: (props: any) => void;
};

type Row = IGetAllClinicForPatientResponse['data'][number];

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
    title: <HeaderCell title="ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="NAME" />,
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="CODE" />,
    dataIndex: 'code',
    key: 'code',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Discount" />,
    dataIndex: 'discount',
    key: 'discount',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="STATUS" />,
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (value: number) => getStatusBadge(value),
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
          content={'Edit Branch'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() =>
              openModal({
                view: <CreateEditModal data={row} />,
              })
            }
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Branch'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            onClick={() =>
              openModal({
                view: <CreateEditModal isView data={row} />,
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
          title={`Delete the branch`}
          description={`Are you sure you want to delete this #${row.id} branch?`}
          onDelete={() => onDeleteItem(row.id.toString())}
        />
      </div>
    ),
  },
];

function getStatusBadge(status: number) {
  switch (status) {
    case 1:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Not verified</Text>
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

function getDefaultBadge(status: boolean) {
  switch (status) {
    case true:
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-green-dark">HEAD OFFICE</Text>
        </div>
      );
    case false:
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-red-dark">BRANCH</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}
