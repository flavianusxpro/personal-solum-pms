'use client';

import React from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import { Badge, Text, Button } from 'rizzui';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';
import { useMedia } from '@core/hooks/use-media';
import CSelect from '../../ui/select';

const statusOptions = [
  {
    value: '1',
    label: 'Active',
  },
  {
    value: '0',
    label: 'Inactive',
  },
  {
    value: '2',
    label: 'Suspended',
  },
];

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[] | null) => void;
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

      <CSelect
        className="w-full"
        options={statusOptions}
        placeholder="Select status"
        value={filters['status']}
        onChange={(value: string) => {
          updateFilter('status', value);
        }}
        getOptionValue={(option: { value: any }) => option.value}
        clearable
        onClear={() => {
          updateFilter('status', null);
        }}
        {...(isMediumScreen && {
          label: 'Status',
          labelClassName: 'font-medium text-gray-700',
        })}
        dropdownClassName="h-auto z-10 bg-white/90 dark:bg-gray-800/90"
      />

      <CSelect
        placeholder="Select consent form"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={[
          {
            label: 'Completed',
            value: 'true',
          },
          {
            label: 'Missing',
            value: 'false',
          },
        ]}
        onClear={() => {
          updateFilter('filter_no_consent_form', '');
        }}
        clearable
        value={filters['filter_no_consent_form']}
        onChange={(value: string) => {
          updateFilter('filter_no_consent_form', value);
        }}
        {...(isMediumScreen && {
          label: 'Consent Form',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select email verification"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={[
          {
            label: 'Verified',
            value: 'true',
          },
          {
            label: 'Unverified',
            value: 'false',
          },
        ]}
        onClear={() => {
          updateFilter('filter_unverified_email', '');
        }}
        clearable
        value={filters['filter_unverified_email']}
        onChange={(value: string) => {
          updateFilter('filter_unverified_email', value);
        }}
        {...(isMediumScreen && {
          label: 'Email Verification',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select IHI completion"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={[
          {
            label: 'Completed',
            value: 'true',
          },
          {
            label: 'Missing',
            value: 'false',
          },
        ]}
        onClear={() => {
          updateFilter('filter_no_ihi', '');
        }}
        clearable
        value={filters['filter_no_ihi']}
        onChange={(value: string) => {
          updateFilter('filter_no_ihi', value);
        }}
        {...(isMediumScreen && {
          label: 'IHI Completion',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select address status"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={[
          {
            label: 'Complete',
            value: 'true',
          },
          {
            label: 'Incomplete',
            value: 'false',
          },
        ]}
        onClear={() => {
          updateFilter('filter_incomplete_address', '');
        }}
        clearable
        value={filters['filter_incomplete_address']}
        onChange={(value: string) => {
          updateFilter('filter_incomplete_address', value);
        }}
        {...(isMediumScreen && {
          label: 'Address Status',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select mobile number status"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={[
          {
            label: 'Valid',
            value: 'true',
          },
          {
            label: 'Invalid',
            value: 'false',
          },
        ]}
        onClear={() => {
          updateFilter('filter_invalid_mobile', '');
        }}
        clearable
        value={filters['filter_invalid_mobile']}
        onChange={(value: string) => {
          updateFilter('filter_invalid_mobile', value);
        }}
        {...(isMediumScreen && {
          label: 'Mobile Number Status',
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
