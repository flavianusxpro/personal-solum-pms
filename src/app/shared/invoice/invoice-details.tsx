'use client';

import { Text, Loader, Button, Table } from 'rizzui';
import { useGetInvoiceById } from '@/hooks/useInvoice';
import dayjs from '@/config/dayjs';
import { IGetInvoiceByIdResponse } from '@/types/ApiResponse';
import PageHeader from '../ui/page-header';
import { routes } from '@/config/routes';
import PrintButton from '../ui/print-button';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { useRef } from 'react';
import PDFInvoice, { PDFInvoiceRef } from './modal/pdf-invoice';
import { currencyAtom } from '@/store/currency';
import { useAtom } from 'jotai';

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
  const getInvoiceStatusBadge = (status: number) => {
    switch (status) {
      case 1:
        return (
          <div className="flex text-center px-2 py-1 rounded-[4px] items-center bg-orange-dark">
            <Text className="text-white font-normal text-sm">Draft</Text>
          </div>
        );
      case 2:
        return (
          <div className="flex text-center px-2 py-1 rounded-[4px] items-center bg-gray-dark">
            <Text className="text-white font-normal text-sm">Awaiting Payment</Text>
          </div>
        );
      case 3:
        return (
          <span className="flex text-center px-2 py-1 rounded-[4px] items-center bg-green-dark">
            <Text className="text-white font-normal text-sm">Paid</Text>
          </span>
        );
      case 4:
        return (
          <div className="flex text-center px-2 py-1 rounded-[4px] items-center bg-orange-600">
            <Text className="text-white font-normal text-sm">Void</Text>
          </div>
        );
      case 5:
        return (
          <div className="flex text-center px-2 py-1 rounded-[4px] items-center bg-slate-500">
            <Text className="text-white font-normal text-sm">Refund</Text>
          </div>
        );
      default:
        return (
          <div className="flex text-center px-2 py-1 rounded-[4px] items-center bg-gray-600">
            <Text className="text-white font-normal text-sm">{status}</Text>
          </div>
        );
    }
  }

  const getAptStatusBadge = (status: number | string) => {
    switch (status) {
      case 7:
        return (
          <div className="flex text-center px-2 justify-center py-1 rounded-[4px] items-center bg-green-dark">
            <p className="text-white font-normal text-sm">No Show</p>
          </div>
        );
      case 6:
        return (
          <div className="flex text-center px-2 justify-center py-1 rounded-[4px] items-center bg-text-green-500">
            <p className="text-white font-normal text-sm">On Going</p>
          </div>
        );
      case 5:
        return (
          <div className="flex text-center px-2 justify-center py-1 rounded-[4px] items-center bg-red">
            <p className="text-white font-normal text-sm">Canceled</p>
          </div>
        );
      case 4:
        return (
          <div className="flex text-center px-2 justify-center py-1 rounded-[4px] items-center bg-green-dark">
            <p className="text-white font-normal text-sm">Completed</p>
          </div>
        );
      case 3:
        return (
          <div className="flex text-center px-2 justify-center py-1 rounded-[4px] items-center bg-blue-500">
            <p className="text-white font-normal text-sm">Checked In</p>
          </div>
        );
      case 2:
        return (
          <div className="flex text-center px-2 justify-center py-1 rounded-[4px] items-center bg-yellow-600">
            <p className="text-white font-normal text-sm">Scheduled</p>
          </div>
        );
      case 1:
        return (
          <div className="flex text-center px-2 justify-center py-1 rounded-[4px] items-center bg-red-dark">
            <p className="text-white font-normal text-sm">Draft</p>
          </div>
        );
      default:
        return (
          <div className="flex text-center px-2 justify-center py-1 rounded-[4px] items-center bg-blue-600">
            <p className="text-white font-normal text-sm">{status}</p>
          </div>
        );
    }
  }

  const pdfInvoiceRef = useRef<PDFInvoiceRef>(null);
  const { data: dataInvoice, isLoading } = useGetInvoiceById(id);
  const contentRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;

  if (isLoading) return <Loader className="h-10 w-10" />;

  const handlePrint = () => {
    pdfInvoiceRef.current?.handlePrint();
  };

  const handleDownload = () => {
    pdfInvoiceRef.current?.handleDownload();
  };

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
        <div className='grid grid-cols-2 md:grid-cols-4 border border-[#E4E4E4] rounded-xl p-6 gap-2'>
          <div className='flex flex-col gap-3'>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>Payment ID:</span>
              <span className='ml-3 font-semibold text-base'>{dataInvoice?.payment?.stripeId ? (dataInvoice?.payment?.stripeId ?? '-') : (dataInvoice?.payment?.id ?? '-')}</span>
            </h1>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>Invoice No:</span>
              <span className='ml-3 font-semibold text-base'>#INV-{dataInvoice?.id ?? '.'}</span>
            </h1>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>
                Invoice Status:
              </span>
              <span className='ml-3 font-semibold text-base'>{getInvoiceStatusBadge(dataInvoice?.status ?? 0) ?? '-'}</span>
            </h1>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>
                Appointment Status:
              </span>
              <span className='ml-3 font-semibold text-base'>{getAptStatusBadge(dataInvoice?.status ?? 0) ?? '-'}</span>
            </h1>
          </div>

          <div className='flex flex-col gap-3'>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>
                Refund ID:
              </span>
              <span className='ml-3 text-sm text-[#484848] font-normal'>{dataInvoice?.stripe_refund_id ?? '-'}</span>
            </h1>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>
                Invoice Date:
              </span>
              <span className='ml-3 text-sm text-[#484848] font-normal'>{dataInvoice?.date ? dayjs(dataInvoice?.date).utc().format('DD MMM YYYY') : '-'}</span>
            </h1>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>
                Appointment Date:
              </span>
              <span className='ml-3 text-sm text-[#484848] font-normal'>
                {dataInvoice?.appointment?.date ? dayjs(dataInvoice?.date).utc().format('DD MMM YYYY') : '-'}
              </span>
            </h1>
          </div>

          <div className='flex flex-col gap-3'>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>
                Patient Name:
              </span>
              <span className='ml-3 text-sm text-[#484848] font-normal'>
                {dataInvoice?.patient?.first_name ?? '-'} {dataInvoice?.patient?.middle_name} {dataInvoice?.patient?.last_name}
              </span>
            </h1>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>
                Patient Address:
              </span>
              <span className='ml-3 text-sm text-[#484848] font-normal'>
                {dataInvoice?.patient?.address_line_1}{dataInvoice?.patient?.address_line_2 ? `, ${dataInvoice?.patient?.address_line_2}` : ''}
              </span>
            </h1>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>
                Patient Email:
              </span>
              <span className='ml-3 text-sm text-[#484848] font-normal'>
                {dataInvoice?.patient?.email ?? '-'}
              </span>
            </h1>
          </div>

          <div className='flex flex-col gap-3'>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>
                Patient Mobile Number:
              </span>
              <span className='ml-3 text-sm text-[#484848] font-normal'>
                {dataInvoice?.patient?.mobile_number ?? '-'}
              </span>
            </h1>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>
                Payment Method:
              </span>
              <span className='ml-3 text-sm text-[#484848] font-normal'>
                {dataInvoice?.payment?.type ?? '-'}
              </span>
            </h1>
            <h1 className='font-semibold text-sm flex items-center font-inter'>
              <span>
                Clinic Name:
              </span>
              <span className='ml-3 text-sm text-[#484848] font-normal'>
                {dataInvoice?.clinic?.name ?? '-'}
              </span>
            </h1>
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='p-6 border border-[#E4E4E4] rounded-t-lg'>
            <h1 className='font-semibold text-lg font-inter'>
              Item Details
            </h1>
          </div>
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

        <div className='grid grid-cols-1 md:grid-cols-2 border border-[#E4E4E4] rounded-xl p-6'>
          <div className='flex'>
            <h1 className='font-semibold text-sm text-[#111111] font-inter'>Notes:</h1>
            <p className='font-normal font-inter text-sm text-[#484848] ml-4'>
              {dataInvoice?.note ?? '-'}
            </p>
          </div>
          <div className='flex'>
            <h1 className='font-semibold text-sm text-[#111111] font-inter'>
              Internal Notes:
            </h1>
            <p className='font-normal font-inter text-sm text-[#484848] ml-4'>
              -
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
