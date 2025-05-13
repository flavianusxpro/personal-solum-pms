'use client';

import { Text, Badge, Tooltip, Checkbox, ActionIcon } from 'rizzui';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { IGetUsersResponse } from '@/types/ApiResponse';
import { HeaderCell } from '../../ui/table';
import DeletePopover from '../../ui/delete-popover';
import CSelect from '@/core/ui/select';
import { useState } from 'react';
import { statusOptions } from './filter-element';
import Link from 'next/link';
import { routes } from '@/config/routes';

type User = IGetUsersResponse['users'][number];

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: number[]) => void;
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
      <div className="flex items-center gap-3 whitespace-nowrap ps-3">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
        User ID
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: User) => (
      <div className="inline-flex ps-3">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.id.toString())}
          {...(onChecked && { onChange: () => onChecked(row.id.toString()) })}
          label={`#${row.id}`}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 250,
    render: (_: string, user: User) => (
      <AvatarCard src={user.name} name={user.name} description={user.email} />
    ),
  },
  {
    title: (
      <HeaderCell
        title="Role"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'role'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('role'),
    dataIndex: 'role',
    key: 'role',
    width: 250,
    render: (role: User['role']) => role.name,
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('created_at'),
    dataIndex: 'created_at',
    key: 'created_at',
    width: 200,
    render: (value: Date) => <DateCell date={value} clock />,
  },
  // {
  //   title: <HeaderCell title="Permissions" />,
  //   dataIndex: 'permissions',
  //   key: 'permissions',
  //   width: 200,
  //   render: (_: string, user: User) => (
  //     <div className="flex items-center gap-2">
  //       {user?.role.permissions.map((permission) => (
  //         <Badge
  //           key={permission.id}
  //           rounded="lg"
  //           variant="outline"
  //           className="border-muted font-normal text-gray-500"
  //         >
  //           {permission.name}
  //         </Badge>
  //       ))}
  //     </div>
  //   ),
  // },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 130,
    render: (status: number) => <StatusSelect selectItem={status} />,
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 140,
    render: (_: string, user: User) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit User'} placement="top" color="invert">
          <Link href={routes.user.edit(user.id.toString())}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip size="sm" content={'View User'} placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          title={`Delete this user`}
          description={`Are you sure you want to delete this #${user.id} user?`}
          onDelete={() => onDeleteItem([user.id])}
        />
      </div>
    ),
  },
];

function StatusSelect({ selectItem }: { selectItem?: number }) {
  const [value, setValue] = useState(selectItem);
  return (
    <CSelect
      dropdownClassName="!z-10 h-auto"
      placeholder="Select Role"
      options={statusOptions}
      value={value}
      onChange={setValue}
    />
  );
}
