'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import { Button } from 'rizzui';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';
import { useMedia } from '@core/hooks/use-media';
import cn from '@/core/utils/class-names';
import { appointmentTypes } from '@/data/appointment-data';
import CSelect from '@/app/shared/ui/select';

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
  setIsFilter: Dispatch<SetStateAction<boolean>>;
};

export const appointmentTypesOptions = Object.entries(appointmentTypes).map(
  ([value, label]) => ({ label, value })
);

const statusOptions = [
  { value: 1, label: 'Draft' },
  { value: 2, label: 'Pending' },
  { value: 3, label: 'Confirmed' },
  { value: 4, label: 'Finished' },
  { value: 5, label: 'Cancelled' },
];

const paymentStatusOptions = [
  { value: 1, label: 'Pending' },
  { value: 2, label: 'Paid' },
  { value: 3, label: 'Cancelled' },
];

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
  setIsFilter,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  return (
    <div
      className={cn(
        'flex',
        isMediumScreen ? 'flex-col gap-6' : 'flex-row items-center gap-3'
      )}
    >
      <DateFiled
        selectsRange
        dateFormat="dd MMM yyyy"
        className="w-full"
        isClearable
        onClear={() => {
          updateFilter('createdAt', [null, null]);
          setIsFilter(true)
        }}
        selected={getDateRangeStateValues(filters?.['createdAt']?.[0])}
        startDate={getDateRangeStateValues(filters?.['createdAt']?.[0]) as Date}
        endDate={getDateRangeStateValues(filters?.['createdAt']?.[1]) as Date}
        onChange={(date: any) => {
          updateFilter('createdAt', date);
        }}
        placeholderText="Select created date"
        {...(isMediumScreen && {
          inputProps: {
            label: 'Created Date',
            labelClassName: 'font-medium text-gray-700',
          },
        })}
      />

      <CSelect
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={statusOptions}
        value={filters['status']}
        onClear={() => {
          updateFilter('status', '');
        }}
        clearable
        onChange={(value: string) => {
          updateFilter('status', value);
          setIsFilter(true)
        }}
        {...(isMediumScreen && {
          label: 'Appointment Status',
          placeholder: 'Select appointment status',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={paymentStatusOptions}
        onClear={() => {
          updateFilter('payment_status', '');
        }}
        clearable
        value={filters['payment_status']}
        onChange={(value: string) => {
          updateFilter('payment_status', value);
          setIsFilter(true)
        }}
        {...(isMediumScreen && {
          label: 'Payment Status',
          placeholder: 'Select payment status',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select reschedule type"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={[
          {
            label: 'Yes',
            value: 'true',
          },
          {
            label: 'No',
            value: 'false',
          },
        ]}
        onClear={() => {
          updateFilter('by_reschedule', '');
        }}
        clearable
        value={filters['by_reschedule']}
        onChange={(value: string) => {
          updateFilter('by_reschedule', value);
          setIsFilter(true)
        }}
        {...(isMediumScreen && {
          label: 'By Reschedule',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select Inactive Patient Month"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={Array.from({ length: 12 }, (_, index) => ({
          label: `${index + 1} Month`,
          value: (index + 1),
        }))}
        onClear={() => {
          updateFilter('inactive_patients_months', '');
        }}
        clearable
        value={filters["inactive_patients_months"]}
        onChange={(value: string) => {
          updateFilter("inactive_patients_months", value);
          setIsFilter(true)
        }}
        {...(isMediumScreen && {
          label: "Inactive Patient Month",
          labelClassName: "font-medium text-gray-700",
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
