'use client';

import { PiTrashDuotone, PiMagnifyingGlassBold } from 'react-icons/pi';
import { Badge, Text, Title, Button, Input, cn } from 'rizzui';
import StatusField from '../../ui/controlled-table/status-field';
import { ROLES } from '@/config/constants';
import { useMedia } from '@core/hooks/use-media';

export const statusOptions = [
  {
    value: 1,
    label: 'Inactive',
  },
  {
    value: 2,
    label: 'Active',
  },
  {
    value: 3,
    label: 'Suspended',
  },
];

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};

const roles = Object.entries(ROLES).map(([key, value]) => ({
  value: key,
  label: value,
}));

export default function FilterElement({
  isFiltered,
  handleReset,
  filters,
  updateFilter,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);

  return (
    <>
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
            All Users
          </Title>
        )}

        <StatusField
          dropdownClassName="!z-10 h-auto"
          className="w-full @[35rem]:w-auto"
          options={statusOptions}
          value={filters['status']}
          onChange={(value: string) => {
            updateFilter('status', value);
          }}
          getOptionValue={(option: { value: any }) => option.value}
          {...(isMediumScreen && {
            label: 'STATUS',
            labelClassName: 'font-medium text-gray-700',
          })}
        />

        <StatusField
          dropdownClassName="!z-10 h-auto"
          className="w-full @[35rem]:w-auto"
          options={statusOptions}
          value={filters['role']}
          onChange={(value: string) => {
            updateFilter('role', value);
          }}
          getOptionValue={(option: { value: any }) => option.value}
          {...(isMediumScreen && {
            label: 'ROLE',
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
    </>
  );
}

function renderOptionDisplayValue(value: number) {
  switch (value) {
    case 2:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            Active
          </Text>
        </div>
      );
    case 3:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            Deactivated
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium capitalize text-gray-600">
            Draft
          </Text>
        </div>
      );
  }
}
