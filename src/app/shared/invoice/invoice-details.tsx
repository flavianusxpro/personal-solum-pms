'use client';

import { Text, Loader, Button, Table, Flex, Badge, Empty, Tooltip } from 'rizzui';
import { useGetInvoiceById } from '@/hooks/useInvoice';
import dayjs from '@/config/dayjs';
import { IGetInvoiceByIdResponse } from '@/types/ApiResponse';
import { AiOutlineInfoCircle } from "react-icons/ai";
import PageHeader from '../ui/page-header';
import { routes } from '@/config/routes';
import PrintButton from '../ui/print-button';
import { PiCopy, PiDownloadSimpleBold } from 'react-icons/pi';
import { useEffect, useRef } from 'react';
import PDFInvoice, { PDFInvoiceRef } from './modal/pdf-invoice';
import { currencyAtom } from '@/store/currency';
import { useAtom } from 'jotai';
import { useCopyToClipboard } from 'react-use';
import toast from 'react-hot-toast';

const pageHeader = {
  title: 'Invoice Details',
  breadcrumb: [
    {
      href: routes.invoice.home,
      name: 'Invoice',
    },
    {
      name: 'Invoice Details',
    },
  ],
};

export default function InvoiceDetails({ id }: { id: string }) {
  const [currencyData] = useAtom(currencyAtom);
  const [state, copyToClipboard] = useCopyToClipboard();
  const handleCopy = (text: string | number) => {
    copyToClipboard(String(text));
  };
  const getInvoiceStatusBadge = (status: number) => {
    switch (status) {
      case 1:
        return (
          <span className="flex text-center ml-2 px-2 py-1 rounded-[4px] items-center bg-[#484848]">
            <Text className="text-white font-normal text-sm">Draft</Text>
          </span>
        );
      case 2:
        return (
          <span className="flex text-center ml-2 px-2 py-1 rounded-[4px] items-center bg-[#11833C]">
            <Text className="text-white font-normal text-sm">Paid</Text>
          </span>
        );
      case 3:
        return (
          <span className="flex text-center ml-2 px-2 py-1 rounded-[4px] items-center bg-[#E90000]">
            <Text className="text-white font-normal text-sm">Cancelled</Text>
          </span>
        );
      case 4:
        return (
          <span className="flex text-center ml-2 px-2 py-1 rounded-[4px] items-center bg-[#F4A523]">
            <Text className="text-white font-normal text-sm">Void</Text>
          </span>
        );
      case 5:
        return (
          <span className="flex text-center ml-2 px-2 py-1 rounded-[4px] items-center bg-[#AB570A]">
            <Text className="text-white font-normal text-sm">Refund</Text>
          </span>
        );
      case 6:
        return (
          <span className="flex text-center ml-2 px-2 py-1 rounded-[4px] items-center bg-[#1E88E5]">
            <Text className="text-white font-normal text-sm">Unpaid</Text>
          </span>
        );
      default:
        return (
          <span className="flex text-center ml-2 px-2 py-1 rounded-[4px] items-center bg-gray-600">
            <Text className="text-white font-normal text-sm">Not Paid</Text>
          </span>
        );
    }
  }

  const getAptStatusBadge = (status: number | string) => {
    switch (status) {
      case 7:
        return (
          <Flex gap="1" align="center">
            <Badge renderAsDot className="bg-gray-400" />
            <Text className="font-medium text-sm text-gray-600">No Show</Text>
          </Flex>
        );
      case 6:
        return (
          <Flex gap="1" align="center">
            <Badge color="warning" renderAsDot />
            <Text className="font-medium text-sm text-yellow-600">On Going</Text>
          </Flex>
        );
      case 5:
        return (
          <Flex gap="1" align="center">
            <Badge color="success" renderAsDot />
            <Text className="font-medium text-sm text-green-dark">Canceled</Text>
          </Flex>
        );
      case 4:
        return (
          <Flex gap="1" align="center">
            <Badge color="warning" renderAsDot />
            <Text className="font-medium text-sm text-red-dark">Completed</Text>
          </Flex>
        );
      case 3:
        return (
          <Flex gap="1" align="center">
            <Badge color="secondary" renderAsDot />
            <Text className="font-medium text-sm text-secondary">Checked In</Text>
          </Flex>
        );
      case 2:
        return (
          <Flex gap="1" align="center">
            <Badge className='bg-green-500' renderAsDot />
            <Text className="font-medium text-sm text-green-500">Scheduled</Text>
          </Flex>
        );
      case 1:
        return (
          <Flex gap="1" align="center">
            <Badge className='bg-red-dark' renderAsDot />
            <Text className="font-medium text-sm text-red-dark">Draft</Text>
          </Flex>
        );
    }
  }

  const pdfInvoiceRef = useRef<PDFInvoiceRef>(null);
  const { data: dataInvoice, isLoading } = useGetInvoiceById(id);
  const contentRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;

  useEffect(() => {
    if (state.error) {
      console.error('Failed to copy: ', state.error);
    } else if (state.value) {
      toast.success('Copied to clipboard');
    }
  }, [state]);

  if (isLoading) return <Loader className="h-10 w-10" />;

  const handlePrint = () => {
    pdfInvoiceRef.current?.handlePrint();
  };

  const handleDownload = () => {
    pdfInvoiceRef.current?.handleDownload();
  };

  // Payment ID
  const rawPaymentId = () => {
    return (
      dataInvoice?.payment?.stripeId ??
      dataInvoice?.payment?.id ??
      null
    );
  };
  const paymentIdValue = rawPaymentId();
  const paymentId = String(paymentIdValue || '-');
  const isLongPaymentId = paymentIdValue && paymentId.length > 10;
  const displayPaymentValue = isLongPaymentId
    ? `${paymentId.slice(0, 10)}...`
    : paymentId;


  // Refund ID
  const refundId = dataInvoice?.stripe_refund_id ?? null;
  const refundIdString = String(refundId || 'N/A');
  const isLongRefundId = refundId && refundIdString.length > 10;
  const displayRefundValue = isLongRefundId
    ? `${refundIdString.slice(0, 10)}...`
    : refundIdString;

  const fullAddress = `${dataInvoice?.patient?.address_line_1 || ''}${dataInvoice?.patient?.address_line_2 ? `, ${dataInvoice?.patient?.address_line_2}` : ''}`;

  const dataLogHistory: any = [];

  return (
    <>
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <PDFInvoice
          ref={pdfInvoiceRef}
          data={dataInvoice}
        />
      </div>

      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <PayNowButton onClick={() => {}} /> */}
          <PrintButton onClick={handlePrint} />
          <Button onClick={handleDownload} className="w-full @lg:w-auto">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            Download
          </Button>
        </div>
      </PageHeader>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col md:flex-row border border-[#E4E4E4] rounded-xl p-6 gap-4'>
          <div className='flex-1 flex flex-col gap-4'>
            <h1 className='font-semibold font-lexend text-base'>
              Invoice Details
            </h1>

            <div className='flex flex-col'>
              <p className='text-sm font-semibold font-inter'>
                Invoice ID : <span className='text-sm font-normal font-inter ml-2 text-[#484848]'>INV-{dataInvoice?.id ?? '-'}</span>
              </p>
              <p className='text-sm font-semibold font-inter'>
                Date : <span className='text-sm font-normal font-inter ml-2 text-[#484848]'>{dataInvoice?.date ? dayjs(dataInvoice?.date).utc().format('DD MMM YYYY') : '-'}</span>
              </p>
              <p className='text-sm font-semibold font-inter flex items-center'>
                Status : {getInvoiceStatusBadge(dataInvoice?.status ?? 0) ?? '-'}
              </p>
            </div>
          </div>

          <div className='flex-1 flex flex-col gap-4'>
            <h1 className='font-semibold font-lexend text-base'>
              Payment Details
            </h1>

            <div className='flex flex-col'>
              <p className='text-sm font-semibold font-inter flex items-center'>
                Payment ID : <span className="text-sm font-normal font-inter ml-2 text-[#484848]">
                  {paymentIdValue ? (
                    <>
                      {isLongPaymentId ? (
                        <Tooltip color='invert' content={paymentId}>
                          <span className="cursor-pointer underline decoration-dotted">
                            {displayPaymentValue}
                          </span>
                        </Tooltip>
                      ) : (
                        paymentId
                      )}
                    </>
                  ) : (
                    '-'
                  )}
                </span>
                {paymentIdValue && (
                  <PiCopy
                    onClick={() => handleCopy(paymentIdValue)}
                    className="cursor-pointer active:scale-[0.99] ml-2"
                  />
                )}
              </p>
              <p className='text-sm font-semibold font-inter flex items-center'>
                Refund ID :  <span className="text-sm font-normal font-inter ml-2 text-[#484848]">
                  {refundId ? (
                    <>
                      {isLongRefundId ? (
                        <Tooltip color='invert' content={refundIdString}>
                          <span className="cursor-pointer underline decoration-dotted">
                            {displayRefundValue}
                          </span>
                        </Tooltip>
                      ) : (
                        refundIdString
                      )}
                    </>
                  ) : (
                    'N/A'
                  )}
                </span>
                {refundId && (
                  <PiCopy
                    onClick={() => handleCopy(refundId)}
                    className="cursor-pointer active:scale-[0.99] ml-2"
                  />
                )}
              </p>
              <p className='text-sm font-semibold font-inter flex items-center'>
                Payment Method : <span className='text-sm font-normal font-inter ml-2 text-[#484848]'>{dataInvoice?.payment?.type ?? '-'}</span>
              </p>
            </div>
          </div>

          <div className='flex-1 flex flex-col gap-4'>
            <h1 className='font-semibold font-lexend text-base flex items-center gap-2'>
              Contact Details
              <Tooltip color='invert' content={fullAddress}>
                <span className='inline-flex items-center'>
                  <AiOutlineInfoCircle className='cursor-pointer' />
                </span>
              </Tooltip>
            </h1>

            <div className='flex flex-col'>
              <p className='text-sm font-semibold font-inter'>
                Name : <span className='text-sm font-normal font-inter ml-2 text-[#484848]'>{dataInvoice?.patient?.first_name ?? '-'} {dataInvoice?.patient?.middle_name} {dataInvoice?.patient?.last_name}</span>
              </p>
              <p className='text-sm font-semibold font-inter'>
                Email : <span className='text-sm font-normal font-inter ml-2 text-[#484848]'>{dataInvoice?.patient?.email ?? '-'}</span>
              </p>
              <p className='text-sm font-semibold font-inter flex items-center'>
                Mobile Number : <span className='text-sm font-normal font-inter ml-2 text-[#484848]'>{dataInvoice?.patient?.mobile_number ?? '-'}</span>
              </p>
              {/* <p className='text-sm font-semibold font-inter flex items-center'>
                Address : <span className='text-sm font-normal font-inter ml-2 text-[#484848]'>{dataInvoice?.patient?.address_line_1}{dataInvoice?.patient?.address_line_2 ? `, ${dataInvoice?.patient?.address_line_2}` : ''}</span>
              </p> */}
            </div>
          </div>

          <div className='flex-1 flex flex-col gap-4'>
            <h1 className='font-semibold font-lexend text-base'>
              Appointment Details
            </h1>

            <div className='flex flex-col'>
              <p className='text-sm font-semibold font-inter'>
                Date : <span className='text-sm font-normal font-inter ml-2 text-[#484848]'>{dataInvoice?.appointment?.date ? dayjs(dataInvoice?.date).utc().format('DD MMM YYYY') : '-'}</span>
              </p>
              <p className='text-sm font-semibold font-inter'>
                Type : <span className='text-sm font-normal font-inter ml-2 text-[#484848]'>{dataInvoice?.appointment?.type ?? '-'}</span>
              </p>
              <p className='text-sm font-semibold font-inter flex items-center'>
                Status : <span className='ml-2'>{getAptStatusBadge(dataInvoice?.status ?? 0) ?? '-'}</span>
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col'>
          <Table variant='classic'>
            <Table.Header>
              <Table.Row>
                <Table.Head>
                  PRODUCT & SERVICE
                </Table.Head>
                <Table.Head>
                  QUANTITY
                </Table.Head>
                <Table.Head>
                  PRICE
                </Table.Head>
                <Table.Head>
                  TOTAL
                </Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {dataInvoice?.items?.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell className='flex flex-col gap-2'>
                    <p className='font-medium text-sm text-[#333333]'>{item?.code}</p>
                    <p className='font-medium text-[12px] text-[#666666]'>{item?.description ?? '-'}</p>
                  </Table.Cell>
                  <Table.Cell className='text-[#666666] text-[12px] font-semibold'>{item?.qty ?? '-'}</Table.Cell>
                  <Table.Cell className='text-[#666666] text-[12px] font-semibold'>
                    {currencyData.active.symbol}{item?.amount ?? 0}
                  </Table.Cell>
                  <Table.Cell className='text-sm font-semibold text-[#333333]'>
                    {currencyData.active.symbol}{item?.total_amount ?? 0}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <div className='flex gap-2'>
          <div className='basis-[80%] flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <h1 className='font-semibold text-base font-lexend'>
                Notes
              </h1>
              <p className='text-[#484848] text-sm font-normal'>
                {dataInvoice?.note ?? '-'}
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='font-semibold text-base font-lexend'>
                Internal Notes
              </h1>
              <p className='text-[#484848] text-sm font-normal'>
                -
              </p>
            </div>
          </div>
          <div className='basis-[20%]  flex flex-col gap-4'>
            <div className='border-b border-[#E4E4E4] flex justify-between items-center py-4'>
              <h1 className='text-[#666666] font-medium text-sm'>
                Subtotal:
              </h1>
              <p className=' ml-2 font-semibold text-sm text-[#333333]'>
                ${dataInvoice?.amount ?? 0}
              </p>
            </div>
            <div className='flex justify-between items-center py-2'>
              <h1 className='text-[#111111] font-semibold text-base'>
                Total:
              </h1>
              <p className='text-[#111111] font-semibold text-base'>
                ${dataInvoice?.total_amount ?? 0}
              </p>
            </div>
          </div>
        </div>

        <div className='p-6 border border-[#E4E4E4] rounded-xl flex flex-col gap-4'>
          <h1 className='font-semibold text-base font-lexend'>Log History</h1>
          <Table variant='classic'>
            <Table.Header>
              <Table.Row>
                <Table.Head>
                  DATE & TIME
                </Table.Head>
                <Table.Head>
                  EVENT
                </Table.Head>
                <Table.Head>
                  SOURCE
                </Table.Head>
                <Table.Head>
                  PERFORMED BY
                </Table.Head>
                <Table.Head>
                  STATUS
                </Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {dataLogHistory && dataLogHistory?.length > 0 ? (
                dataLogHistory?.map((item: any, index: any) => (
                  <Table.Row key={index}>
                    <Table.Cell className='flex flex-col gap-2'>
                      -
                    </Table.Cell>
                    <Table.Cell className='text-[#666666] text-[12px] font-semibold'>
                      -
                    </Table.Cell>
                    <Table.Cell className='text-[#666666] text-[12px] font-semibold'>
                      -
                    </Table.Cell>
                    <Table.Cell className='text-sm font-semibold text-[#333333]'>
                      -
                    </Table.Cell>
                    <Table.Cell className='text-sm font-semibold text-[#333333]'>
                      -
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center py-6">
                    <Empty text="No Data" textClassName="mt-2" />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}
