'use client';

import DeletePopover from '@/app/shared/ui/delete-popover';
import { HeaderCell } from '@/app/shared/ui/table';
import { IGetPharmachyListResponse } from '@/types/ApiResponse';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import DateCell from '@core/ui/date-cell';
import { ActionIcon, Badge, Checkbox, Text, Tooltip } from 'rizzui';
import CreateEditModal from '../modal/create-edit-modal';
import AvatarCard from '@/core/ui/avatar-card';
import ActionTooltipButton from '../../ui/action-tooltip-button';
import { PiCopy, PiQrCode } from 'react-icons/pi';
import ShowQrModal from '../modal/qr-modal';

type Columns = {
  data: IGetPharmachyListResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: number[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  openModal: (props: any) => void;
  handleCopy: (text: string | number) => void;
};

type Row = IGetPharmachyListResponse['data'][number];

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  openModal,
  handleCopy,
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
    title: <HeaderCell title="NAME" />,
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="ADDRESS" />,
    dataIndex: 'address_line_1',
    key: 'address_line_1',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="PHONE NUMBER" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 100,
    render: (value: number) => value,
  },
  {
    title: <HeaderCell title="BILLING EMAIL" />,
    dataIndex: 'billing_email',
    key: 'billing_email',
    width: 100,
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <Text className="text-[13px] text-gray-500">{value}</Text>
        <PiCopy
          onClick={() => handleCopy(value)}
          className="cursor-pointer active:scale-[0.99]"
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="DISPENSE EMAIL" />,
    dataIndex: 'dispense_email',
    key: 'dispense_email',
    width: 100,
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <Text className="text-[13px] text-gray-500">{value}</Text>
        <PiCopy
          onClick={() => handleCopy(value)}
          className="cursor-pointer active:scale-[0.99]"
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: Row) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <ActionTooltipButton
          tooltipContent="Show QR Code"
          variant="outline"
          onClick={() =>
            openModal({
              view: <ShowQrModal data={row} />,
              customSize: '600px',
            })
          }
        >
          <PiQrCode className="h-4 w-4" />
        </ActionTooltipButton>
        <Tooltip
          size="sm"
          content={'Edit Pharmachy'}
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
                customSize: '600px',
              })
            }
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Pharmachy'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            onClick={() =>
              openModal({
                view: <CreateEditModal isView data={row} />,
                customSize: '600px',
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
          title={`Delete the pharmachy`}
          description={`Are you sure you want to delete this #${row.id} pharmachy?`}
          onDelete={() => onDeleteItem([row.id])}
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
          <Text className="ms-2 font-medium text-red-dark">Inactice</Text>
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
          <Text className="ms-2 font-medium text-green-dark">TRUE</Text>
        </div>
      );
    case false:
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-red-dark">FALSE</Text>
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
