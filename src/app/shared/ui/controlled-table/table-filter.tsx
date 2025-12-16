'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { PiMagnifyingGlassBold, PiFunnel, PiXBold } from 'react-icons/pi';
import { Button, ActionIcon, Input, Title, Badge } from 'rizzui';
import cn from '@core/utils/class-names';
import { useMedia } from '@core/hooks/use-media';
import { ToggleColumns } from '@/app/shared/ui/table';
const Drawer = dynamic(() => import('rizzui').then((module) => module.Drawer), {
  ssr: false,
});

export function FilterDrawerView({
  isOpen,
  drawerTitle,
  setOpenDrawer,
  children,
}: React.PropsWithChildren<{
  drawerTitle?: string;
  hasSearched?: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}>) {
  return (
    <Drawer
      size="sm"
      isOpen={isOpen ?? false}
      onClose={() => setOpenDrawer(false)}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
      containerClassName="dark:bg-gray-100"
      className="z-[9999]"
    >
      <div className="flex h-full flex-col p-5">
        <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-5 pb-4">
          <Title as="h5">{drawerTitle}</Title>
          <ActionIcon
            size="sm"
            rounded="full"
            variant="text"
            title={'Close Filter'}
            onClick={() => setOpenDrawer(false)}
          >
            <PiXBold className="h-4 w-4" />
          </ActionIcon>
        </div>
        {/* <div className="flex-grow">
          <div className="grid grid-cols-1 gap-6 [&_.price-field>span.mr-2]:mb-1.5 [&_.price-field]:flex-col [&_.price-field]:items-start [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_.w-72]:w-full [&_.text-gray-500]:text-gray-700 [&_button.h-9]:h-10 sm:[&_button.h-9]:h-11 [&_label>.h-9]:h-10 sm:[&_label>.h-9]:h-11 [&_label>.w-24.h-9]:w-full">
            {children}
          </div>
        </div> */}
        <div className="flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 gap-6 [&_.price-field>span.mr-2]:mb-1.5 [&_.price-field]:flex-col [&_.price-field]:items-start [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_.w-72]:w-full [&_.text-gray-500]:text-gray-700 [&_button.h-9]:h-10 sm:[&_button.h-9]:h-11 [&_label>.h-9]:h-10 sm:[&_label>.h-9]:h-11 [&_label>.w-24.h-9]:w-full">
            {children}
          </div>
        </div>
        <Button
          size="lg"
          onClick={() => setOpenDrawer(false)}
          className="mt-5 h-11 w-full text-sm"
        >
          Show Results
        </Button>
      </div>
    </Drawer>
  );
}

export type TableFilterProps = {
  searchTerm: string;
  onSearchClear: () => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columns: { [key: string]: any }[];
  checkedColumns: string[];
  setCheckedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  hideIndex?: number;
  children?: React.ReactNode;
  drawerTitle?: string;
  hasSearched?: boolean;
  showSearchOnTheRight?: boolean;
  enableDrawerFilter?: boolean;
  menu?: React.ReactNode;
  otherButton?: any[];
  filter?: Record<string, any>
  isDeactiveToogleColumns?: boolean;
};

export default function TableFilter({
  searchTerm,
  onSearchClear,
  onSearchChange,
  columns,
  checkedColumns,
  setCheckedColumns,
  hideIndex,
  drawerTitle = 'Table Filters',
  hasSearched,
  enableDrawerFilter = false,
  showSearchOnTheRight = false,
  menu,
  children,
  otherButton = [],
  filter,
  isDeactiveToogleColumns = false,
}: TableFilterProps) {
  const isMediumScreen = useMedia('(max-width: 6000px)', false);
  const [showFilters, setShowFilters] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const hasActiveFilter = (filter?: Record<string, any>) => {
    if (!filter || typeof filter !== 'object') return false;

    return Object.values(filter).some((value) => {
      if (value === null || value === undefined) return false;

      if (Array.isArray(value)) {
        return value.some(
          (v) => v !== null && v !== undefined && v !== ''
        );
      }

      if (typeof value === 'string') {
        return value.trim() !== '';
      }

      return true;
    });
  };

  const isFilterActive = hasActiveFilter(filter);

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-4">
        {!showSearchOnTheRight ? (
          <Input
            type="search"
            placeholder="Search by anything..."
            value={searchTerm}
            onClear={onSearchClear}
            onChange={onSearchChange}
            inputClassName="h-9"
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          />
        ) : null}

        {showSearchOnTheRight && enableDrawerFilter ? (
          <>{menu ? menu : null}</>
        ) : null}

        {children && (
          <>
            {isMediumScreen || enableDrawerFilter ? (
              <FilterDrawerView
                isOpen={openDrawer}
                setOpenDrawer={setOpenDrawer}
                drawerTitle={drawerTitle}
                hasSearched={hasSearched}
              >
                {children}
              </FilterDrawerView>
            ) : (
              <>{showFilters ? children : null}</>
            )}
          </>
        )}
      </div>

      <div className="ms-4 flex flex-shrink-0 items-center gap-2">
        {showSearchOnTheRight ? (
          <Input
            type="search"
            placeholder="Search by anything..."
            value={searchTerm}
            onClear={onSearchClear}
            onChange={onSearchChange}
            inputClassName="h-9"
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
            className="me-2.5"
          />
        ) : null}

        {
          Array.isArray(otherButton) && otherButton.length > 0 && (
            otherButton.map((Button: any, index: number) =>
              typeof Button === "function" ? <span key={index}>{Button()}</span> : <span key={index}>{Button}</span>
            )
          )
        }

        {children ? (
          <div className="relative inline-flex">
            {isFilterActive && (
              <Badge
                size="lg"
                renderAsDot
                color="warning"
                enableOutlineRing
                className="absolute right-0 top-0 -translate-y-[30%]"
              />
            )}
            <Button
              {...(isMediumScreen || enableDrawerFilter
                ? {
                  onClick: () => {
                    setOpenDrawer(() => !openDrawer);
                  },
                }
                : { onClick: () => setShowFilters(() => !showFilters) })}
              variant={'outline'}
              className={cn(
                !(isMediumScreen || enableDrawerFilter) &&
                showFilters &&
                'border-dashed border-gray-700'
              )}
            >
              <PiFunnel className="me-1.5 h-[18px] w-[18px]" strokeWidth={1.7} />
              {!(isMediumScreen || enableDrawerFilter) && showFilters
                ? 'Hide Filters'
                : 'Filters'}
            </Button>
          </div>
        ) : null}

        {!isDeactiveToogleColumns && (
          <ToggleColumns
            columns={columns}
            checkedColumns={checkedColumns}
            setCheckedColumns={setCheckedColumns}
            hideIndex={hideIndex}
          />
        )}
      </div>
    </div>
  );
}
