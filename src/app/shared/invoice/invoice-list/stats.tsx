'use client';

import { Button, Loader } from 'rizzui';
import cn from '@core/utils/class-names';
import { useScrollableSlider } from '@core/hooks/use-scrollable-slider';
import {
  PiCaretLeftBold,
  PiCaretRightBold,
  PiArrowDownRight,
  PiArrowUpRight,
} from 'react-icons/pi';
import { useMemo } from 'react';
import {
  CarbonRuleCancelled,
  CarbonRuleDraft,
  TimeWhiteIcon,
  OrderApproveOutline,
  WalletWhiteIcon,
} from '@public/index';
import Image from 'next/image';
import { useGetInvoices } from '@/hooks/useInvoice';
import { summaryInvoiceAtom } from '@/store/invoice';
import { useAtomValue } from 'jotai';

type InvoiceStatsType = {
  className?: string;
};

export type StatType = {
  icon: any;
  title: string;
  amount: string;
  increased: boolean;
  percentage: string;
  iconWrapperFill?: string;
  className?: string;
  yesterday?: boolean;
};

export type StatCardProps = {
  className?: string;
  transaction: StatType;
};

function StatCard({ className, transaction }: StatCardProps) {
  const {
    icon,
    title,
    amount,
    increased,
    percentage,
    iconWrapperFill,
    yesterday,
  } = transaction;
  //   const Icon = icon;

  return (
    <div
      className={cn(
        'w-full rounded-[14px] border border-gray-300 p-6 @container',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <span
          style={{ backgroundColor: iconWrapperFill }}
          className={cn(
            'flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900'
          )}
        >
          <Image src={icon} alt="icon" className="h-auto w-[20px]" />
        </span>
        <div className="space-y-1">
          <p className="font-medium text-gray-500">{title}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-700 2xl:text-[20px] 3xl:text-3xl">
            {amount}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            'flex items-center gap-1',
            increased ? 'text-green-dark' : 'text-red-dark'
          )}
        >
          <span
            className={cn(
              'flex rounded-full px-2.5 py-1.5',
              increased
                ? 'bg-green-lighter/70 dark:bg-green-dark/30'
                : 'bg-red-lighter/70 dark:bg-red-dark/30'
            )}
          >
            {increased ? (
              <PiArrowUpRight className="h-auto w-4" />
            ) : (
              <PiArrowDownRight className="h-auto w-4" />
            )}
          </span>
          <span className="font-semibold leading-none">
            {increased ? '+' : '-'}
            {percentage}%
          </span>
        </div>
        <span className="truncate leading-none text-gray-500">
          {increased ? 'Increased' : 'Decreased'}&nbsp;{' '}
          {yesterday ? 'yesterday' : 'last month'}
        </span>
      </div>
    </div>
  );
}

export function StatGrid({ data }: { data: StatType[] }) {
  return (
    <>
      {data.map((stat: StatType, index: number) => {
        return (
          <StatCard
            key={'stat-card-' + index}
            transaction={stat}
            className="min-w-[300px]"
          />
        );
      })}
    </>
  );
}

export default function InvoiceListStats({ className }: InvoiceStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  const { isLoading } = useGetInvoices({
    page: 1,
    perPage: 1000,
  });
  const summaryInvoice = useAtomValue(summaryInvoiceAtom);

  const statData: StatType[] = useMemo(
    () => [
      {
        title: 'Draft',
        increased: true,
        amount: summaryInvoice?.total_draft?.toString() || '0',
        icon: CarbonRuleDraft,
        iconWrapperFill: '#1A55EE',
        percentage: summaryInvoice?.total_draft?.toString() || '0',
      },
      {
        title: 'Awaiting Approval',
        increased: true,
        amount: summaryInvoice?.total_awaiting_approval?.toString() || '0',
        icon: TimeWhiteIcon,
        percentage: summaryInvoice?.total_awaiting_approval?.toString() || '0',
        iconWrapperFill: '#ED3C59',
        yesterday: true,
      },
      {
        title: 'Approve',
        increased: false,
        amount: summaryInvoice?.total_approve?.toString() || '0',
        icon: OrderApproveOutline,
        percentage: summaryInvoice?.total_approve?.toString() || '0',
        iconWrapperFill: '#08CB94',
      },
      {
        title: 'Waiting Payment',
        increased: true,
        amount: summaryInvoice?.total_cancelled?.toString() || '0',
        icon: WalletWhiteIcon,
        percentage: summaryInvoice?.total_cancelled?.toString() || '0',
        iconWrapperFill: '#F5A623',
      },
      {
        title: 'Cancelled',
        increased: true,
        amount: summaryInvoice?.total_cancelled?.toString() || '0',
        icon: CarbonRuleCancelled,
        percentage: summaryInvoice?.total_cancelled?.toString() || '0',
        iconWrapperFill: '#7824B3',
      },
    ],
    [
      summaryInvoice?.total_draft,
      summaryInvoice?.total_awaiting_approval,
      summaryInvoice?.total_approve,
      summaryInvoice?.total_cancelled,
    ]
  );

  return (
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden',
        className
      )}
    >
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute -left-1 top-0 z-10 !h-full w-20 !justify-start rounded-none bg-gradient-to-r from-gray-0 via-gray-0/70 to-transparent px-0 ps-1 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>
      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar-x grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6"
        >
          {isLoading ? <Loader className="" /> : <StatGrid data={statData} />}
        </div>
      </div>
      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="dark: !absolute -right-2 top-0 z-10 !h-full w-20 !justify-end rounded-none bg-gradient-to-l from-gray-0 via-gray-0/70 to-transparent px-0 pe-2 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
  );
}
