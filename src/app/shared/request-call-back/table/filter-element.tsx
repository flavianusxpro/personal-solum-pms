'use client';

import React from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import PriceField from '@/app/shared/ui/controlled-table/price-field';
import StatusField from '@/app/shared/ui/controlled-table/status-field';
import { Badge, Text, Button } from 'rizzui';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';
import { useMedia } from '@core/hooks/use-media';

export const requestStatusOptions = [
  {
    value: 'new',
    label: 'New',
  },
  {
    value: 'scheduled',
    label: 'Scheduled',
  },
  {
    value: 'in_progress',
    label: 'In Progress',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
  {
    value: 'no_answer',
    label: 'No Answer',
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
  },
  {
    value: 'closed',
    label: 'Closed',
  },
  { label: 'Waiting for Call', value: 'waiting_for_call' },
  { label: 'Already Called', value: 'already_called' },
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
  const isMediumScreen = useMedia('(max-width: 6000px)', false);
  return (
    <>
      {/* <PriceField
        value={filters['price']}
        onChange={(data) => updateFilter('price', data)}
        label={'Price'}
      /> */}
      {/* <DateFiled
        selectsRange
        className="w-full"
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
      <DateFiled
        selectsRange
        className="w-full"
        selected={getDateRangeStateValues(filters['updatedAt'][0])}
        startDate={getDateRangeStateValues(filters['updatedAt'][0]) as Date}
        endDate={getDateRangeStateValues(filters['updatedAt'][1]) as Date}
        onChange={(date: any) => {
          updateFilter('updatedAt', date);
        }}
        placeholderText="Select modified date"
        {...(isMediumScreen && {
          inputProps: {
            label: 'Due Date',
            labelClassName: 'font-medium text-gray-700',
          },
        })}
      /> */}
      <StatusField
        options={requestStatusOptions}
        value={filters['status']}
        onChange={(value: string) => {
          updateFilter('status', value);
        }}
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) =>
          renderOptionDisplayValue(option.value)
        }
        displayValue={(selected: string) => renderOptionDisplayValue(selected)}
        {...(isMediumScreen && {
          label: 'Status',
          labelClassName: 'font-medium text-gray-700',
        })}
        dropdownClassName="h-auto"
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
