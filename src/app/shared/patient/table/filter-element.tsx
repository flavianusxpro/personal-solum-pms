'use client';

import React from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/app/shared/controlled-table/date-field';
import StatusField from '@/app/shared/controlled-table/status-field';
import { Badge, Text, Button } from 'rizzui';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';
import { useMedia } from '@core/hooks/use-media';

const statusOptions = [
  {
    value: '1',
    label: 'Active',
  },
  {
    value: '0',
    label: 'InActive',
  },
  {
    value: '2',
    label: 'Suspended',
  },
];

const conditionOptions = [
  {
    value: 'no-followup',
    label: 'No Follow Up',
  },
  {
    value: 'no-in-last-3-months',
    label: 'No Appointment In Last 3 Months',
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
      {/* <PriceField
        value={filters['price']}
        onChange={(data) => updateFilter('price', data)}
        label={'Price'}
      /> */}
      <DateFiled
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
      />
      <StatusField
        options={statusOptions}
        value={filters['status']}
        onChange={(value: string) => {
          updateFilter('status', value);
        }}
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option) => renderOptionDisplay(option.label)}
        {...(isMediumScreen && {
          label: 'Status',
          labelClassName: 'font-medium text-gray-700',
        })}
        dropdownClassName="h-auto z-10 bg-white/90 dark:bg-gray-800/90"
      />
      <StatusField
        options={conditionOptions}
        value={filters['condition']}
        onChange={(value: string) => {
          updateFilter('condition', value);
        }}
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) =>
          renderConditionOptionDisplayValue(option.value)
        }
        displayValue={(selected: string) =>
          renderConditionOptionDisplayValue(selected)
        }
        {...(isMediumScreen && {
          label: 'Condition',
          labelClassName: 'font-medium text-gray-700',
        })}
        dropdownClassName="h-auto bg-white/90 dark:bg-gray-800/90"
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

function renderOptionDisplay(value: string) {
  switch (value) {
    case statusOptions[0].label:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      );
    case statusOptions[1].label:
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

function renderConditionOptionDisplayValue(value: string) {
  switch (value.toLowerCase()) {
    case '1':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      );
    case '0':
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
