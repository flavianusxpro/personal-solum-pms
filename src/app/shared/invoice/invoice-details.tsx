'use client';

import { Badge, Title, Text, Loader, Button } from 'rizzui';
import Table from '../ui/table';
import { useGetInvoiceById } from '@/hooks/useInvoice';
import Logo from '@core/components/logo';
import dayjs from 'dayjs';
import { IGetInvoiceByIdResponse } from '@/types/ApiResponse';
import PageHeader from '../ui/page-header';
import { routes } from '@/config/routes';
import PrintButton from '../ui/print-button';
import PayNowButton from '../ui/paynow-button';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { usePDF } from 'react-to-pdf';
import Link from 'next/link';
import { currencyAtom } from '@/store/currency';
import { useAtom } from 'jotai';

const pageHeader = {
  title: 'Invoice Details',
  breadcrumb: [
    {
      href: routes.invoice.home,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Invoice',
    },
    {
      name: 'Details',
    },
  ],
};

function InvoiceDetailsListTable({
  data,
}: {
  data?: IGetInvoiceByIdResponse['data']['items'];
}) {
  const [currencyData] = useAtom(currencyAtom);

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Product & Service',
      dataIndex: 'code',
      key: 'code',
      width: 250,
      render: (
        _: string,
        item: IGetInvoiceByIdResponse['data']['items'][number]
      ) => (
        <>
          {item.name === 'Appointment' ? (
            <>
              <Link
                href={routes.appointment.appointmentList}
                className="mb-0.5 text-sm font-medium hover:underline"
              >
                {item?.code} - {item?.name}
              </Link>
              <Text
                as="p"
                className="max-w-[250px] overflow-hidden truncate text-sm text-gray-500"
              >
                {item?.description}
              </Text>
            </>
          ) : (
            <>
              <Title as="h6" className="mb-0.5 text-sm font-medium">
                {item?.code} - {item?.name}
              </Title>
              <Text
                as="p"
                className="max-w-[250px] overflow-hidden truncate text-sm text-gray-500"
              >
                {item?.description}
              </Text>
            </>
          )}
        </>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      width: 200,
    },
    {
      title: 'Unit Price',
      dataIndex: 'amount',
      key: 'amount',
      width: 200,
      render: (value: string) => (
        <Text className="font-medium">
          {currencyData.active.symbol}

          {Number(value)}
        </Text>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total_amount',
      key: 'total_amount',
      width: 200,
      render: (value: string) => (
        <Text className="font-medium">
          {currencyData.active.symbol}

          {Number(value)}
        </Text>
      ),
    },
  ] as any;
  return (
    <Table
      data={data}
      columns={columns}
      variant="minimal"
      rowKey={(record) => record.id}
      scroll={{ x: 660 }}
      className="mb-11"
    />
  );
}

