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
  Button,
} from 'rizzui';
import { HeaderCell } from '@/app/shared/ui/table';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import DateCell from '@core/ui/date-cell';
import TableAvatar from '@core/ui/avatar-card';
import { IGetInvoiceListResponse } from '@/types/ApiResponse';
import CSelect from '../../ui/select';
import { Dispatch, SetStateAction, useState } from 'react';
import { usePutUpdateInvoice, useResendInvoice } from '@/hooks/useInvoice';
import { useModal } from '../../modal-views/use-modal';
import { FaRegNoteSticky } from 'react-icons/fa6';
import { GrSchedules } from 'react-icons/gr';
import RefundForm from '../modal/refund-form';
import { PiCheckBold, PiWalletLight } from 'react-icons/pi';
import { Currency } from '@/store/currency';
import toast from 'react-hot-toast';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import TrashIcon from '@/core/components/icons/trash';
import DeleteModal from '../../ui/delete-modal';

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
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  idInvoice: number | string;
  setIdInvoice: Dispatch<SetStateAction<number | string>>;
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
  isOpen,
  setIsOpen,
  idInvoice,
  setIdInvoice,
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
    render: (_: any, row: any) => {
      return <StatusSelectUpdate id={row.id} selectItem={row.status} />;
    },
  },
  {
    title: <HeaderCell title="CREATED BY" />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 600,
    render: (created_at: Date) => <DateCell clock date={created_at} />,
  },
  {
    title: <HeaderCell title="UPDATED BY" />,
    dataIndex: 'updated_at',
    key: 'updated_at',
    width: 600,
    render: (updated_at: Date) => <DateCell clock date={updated_at} />,
  },
  {
    title: <HeaderCell title="Actions" />,
    dataIndex: 'action',
    key: 'action',
    width: 140,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-start">
        <RenderAction
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          row={row}
          onDeleteItem={onDeleteItem}
          idInvoice={idInvoice}
          setIdInvoice={setIdInvoice}
        />
      </div>
    ),
  },
];

