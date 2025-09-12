'use client';

import DeletePopover from '@/app/shared/ui/delete-popover';
import { HeaderCell } from '@/app/shared/ui/table';
import { IGetCouponsResponse } from '@/types/ApiResponse';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import { ActionIcon, Badge, Button, Checkbox, Dropdown, Text, Tooltip } from 'rizzui';
import CreateEditModal from '../modal/create-edit-modal';
import dayjs from 'dayjs';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';
import { HiOutlineDotsVertical } from 'react-icons/hi';

type Columns = {
  data: IGetCouponsResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  openModal: (props: any) => void;
  symbol?: string;
};

type Row = IGetCouponsResponse['data'][number];

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  openModal,
  symbol,
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
      width: 50,
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
      title: <HeaderCell title="Date" />,
      dataIndex: 'type',
      key: 'type',
      width: 200,
      render: (value: string, row: Row) => (
        <span>{row.start_date ? dayjs(row.start_date).format('DD-MM-YYYY') : ''} / {row.start_date ? dayjs(row.expiry_date).format('DD-MM-YYYY') : ''}</span>
      )
    },
    {
      title: <HeaderCell title="Coupon Type" />,
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (value: string) => value,
    },
    {
      title: <HeaderCell title="Discount" />,
      dataIndex: 'discount_amount',
      key: 'discount_amount',
      width: 100,
      render: (value: string, row: Row) => (
        <>
          {row.discount_type === 'fix' && symbol}
          {value}
          {row.discount_type === 'percent' && '%'}
        </>
      ),
    },
    {
      title: <HeaderCell title="STATUS" />,
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value: number) => getStatusBadge(value),
    },

    {
      title: <HeaderCell title="Actions" />,
      dataIndex: 'action',
      key: 'action',
      width: 130,
      render: (_: string, row: Row) => (
        <div className="flex items-center justify-center gap-3 pe-4">
          <Dropdown placement="bottom-end">
            <Dropdown.Trigger>
              <ActionIcon
                variant="outline"
                rounded="full"
              >
                <HiOutlineDotsVertical className="h-5 w-5" />
              </ActionIcon>
            </Dropdown.Trigger>
            <Dropdown.Menu className="divide-y">
              <div className="mb-2 flex items-center gap-2">
                <Button
                  className="hover:border-gray-700 w-full hover:text-gray-700"
                  variant='outline'
                  onClick={() =>
                    openModal({
                      view: <CreateEditModal data={row} />,
                    })
                  }
                >
                  <PencilIcon className="h-4 w-4" />
                  <span>Edit Branch</span>{" "}
                </Button>
              </div>

              <div className="mb-2 flex items-center">
                <Button
                  className="hover:border-gray-700 w-full hover:text-gray-700"
                  variant='outline'
                  onClick={() =>
                    openModal({
                      view: <CreateEditModal isView data={row} />,
                    })
                  }
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>View Branch</span>{" "}
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <DeletePopover
                  title={`Delete the branch`}
                  description={`Are you sure you want to delete this #${row.id} branch?`}
                  onDelete={() => onDeleteItem(row.id.toString())}
                  isCustom
                  buttonText='Delete Branch'
                />
              </div>
            </Dropdown.Menu>
          </Dropdown>
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
