'use client';

import Link from 'next/link';
// import { type Invoice } from '@/data/invoice-data';
import { routes } from '@/config/routes';
import {
  Text,
  Badge,
  Tooltip,
  Checkbox,
  ActionIcon,
  Flex,
  Dropdown,
} from 'rizzui';
import { HeaderCell } from '@/app/shared/ui/table';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import DeletePopover from '@/app/shared/ui/delete-popover';
import DateCell from '@core/ui/date-cell';
import TableAvatar from '@core/ui/avatar-card';
import { IGetInvoiceListResponse } from '@/types/ApiResponse';
import CSelect from '../../ui/select';
import { useState } from 'react';
import { usePutUpdateInvoice, useResendInvoice } from '@/hooks/useInvoice';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';
import { useModal } from '../../modal-views/use-modal';
import { FaRegNoteSticky } from 'react-icons/fa6';
import { GrSchedules } from 'react-icons/gr';
import RefundForm from '../modal/refund-form';
import ActionTooltipButton from '../../ui/action-tooltip-button';
import { PiCheckBold } from 'react-icons/pi';
import { Currency } from '@/store/currency';
import toast from 'react-hot-toast';

type IRowType = IGetInvoiceListResponse['data'][number];

const statusOptions = [
  { label: 'Send via SMS', value: 1 },
  { label: 'Send via Credit Card', value: 2 },
];

export function getInvoicePaymentStatusBadge(status: number) {
  switch (status) {
    case 1:
      return (
        <div className="flex items-center">
          <Badge color="secondary" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">Draft</Text>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot />
          <Text className="text-gray-dark ms-2 font-medium">
            Awaiting Payment
          </Text>
        </div>
      );
    case 3:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Paid</Text>
        </div>
      );
    case 4:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="text-gray-dark ms-2 font-medium">Void</Text>
        </div>
      );
    case 5:
      return (
        <div className="flex items-center">
          <Badge color="secondary" renderAsDot />
          <Text className="text-gray-dark ms-2 font-medium">Refund</Text>
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
  data: IGetInvoiceListResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (ids: number[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  currencyData: Currency;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  currencyData,
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
    render: (id: string) => <p className="w-max">#{id}</p>,
  },
  {
    title: <HeaderCell title="PATIENT NAME" />,
    dataIndex: 'patien',
    key: 'patien',
    render: (_: string, row: IRowType) => (
      <TableAvatar
        src={row?.patient?.photo || ''}
        name={`${row?.patient?.first_name} ${row?.patient?.last_name}`}
        description={row.patient?.email}
        number={row.patient?.mobile_number}
      />
    ),
  },
  {
    title: <HeaderCell title="TOTAL" />,
    dataIndex: 'total_amount',
    key: 'total_amount',
    width: 250,
    render: (value: string) => `${currencyData.symbol}${Number(value)}`,
  },
  {
    title: <HeaderCell title="PAYMENT STATUS" />,
    dataIndex: 'status',
    key: 'status',
    width: 650,
    render: (value: number) => getInvoicePaymentStatusBadge(value),
  },
  {
    title: <HeaderCell title="CREATED BY" />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 600,
    render: (created_at: Date) => <DateCell clock date={created_at} />,
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 140,
    render: (_: string, row: any) => (
      <RenderAction row={row} onDeleteItem={onDeleteItem} />
    ),
  },
];

function RenderAction({
  row,
  onDeleteItem,
}: {
  row: IRowType;
  onDeleteItem: (id: number[]) => void;
}) {
  const { openModal, closeModal } = useModal();

  const { mutate } = useResendInvoice();

  const statusAvailToRefund = [3];

  function sendToEmail() {
    mutate(row.id, {
      onSuccess: () => {
        toast.success('Invoice sent to email successfully');
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || 'Error sending invoice to email'
        );
      },
    });
  }

  function refundModal(row: IRowType) {
    closeModal(),
      openModal({
        view: <RefundForm data={row} />,
        customSize: '600px',
      });
  }

  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <ActionTooltipButton tooltipContent="Approve Invoice" variant="outline">
        <PiCheckBold className="h-4 w-4 text-green-500" />
      </ActionTooltipButton>
      <Dropdown placement="bottom-end">
        <Dropdown.Trigger>
          <Tooltip size="sm" content={'Actions'} placement="top" color="invert">
            <ActionIcon
              as="span"
              aria-label={'Actions'}
              className="hover:!border-gray-900 hover:text-gray-700"
              size="sm"
              variant="outline"
              rounded="md"
            >
              <HiOutlineAdjustmentsVertical className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>
        </Dropdown.Trigger>
        <Dropdown.Menu className="divide-y">
          <Dropdown.Item onClick={sendToEmail}>
            <FaRegNoteSticky className="mr-2 h-4 w-4" />
            Resend
          </Dropdown.Item>
          {statusAvailToRefund.includes(row.status) && (
            <Dropdown.Item onClick={() => refundModal(row)}>
              <GrSchedules className="mr-2 h-4 w-4" />
              Refund
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <Tooltip
        size="sm"
        content={'Edit Invoice'}
        placement="top"
        color="invert"
      >
        <Link href={routes.invoice.edit(row.id.toString())}>
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
        <Link href={routes.invoice.details(row.id.toString())}>
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
        onDelete={() => onDeleteItem([row.id])}
      />
    </div>
  );
}

function getPaymentMethodBadge(status: number | string) {
  switch (status) {
    case 2:
      return (
        <Flex gap="1" align="center">
          <Badge color="info" renderAsDot />
          <Text className="font-medium text-yellow-600">
            Payment By Credit Card
          </Text>
        </Flex>
      );
    case 1:
      return (
        <Flex gap="1" align="center">
          <Badge color="info" renderAsDot />
          <Text className="text-yellow-dark font-medium">
            Payment Link Via SMS
          </Text>
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

export function StatusSelect() {
  const [value, setValue] = useState<number | null>(null);

  const { mutate, isPending } = usePutUpdateInvoice();

  const handleChange = (value: number) => {
    setValue(value);
    // mutate(
    //   { id, status: value },
    //   {
    //     onSuccess: () => {
    //       toast.success('Status updated successfully');
    //     },
    //     onError: (error: any) => {
    //       toast.error(
    //         error?.response?.data?.message || 'Error updating status'
    //       );
    //     },
    //   }
    // );
  };

  return (
    <CSelect
      className={'w-[200px]'}
      dropdownClassName="h-auto"
      placeholder="Select Payment Method"
      options={statusOptions}
      value={value}
      onChange={handleChange}
      isLoading={isPending}
      displayValue={(option: { value: number }) =>
        getPaymentMethodBadge(option.value)
      }
    />
  );
}