function RenderAction({
  row,
  onDeleteItem,
  isOpen,
  setIsOpen,
  idInvoice,
  setIdInvoice,
}: {
  row: IRowType;
  onDeleteItem: (id: number[]) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  idInvoice: number | string;
  setIdInvoice: Dispatch<SetStateAction<number | string>>;
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
      <Dropdown placement="bottom-end">
        <Dropdown.Trigger>
          <ActionIcon variant="outline" rounded="full">
            <HiOutlineDotsVertical className="h-5 w-5" />
          </ActionIcon>
        </Dropdown.Trigger>
        <Dropdown.Menu className="min-w-[220px]">
          {/* <Dropdown.Item>
            <Button
              className="w-full hover:border-gray-700 hover:text-gray-700"
              variant="outline"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <PiCheckBold className="h-4 w-4 text-green-500" />
                <span>Approve Invoice</span>{' '}
              </div>
            </Button>
          </Dropdown.Item> */}
          {row.status == 1 && (
            <Dropdown.Item>
              <Link
                href={routes.invoice.edit(row.id.toString())}
                className="w-full"
              >
                <Button
                  className="w-full hover:border-gray-700 hover:text-gray-700"
                  variant="outline"
                >
                  <div className="flex items-center gap-3">
                    <PencilIcon className="h-4 w-4" />
                    <span>Edit Invoice</span>
                  </div>
                </Button>
              </Link>
            </Dropdown.Item>
          )}

          <Dropdown.Item>
            <Button
              className="w-full hover:border-gray-700 hover:text-gray-700"
              variant="outline"
              onClick={sendToEmail}
            >
              <div className="flex items-center gap-3">
                <FaRegNoteSticky className="h-4 w-4" />
                <span>Send</span>{' '}
              </div>
            </Button>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link href="#" className="w-full">
              <Button
                className="w-full hover:border-gray-700 hover:text-gray-700"
                variant="outline"
              >
                <div className="flex items-center gap-3">
                  <PiWalletLight className="h-4 w-4" />
                  <span>Pay Now</span>
                </div>
              </Button>
            </Link>
          </Dropdown.Item>

          {statusAvailToRefund.includes(row.status) && (
            <Dropdown.Item>
              <Button
                className="w-full hover:border-gray-700 hover:text-gray-700"
                variant="outline"
                onClick={() => refundModal(row)}
              >
                <div className="flex items-center gap-3">
                  <GrSchedules className="h-4 w-4" />
                  <span>Refund</span>{' '}
                </div>
              </Button>
            </Dropdown.Item>
          )}

          <Dropdown.Item>
            <Link
              href={routes.invoice.details(row.id.toString())}
              className="w-full"
            >
              <Button
                className="w-full hover:border-gray-700 hover:text-gray-700"
                variant="outline"
              >
                <div className="flex items-center gap-3">
                  <EyeIcon className="h-4 w-4" />
                  <span>View Invoice</span>
                </div>
              </Button>
            </Link>
          </Dropdown.Item>
          {row.status == 1 && (
            <Dropdown.Item>
              <Button
                className="w-full hover:border-gray-700 hover:text-gray-700"
                variant="outline"
                onClick={() => {
                  setIdInvoice(row.id);
                  setIsOpen(true);
                }}
              >
                <div className="flex items-center gap-3">
                  <TrashIcon className="h-4 w-4" />
                  <span>Delete Invoice</span>{' '}
                </div>
              </Button>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Delete the invoice`}
        description={`Are you sure you want to delete this #${idInvoice} invoice?`}
        onDelete={() => onDeleteItem([Number(idInvoice)])}
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

function StatusSelectUpdate({
  selectItem,
  id,
}: {
  selectItem: number;
  id: number;
}) {
  const { openModal, closeModal } = useModal();

  // const showConfirmModal = (
  //   id: number,
  //   onClick: (value: number) => void,
  //   status: string
  // ) => {
  //   closeModal(),
  //     openModal({
  //       view: <ShowConfirm onClick={onClick} status={status} id={id} />,
  //       customSize: '600px',
  //     });
  // };
  const aptStatusOptions = [
    { label: 'Draft', value: 1 },
    { label: 'Awaiting Approval', value: 2 },
    { label: 'Approved', value: 3 },
    { label: 'Cancelled', value: 4 },
  ];
  const selectItemValue = aptStatusOptions.find(
    (option) => option.value === selectItem
  )?.value;
  const [value, setValue] = useState(selectItemValue);
  const { mutate, isPending } = usePutUpdateInvoice();

  const handleSubmitStatus = (value: number) => {
    setValue(value);
    // mutate(
    //   { id, status: value },
    //   {
    //     onSuccess: () => {
    //       toast.success('Status updated successfully');
    //       closeModal();
    //     },
    //     onError: (error: any) => {
    //       toast.error(
    //         error?.response?.data?.message || 'Error updating status'
    //       );
    //       closeModal();
    //     },
    //   }
    // );
  };

  const handleChange = (value: number) => {
    // if (value == 1) {
    //   showConfirmModal(value, handleSubmitStatus, 'Draft');
    // } else if (value == 2) {
    //   showConfirmModal(value, handleSubmitStatus, 'Scheduled');
    // } else if (value == 3) {
    //   showConfirmModal(value, handleSubmitStatus, 'Check In');
    // } else if (value == 4) {
    //   showConfirmModal(value, handleSubmitStatus, 'Finished');
    // } else if (value == 5) {
    //   showConfirmModal(value, handleSubmitStatus, 'Cancelled');
    // } else if (value == 6) {
    //   showConfirmModal(value, handleSubmitStatus, 'On Going');
    // } else if (value == 7) {
    //   showConfirmModal(value, handleSubmitStatus, 'No Show');
    // } else {
    //   handleSubmitStatus(value);
    // }
    handleSubmitStatus(value);
  };

  return (
    <CSelect
      className={'min-w-[140px]'}
      dropdownClassName="h-auto"
      placeholder="Select Status"
      options={aptStatusOptions}
      value={value}
      onChange={handleChange}
      isLoading={isPending}
      displayValue={(option: { value: number }) =>
        getInvoicePaymentStatusBadge(option.value)
      }
    />
  );
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
