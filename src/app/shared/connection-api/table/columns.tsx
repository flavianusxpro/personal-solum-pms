'use client';

import DeletePopover from '@/app/shared/ui/delete-popover';
import { HeaderCell } from '@/app/shared/ui/table';
import { routes } from '@/config/routes';
import { IGetApiKeyConnectionResponse } from '@/types/ApiResponse';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import Link from 'next/link';
import { PiCopy } from 'react-icons/pi';
import {
  ActionIcon,
  Badge,
  Checkbox,
  SelectOption,
  Text,
  Tooltip,
} from 'rizzui';
import ActionTooltipButton from '../../ui/action-button';
import { useModal } from '../../modal-views/use-modal';
import CreateEditApiModal from '../modal/create-edit-modal';

type RowValue = IGetApiKeyConnectionResponse['data'][number];

function getStatusBadge(status: boolean) {
  switch (status) {
    case true:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
        </div>
      );
    case false:
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

type Columns = {
  data: IGetApiKeyConnectionResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onChecked?: (id: string) => void;
  handleCopy: (text: string | number) => void;
  onDeleteItem: (ids: number[]) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  handleSelectAll,
  onChecked,
  handleCopy,
  onDeleteItem,
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
    title: <HeaderCell title="API ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 120,
    render: (value: string) => <Text>#{value}</Text>,
  },
  {
    title: <HeaderCell title="HOSTNAME" />,
    dataIndex: 'hostname',
    key: 'hostname',
    width: 170,
    render: (value: string | null) => value || '-',
  },
  {
    title: <HeaderCell title="NAME" />,
    dataIndex: 'name',
    key: 'name',
    width: 170,
    render: (value: string | null) => value || '-',
  },
  {
    title: <HeaderCell title="STATUS" />,
    dataIndex: 'status',
    key: 'status',
    width: 150,
    render: (value: boolean) => getStatusBadge(value),
  },
  {
    title: <HeaderCell title="TOKEN" />,
    dataIndex: 'token',
    key: 'token',
    width: 200,
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <Text className="max-w-xl overflow-hidden text-ellipsis font-mono text-gray-700">
          {value}
        </Text>
        <ActionIcon
          size="sm"
          variant="outline"
          onClick={() => handleCopy(value)}
          className="hover:text-gray-700"
        >
          <PiCopy className="h-4 w-4" />
        </ActionIcon>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: RowValue) => (
      <RenderAction row={row} onDeleteItem={onDeleteItem} />
    ),
  },
];
function RenderAction({
  row,
  onDeleteItem,
}: {
  row: RowValue;
  onDeleteItem: (id: number[]) => void;
}) {
  const { openModal, closeModal } = useModal();

  function handleEditModal(row: RowValue) {
    closeModal(),
      openModal({
        view: <CreateEditApiModal data={row} />,
        customSize: '600px',
      });
  }

  function handleViewModal(row: RowValue) {
    closeModal(),
      openModal({
        view: <CreateEditApiModal isView data={row} />,
        customSize: '600px',
      });
  }

  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <ActionTooltipButton
        tooltipContent="Edit Api Connection"
        variant="outline"
        onClick={() => handleEditModal(row)}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionTooltipButton>

      <ActionTooltipButton
        tooltipContent="View Api Connection"
        variant="outline"
        onClick={() => handleViewModal(row)}
      >
        <EyeIcon className="h-4 w-4" />
      </ActionTooltipButton>
      <DeletePopover
        title={`Delete the connection`}
        description={`Are you sure you want to delete this #${row.id} connection?`}
        onDelete={() => onDeleteItem([row.id])}
      />
    </div>
  );
}
