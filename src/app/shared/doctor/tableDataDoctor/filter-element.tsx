'use client';

import React from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import PriceField from '@/app/shared/ui/controlled-table/price-field';
import StatusField from '@/app/shared/ui/controlled-table/status-field';
import { Badge, Text, Button } from 'rizzui';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';
import { useMedia } from '@core/hooks/use-media';

const statusOptions = [
  {
    value: 'completed',
    label: 'Completed',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
  },
  {
    value: 'refunded',
    label: 'Refunded',
  },
];

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  return (
    <>
      <DateFiled
        selectsRange
        className="w-full"
        isClearable
        onClear={() => {
          updateFilter('createdAt', [null, null]);
        }}
        selected={getDateRangeStateValues(filters['createdAt'][0])}
        startDate={getDateRangeStateValues(filters['createdAt'][0]) as Date}
        endDate={getDateRangeStateValues(filters['createdAt'][1]) as Date}
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
    </>
  );
}

function renderOptionDisplayValue(value: string) {
  switch (value.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            {value}
          </Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            {value}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium capitalize text-gray-600">
            {value}
          </Text>
        </div>
      );
  }
}
