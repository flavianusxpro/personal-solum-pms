'use client';

import DeletePopover from '@/app/shared/delete-popover';
import { HeaderCell } from '@/app/shared/table';
import { routes } from '@/config/routes';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import TableAvatar from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import Link from 'next/link';
import { PiCopy } from 'react-icons/pi';
import { ActionIcon, Badge, Checkbox, Text, Tooltip } from 'rizzui';

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
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
    title: <HeaderCell title="DOCTOR ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 120,
    render: (value: string) => <Text>#{value}</Text>,
  },
  {
    title: <HeaderCell title="NAME" />,
    dataIndex: 'name',
    key: 'name',
    width: 170,
    render: (_: any, row: any) => (
      <p className="flex items-center gap-2 font-medium text-gray-700">
        {`${row.first_name} ${row.last_name}`}
      </p>
    ),
  },
  {
    title: <HeaderCell title="GENDER" />,
    dataIndex: 'gender',
    key: 'gender',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  // {
  //   title: (
  //     <HeaderCell
  //       title="BIRTH DATE"
  //       sortable
  //       ascending={
  //         sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
  //       }
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('createdAt'),
  //   dataIndex: 'createdAt',
  //   key: 'createdAt',
  //   width: 200,
  //   render: (value: Date) => <DateCell date={value} />,
  // },
  {
    title: <HeaderCell title="CONTACT" />,
    dataIndex: 'number',
    key: 'number',
    width: 150,
    render: (_: any, row: any) => (
      <>
        {row.email ? (
          <p className="flex items-center gap-2 font-medium text-gray-700">
            {row.email}
            <PiCopy className="cursor-pointer active:scale-[0.99]" />
          </p>
        ) : null}
        {row.number ? (
          <p className="flex items-center gap-2 font-medium text-slate-400">
            {row.number}
            <PiCopy className="cursor-pointer active:scale-[0.99]" />
          </p>
        ) : null}
      </>
    ),
  },
  {
    title: <HeaderCell title="SPECIALIST" />,
    dataIndex: 'specialist',
    key: 'specialist',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  // {
  //   title: (
  //     <HeaderCell
  //       title="Phone"
  //       sortable
  //       ascending={
  //         sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
  //       }
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('createdAt'),
  //   dataIndex: 'createdAt',
  //   key: 'createdAt',
  //   width: 200,
  //   render: (value: Date) => <DateCell clock={true} date={value} />,
  // },
  // {
  //   title: (
  //     <HeaderCell
  //       title="Modified"
  //       sortable
  //       ascending={
  //         sortConfig?.direction === 'asc' && sortConfig?.key === 'updatedAt'
  //       }
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('updatedAt'),
  //   dataIndex: 'updatedAt',
  //   key: 'updatedAt',
  //   width: 200,
  //   render: (value: Date) => <DateCell clock={true} date={value} />,
  // },
  // {
  //   title: <HeaderCell title="Status" />,
  //   dataIndex: 'status',
  //   key: 'status',
  //   width: 140,
  //   render: (value: string) => getStatusBadge(value),
  // },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Data Doctor'}
          placement="top"
          color="invert"
        >
          <Link
            href={routes.forms.profileSettings}
            onClick={() => {
              localStorage.setItem('role', 'doctor');
            }}
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Data Doctor'}
          placement="top"
          color="invert"
        >
          <Link
            href={routes.forms.profileSettings}
            onClick={() => {
              localStorage.setItem('role', 'doctor');
            }}
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this #${row.id} order?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];

export const getWidgetColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: (
      <HeaderCell title="Order ID" className="ps-4 [&>div]:whitespace-nowrap" />
    ),
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string, row: any) => (
      <Link
        href={routes.doctor.edit(row.id)}
        className="ps-4 hover:text-gray-900 hover:underline"
      >
        #{value}
      </Link>
    ),
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'customer',
    key: 'customer',
    width: 300,
    render: (_: any, row: any) => (
      <TableAvatar
        src={row.avatar}
        name={row.name}
        number={row.number}
        description={row.email.toLowerCase()}
      />
    ),
  },
  {
    title: <HeaderCell title="Items" />,
    dataIndex: 'items',
    key: 'items',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Price"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">${value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (createdAt: Date) => <DateCell date={createdAt} />,
  },
  {
    title: (
      <HeaderCell
        title="Modified"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'updatedAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Order'}
          placement="top"
          color="invert"
        >
          <Link
            href={routes.forms.profileSettings}
            onClick={() => {
              localStorage.setItem('role', 'doctor');
            }}
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Order'}
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Order'}
          placement="top"
          color="invert"
        >
          <Link
            href={routes.forms.profileSettings}
            onClick={() => {
              localStorage.setItem('role', 'doctor');
            }}
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'View Order'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this #${row.id} order?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
