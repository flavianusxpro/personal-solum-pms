'use client';

import DeletePopover from '@/app/shared/ui/delete-popover';
import { HeaderCell } from '@/app/shared/ui/table';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import { ActionIcon, Badge, Checkbox, Flex, Text, Tooltip } from 'rizzui';
import CreateEditModal from '../modal/create-edit-modal';
import {
  Currency,
  CurrencyState,
  setActiveCurrencyAtom,
} from '@/store/currency';
import { useCallback, useMemo, useState } from 'react';
import CSelect from '../../ui/select';
import { useAtom } from 'jotai';

type Columns = {
  data: CurrencyState['data'];
  onDeleteItem: (id: string) => void;
  openModal: (props: any) => void;
};

type Row = Currency;

export const getColumns = ({ data, onDeleteItem, openModal }: Columns) => [
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
    dataIndex: 'symbol',
    key: 'symbol',
    width: 200,
    render: (name: string) => <Text className="font-medium">{name}</Text>,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (_: string, row: Row) => <StatusSelect selectItem={row} />,
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
                view: <CreateEditModal data={row} />,
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
          title={`Delete the role`}
          description={`Are you sure you want to delete this #${row.id} role?`}
          onDelete={() => onDeleteItem(row.id.toString())}
        />
      </div>
    ),
  },
];

function getScheduleStatusBadge(status: number | string) {
  switch (status) {
    case 2:
      return (
        <Flex gap="1" align="center">
          <Badge color="danger" renderAsDot />
          <Text className="font-medium text-red-dark">Inactive</Text>
        </Flex>
      );
    case 1:
      return (
        <Flex gap="1" align="center">
          <Badge color="success" renderAsDot />
          <Text className="font-medium text-green-500">Active</Text>
        </Flex>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="font-medium text-blue-600">{status}</Text>
        </div>
      );
  }
}

const statusOptions = [
  { label: 'Active', value: 1 },
  { label: 'Inactive', value: 2 },
];

function StatusSelect({ selectItem }: { selectItem: Row }) {
  const selectItemValue = statusOptions.find(
    (option) => option.value === (selectItem.isActive !== true ? 2 : 1)
  )?.value;
  const [_, setActiveStatus] = useAtom(setActiveCurrencyAtom);

  const handleChange = (value: number) => {
    if (setActiveStatus) {
      setActiveStatus(selectItem);
    }
  };

  return (
    <CSelect
      className={'min-w-[140px]'}
      dropdownClassName="h-auto"
      placeholder="Select Status"
      options={statusOptions}
      value={selectItemValue}
      onChange={(val: number) => handleChange(val)}
      displayValue={(option: { value: number }) =>
        getScheduleStatusBadge(option.value)
      }
    />
  );
}
