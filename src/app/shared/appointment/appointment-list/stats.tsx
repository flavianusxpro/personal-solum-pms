'use client';

import { Button, Loader } from 'rizzui';
import cn from '@core/utils/class-names';
import { useScrollableSlider } from '@core/hooks/use-scrollable-slider';
import { IconType } from 'react-icons/lib';
import {
  PiCalendarCheck,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCheckCircle,
  PiClock,
  PiPhoneSlash,
  PiArrowDownRight,
  PiArrowUpRight,
  PiBookBookmark,
  PiCheckBold,
} from 'react-icons/pi';
import { SetStateAction, useEffect, useMemo } from 'react';
import { useGetSummaryAppointments } from '@/hooks/useAppointment';

type AppointmentStatsType = {
  className?: string;
  setRange?: React.Dispatch<SetStateAction<string | null | undefined>>;
  range?: string | null
  statusChanged?: boolean;
  setStatusChanged?: React.Dispatch<SetStateAction<boolean>> | undefined
};

export type StatType = {
  icon: IconType;
  title: string;
  amount: string;
  increased: boolean;
  percentage: string;
  iconWrapperFill?: string;
  className?: string;
  yesterday?: boolean;
  keyRange: string;
};

export type StatCardProps = {
  className?: string;
  transaction: StatType;
  range?: string | null;
  setRange?: React.Dispatch<SetStateAction<string | null | undefined>>;
};

function StatCard({ className, transaction, range, setRange }: StatCardProps) {
  const { icon, title, amount, increased, percentage, iconWrapperFill, yesterday } =
    transaction;
  const Icon = icon;
  const isActive = range === transaction.keyRange

  return (
    <div
      className={cn(
        'w-full rounded-[14px] border border-[#E4E4E4] cursor-pointer p-4 @container',
        isActive
          ? 'bg-[#3872F9]'
          : 'text-gray-900',
        className
      )}
      onClick={() =>
        setRange?.((prev) =>
          prev === transaction.keyRange ? null : transaction.keyRange
        )
      }
    >
      {/* {isActive && (
        <span className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-md">
          <PiCheckBold className="text-[#3872F9] w-3 h-3" />
        </span>
      )} */}

      <div className="mb-4 gap-2 flex items-center">
        <span
          style={{ backgroundColor: iconWrapperFill }}
          className={cn(
            'flex rounded-[14px] p-3',
            isActive ? '!bg-white text-[#3872F9]' : 'text-gray-0 dark:text-gray-900'
          )}
        >
          <Icon className="h-auto w-[25px]" />
        </span>
        <div className="flex flex-col">
          <p className={cn('font-medium text-[16px] text-wrap', isActive ? 'text-white' : 'text-[#787878]')}>{title}</p>
          <p className={cn("text-lg font-bold 2xl:text-[20px] 3xl:text-3xl", isActive ? 'text-white' : 'dark:text-gray-700')}>
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
              "flex items-center justify-center w-8 h-8 rounded-full",
              isActive
                ? "text-[#3872F9] bg-white"
                : increased
                  ? "bg-green-lighter/70 dark:bg-green-dark/30"
                  : "bg-red-lighter/70 dark:bg-red-dark/30"
            )}
          >
            {increased ? (
              <PiArrowUpRight className="h-4 w-4" />
            ) : (
              <PiArrowDownRight className="h-4 w-4" />
            )}
          </span>
          <span className={cn("font-semibold leading-none", isActive && 'text-white')}>
            {increased ? '+' : '-'}
            {percentage}%
          </span>
        </div>
        <span className={cn("truncate leading-none", isActive ? 'text-white' : 'text-gray-500')}>
          {increased ? 'Increased' : 'Decreased'} {yesterday ? 'yesterday' : 'last month'}
        </span>
      </div>
    </div>
  );
}

export function StatGrid({ data, range, setRange }: {
  data: StatType[], range?: string | null | undefined, setRange?: React.Dispatch<SetStateAction<string | null | undefined>>;
}) {
  return (
    <>
      {data.map((stat: StatType, index: number) => {
        return (
          <StatCard
            key={'stat-card-' + index}
            transaction={stat}
            className="min-w-[200px]"
            range={range}
            setRange={setRange}
          />
        );
      })}
    </>
  );
}

export default function AppointmentListStats({
  className,
  range,
  setRange,
  statusChanged,
  setStatusChanged
}: AppointmentStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  const { data, isLoading, refetch, isSuccess } = useGetSummaryAppointments();
  const statData: StatType[] = useMemo(
    () => [
      {
        title: 'Draft Appointment',
        increased: data?.draft_appointment_increased_last_month?.status === 'increase' ? true : false,
        keyRange: 'draft',
        amount: data?.draft_appointment.toString() || '0',
        icon: PiBookBookmark,
        percentage: data?.draft_appointment_increased_last_month?.percentage.toString() || '0',
        iconWrapperFill: '#787878',
      },
      {
        title: 'Upcoming Appointment',
        increased: data?.upcoming_appointment_increased_last_month?.status === "increase" ? true : false,
        keyRange: 'upcoming',
        amount: data?.upcoming_appointment.toString() || '0',
        icon: PiCalendarCheck,
        iconWrapperFill: '#F5A623',
        percentage: data?.upcoming_appointment_increased_last_month?.percentage.toString() || '0',
      },
      {
        title: 'Today Appointment',
        increased: data?.today_appointment_increased_yesterday?.status === 'increase' ? true : false,
        keyRange: 'today',
        amount: data?.today_appointment.toString() || '0',
        icon: PiCheckCircle,
        percentage: data?.today_appointment_increased_yesterday?.percentage.toString() || '0',
        iconWrapperFill: '#11843C',
        yesterday: true
      },
      {
        title: 'Finished Appointment',
        increased: data?.finished_appointment_increased_last_month?.status === 'increase' ? true : false,
        keyRange: 'finished',
        amount: data?.finished_appointment.toString() || '0',
        icon: PiClock,
        percentage: data?.finished_appointment_increased_last_month?.percentage.toString() || '0',
        iconWrapperFill: '#8A63D2',
      },
      {
        title: 'Cancelled Appointment',
        increased: data?.cancelled_appointment_increased_last_month?.status === 'increase' ? true : false,
        keyRange: 'cancelled',
        amount: data?.cancelled_appointment.toString() || '0',
        icon: PiPhoneSlash,
        percentage: data?.cancelled_appointment_increased_last_month?.percentage.toString() || '0',
        iconWrapperFill: '#C50000',
      },
    ],
    [
      data?.cancelled_appointment,
      data?.finished_appointment,
      data?.today_appointment,
      data?.upcoming_appointment,
      data?.cancelled_appointment_increased_last_month,
      data?.finished_appointment_increased_last_month,
      data?.today_appointment_increased_yesterday,
      data?.upcoming_appointment_increased_last_month,
      data?.draft_appointment,
      data?.draft_appointment_increased_last_month,
    ]
  );

  useEffect(() => {
    if (statusChanged) refetch()
  }, [statusChanged])

  useEffect(() => {
    if (isSuccess && statusChanged) setStatusChanged?.(false)
  }, [statusChanged])

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
          {isLoading ? <Loader className="" /> : <StatGrid data={statData} range={range} setRange={setRange} />}
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