export default function InvoiceDetails({ id }: { id: string }) {
  const [currencyData] = useAtom(currencyAtom);

  const { data: dataInvoice, isLoading } = useGetInvoiceById(id);
  const contentRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;
  const reactToPrintFn = useReactToPrint({ content: () => contentRef.current });
  const { toPDF, targetRef } = usePDF({
    filename: `Invoice-${dataInvoice?.id}.pdf`,
  });

  if (isLoading) return <Loader className="h-10 w-10" />;
  console.log(dataInvoice);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <PayNowButton onClick={() => {}} />
          <PrintButton onClick={reactToPrintFn} />
          <Button onClick={toPDF} className="w-full @lg:w-auto">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            Download
          </Button>
        </div>
      </PageHeader>
      <div
        ref={(el) => {
          if (el) {
            contentRef.current = el;
            targetRef.current = el;
          }
        }}
        className="w-full rounded-xl border border-muted p-5 text-sm sm:p-6 lg:p-8 2xl:p-10"
      >
        <div className="mb-12 flex items-start justify-between md:mb-16 md:flex-row">
          <Logo className="max-w-[155px]" />
          <div className="mb-4 md:mb-0">
            {getPaymentStatusBadge(dataInvoice?.status as number)}
            <Title as="h6">#{dataInvoice?.id}</Title>
            <Text className="mt-0.5 text-gray-500">Invoice Number</Text>
          </div>
        </div>

        <div className="mb-12 grid gap-4 xs:grid-cols-3 sm:grid-rows-1">
          <div className="">
            <Title as="h6" className="mb-3.5 font-semibold">
              From
            </Title>
            <Text className="mb-1.5 text-sm font-semibold uppercase">
              {dataInvoice?.clinic.name}
            </Text>
            <Text className="mb-1.5">{dataInvoice?.clinic.email}</Text>
            <Text className="mb-1.5">{dataInvoice?.clinic.address}</Text>
            <Text className="mb-4 sm:mb-6 md:mb-8">
              {dataInvoice?.clinic.mobile_number}
            </Text>
            {/* <Text className="mb-4 sm:mb-6 md:mb-8">
              {dataInvoice?.clinic.email}
            </Text> */}

            <div>
              <Text className="mb-2 text-sm font-semibold">Creation Date</Text>
              <Text>
                {dayjs(dataInvoice?.created_at).format('MMM DD, YYYY')}
              </Text>
            </div>
          </div>

          <div className="mt-4 xs:mt-0">
            <Title as="h6" className="mb-3.5 font-semibold">
              Bill To
            </Title>
            <Text className="mb-1.5 text-sm font-semibold uppercase">
              Patient
            </Text>
            <Text className="mb-1.5">
              {dataInvoice?.patient.first_name} {dataInvoice?.patient.last_name}
            </Text>
            <Text className="mb-1.5">
              {(() => {
                const line1 = [
                  dataInvoice?.patient?.unit_number,
                  dataInvoice?.patient?.street_name,
                ]
                  .filter(Boolean)
                  .join(' ');

                const line2 = [
                  dataInvoice?.patient?.suburb,
                  dataInvoice?.patient?.postcode,
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <>
                    {line1 && (
                      <>
                        {line1}
                        <br />
                      </>
                    )}
                    {line2 && <>{line2}</>}
                  </>
                );
              })()}
            </Text>

            <Text className="mb-4 sm:mb-6 md:mb-8">
              {dataInvoice?.patient.mobile_number}
            </Text>
            <div>
              <Text className="mb-2 text-sm font-semibold">Due Date</Text>
              <Text>{dayjs(dataInvoice?.due_date).format('MMM DD, YYYY')}</Text>
            </div>
          </div>
        </div>

        <InvoiceDetailsListTable data={dataInvoice?.items} />

        <div className="flex flex-col-reverse items-start justify-between border-t border-muted pb-4 pt-8 xs:flex-row">
          <div className="flex flex-col gap-6">
            <div className="mt-6 max-w-md pe-4 xs:mt-0">
              <Title
                as="h6"
                className="mb-1 text-xs font-semibold uppercase xs:mb-2 xs:text-sm"
              >
                Notes
              </Title>
              <Text className="leading-[1.7]">{dataInvoice?.note || '-'}</Text>
            </div>
            <div className="mt-6 max-w-md pe-4 xs:mt-0">
              <Title
                as="h6"
                className="mb-1 text-xs font-semibold uppercase xs:mb-2 xs:text-sm"
              >
                Internal Notes
              </Title>
              <Text className="leading-[1.7]">
                {dataInvoice?.internal_note || '-'}
              </Text>
            </div>
          </div>

          <div className="w-full max-w-sm">
            <Text className="flex items-center justify-between border-b border-muted pb-3.5 lg:pb-5">
              Subtotal:{' '}
              <Text as="span" className="font-semibold">
                {currencyData.active.symbol}
                {Number(dataInvoice?.amount)}
              </Text>
            </Text>
            <Text className="flex items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Tax Fee:
              <Text as="span" className="font-semibold">
                {Number(dataInvoice?.tax_fee)}%
              </Text>
            </Text>
            <Text className="flex items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Other Fee:{' '}
              <Text as="span" className="font-semibold">
                ${Number(dataInvoice?.other_fee)}
              </Text>
            </Text>
            <Text className="flex items-center justify-between pt-4 text-base font-semibold text-gray-900 lg:pt-5">
              Total:{' '}
              <Text as="span">
                {' '}
                {currencyData.active.symbol}
                {Number(dataInvoice?.total_amount)}
              </Text>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}

function getPaymentStatusBadge(status: number) {
  switch (status) {
    case 1:
      return (
        <Badge
          variant="flat"
          color="info"
          rounded="md"
          className="mb-3 md:mb-2"
        >
          Draft
        </Badge>
      );
    case 2:
      return (
        <Badge
          variant="flat"
          color="info"
          rounded="md"
          className="mb-3 md:mb-2"
        >
          Open
        </Badge>
      );
    case 3:
      return (
        <Badge
          variant="flat"
          color="success"
          rounded="md"
          className="mb-3 md:mb-2"
        >
          Paid
        </Badge>
      );
    case 4:
      return (
        <Badge
          variant="flat"
          color="secondary"
          rounded="md"
          className="mb-3 md:mb-2"
        >
          Void
        </Badge>
      );
    default:
      return (
        <Badge
          variant="flat"
          color="secondary"
          rounded="md"
          className="mb-3 md:mb-2"
        >
          {status}
        </Badge>
      );
  }
}
