'use client';

import React from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import StatusField from '@/app/shared/ui/controlled-table/status-field';
import { Badge, Text, Button, Title } from 'rizzui';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';
import { useMedia } from '@core/hooks/use-media';
import cn from '@/core/utils/class-names';
import { appointmentTypes } from '@/data/appointment-data';

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};

export const appointmentTypesOptions = Object.entries(appointmentTypes).map(
  ([value, label]) => ({ label, value })
);

const statusOptions = [
  {
    value: 'Paid',
    label: 'Paid',
  },
  {
    value: 'Unpaid',
    label: 'Unpaid',
  },
  {
    value: 'Refunded',
    label: 'Refunded',
  },
];

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  return (
    <div
      className={cn(
        'flex',
        isMediumScreen ? 'flex-col gap-6' : 'flex-row items-center gap-3'
      )}
    >
      {!isMediumScreen && (
        <Title
          as="h3"
          className="rizzui-title-h3 pe-4 text-base font-semibold sm:text-lg"
        >
          All Appointment
        </Title>
      )}

      {/* <DateFiled
        selected={getDateRangeStateValues(filters['date'][0])}
        startDate={getDateRangeStateValues(filters['date'][0]) as Date}
        endDate={getDateRangeStateValues(filters['date'][1]) as Date}
        selectsRange
        className="w-full"
        dateFormat="dd MMM yyyy"
        onChange={(dates: [Date | null, Date | null]) => {
          updateFilter('date', dates);
        }}
        placeholderText="Select created date"
        {...(isMediumScreen && {
          inputProps: {
            label: 'Created Date',
            labelClassName: 'font-medium text-gray-700',
          },
        })}
        maxDate={new Date()}
      /> */}
      <StatusField
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={statusOptions}
        value={filters['appointment_status']}
        onChange={(value: string) => {
          updateFilter('appointment_status', value);
        }}
        getOptionValue={(option: { value: any }) => option.value}
        {...(isMediumScreen && {
          label: 'APPOINTMENT STATUS',
          labelClassName: 'font-medium text-gray-700',
        })}
      />
      <StatusField
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={statusOptions}
        value={filters['payment_status']}
        onChange={(value: string) => {
          updateFilter('payment_status', value);
        }}
        getOptionValue={(option: { value: any }) => option.value}
        {...(isMediumScreen && {
          label: 'PAYMENT STATUS',
          labelClassName: 'font-medium text-gray-700',
        })}
      />
      <StatusField
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={statusOptions}
        value={filters['by_reschedule']}
        onChange={(value: string) => {
          updateFilter('by_reschedule', value);
        }}
        getOptionValue={(option: { value: any }) => option.value}
        {...(isMediumScreen && {
          label: 'BY RESCHEDULE',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      {isFiltered ? (
        <Button
          size="sm"
          onClick={() => {
            handleReset();
          }}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      ) : null}
    </div>
  );
}
