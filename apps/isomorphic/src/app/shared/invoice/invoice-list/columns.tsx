'use client';

import Link from 'next/link';
// import { type Invoice } from '@/data/invoice-data';
import { routes } from '@/config/routes';
import { Text, Badge, Tooltip, Checkbox, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/app/shared/table';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import DateCell from '@core/ui/date-cell';
import TableAvatar from '@core/ui/avatar-card';

// function getStatusBadge(status: string) {
//   switch (status.toLowerCase()) {
//     case 'pending':
//       return (
//         <div className="flex items-center">
//           <Badge color="warning" renderAsDot />
//           <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
//         </div>
//       );
//     case 'paid':
//       return (
//         <div className="flex items-center">
//           <Badge color="success" renderAsDot />
//           <Text className="ms-2 font-medium text-green-dark">{status}</Text>
//         </div>
//       );
//     case 'overdue':
//       return (
//         <div className="flex items-center">
//           <Badge color="danger" renderAsDot />
//           <Text className="ms-2 font-medium text-red-dark">{status}</Text>
//         </div>
//       );
//     default:
//       return (
//         <div className="flex items-center">
//           <Badge renderAsDot className="bg-gray-400" />
//           <Text className="ms-2 font-medium text-gray-600">{status}</Text>
//         </div>
//       );
//   }
// }

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
    title: <HeaderCell title="INVOICE ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 450,
    render: (id: string) => (
      <p className='w-max'>#{id}</p>
    ),
  },
  {
    title: <HeaderCell title="PATIENT NAME" />,
    dataIndex: 'patientName',
    key: 'patientName',
    render: (patientName: string) => (
      <TableAvatar
        src={'https://randomuser.me/api/portraits'}
        name={patientName ?? 'Default Name'}
        number={982120218}
        description={'email@email.com'}
      />
    ),
  },
  {
    title: <HeaderCell title="APPOINT TO" />,
    dataIndex: 'email',
    key: 'email',
    width: 250,
    render: (email: string) => email,
  },
  {
    title: <HeaderCell title="APPOINTMENT DATE" />,
    dataIndex: 'email',
    key: 'email',
    width: 250,
    render: (email: string) => email,
  },
  {
    title: <HeaderCell title="TOTAL" />,
    dataIndex: 'total',
    key: 'total',
    width: 250,
    render: (total: string) => total,
  },
  {
    title: <HeaderCell title="STATUS" />,
    dataIndex: 'status',
    key: 'status',
    width: 650,
    render: (value: number | string) => (
      <span className={`${value === 'Paid' ? 'text-green-600' : value === 'Unpaid' ? 'text-yellow-600' : value === 'Cancelled' ? 'text-red-600' : 'text-blue-600'}`}>
        {value == 1 ? 'Draft' : value == 2 ? 'Open' : value == 3 ? 'Paid' : value == 4 ? 'Void' : '-'}
      </span>
    ),
  },
  {
    title: <HeaderCell title="CREATED BY" />,
    dataIndex: 'createdBy',
    key: 'createdBy',
    width: 800,
    render: (createdBy: { role: string; name: string; date: Date }) => (
      <>
        <p className="w-max text-sm font-medium text-gray-900 dark:text-gray-700">
          {createdBy?.role}#{createdBy?.name}
        </p>
        <p className="w-max text-[13px] text-gray-500">
          <DateCell date={createdBy?.date} />
        </p>
      </>
    ),
  },
  // {
  //   title: (
  //     <HeaderCell
  //       title="Created"
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
  // {
  //   title: (
  //     <HeaderCell
  //       title="Due Date"
  //       sortable
  //       ascending={
  //         sortConfig?.direction === 'asc' && sortConfig?.key === 'dueDate'
  //       }
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('dueDate'),
  //   dataIndex: 'dueDate',
  //   key: 'dueDate',
  //   width: 200,
  //   render: (value: Date) => <DateCell date={value} />,
  // },
  // {
  //   title: (
  //     <HeaderCell
  //       title="Amount"
  //       sortable
  //       ascending={
  //         sortConfig?.direction === 'asc' && sortConfig?.key === 'amount'
  //       }
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('amount'),
  //   dataIndex: 'amount',
  //   key: 'amount',
  //   width: 200,
  //   render: (value: string) => (
  //     <Text className="font-medium text-gray-700 dark:text-gray-600">
  //       ${value}
  //     </Text>
  //   ),
  // },
  // {
  //   title: <HeaderCell title="Status" />,
  //   dataIndex: 'status',
  //   key: 'status',
  //   width: 120,
  //   render: (value: string) => getStatusBadge(value),
  // },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 140,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip
          size="sm"
          content={'Edit Invoice'}
          placement="top"
          color="invert"
        >
          <Link href={routes.invoice.edit(row.id)}>
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
        <Tooltip
          size="sm"
          content={'View Invoice'}
          placement="top"
          color="invert"
        >
          <Link href={routes.invoice.details(row.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the invoice`}
          description={`Are you sure you want to delete this #${row.id} invoice?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
