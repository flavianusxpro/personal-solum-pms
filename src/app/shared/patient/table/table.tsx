'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@core/hooks/use-table';
import { useColumn } from '@core/hooks/use-column';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { ActionIcon } from 'rizzui';
import cn from '@core/utils/class-names';
import ExpandedOrderRow from '@/app/shared/patient/table/expanded-row';
import { getColumns } from './columns';
import { useDeletePatient, useGetAllPatients } from '@/hooks/usePatient';
import debounce from 'lodash/debounce';
import { useModal } from '../../modal-views/use-modal';
import toast from 'react-hot-toast';

const FilterElement = dynamic(
  () => import('@/app/shared/patient/table/filter-element'),
  { ssr: false }
);

function CustomExpandIcon(props: any) {
  return (
    <ActionIcon
      size="sm"
      variant="outline"
      rounded="full"
      className="expand-row-icon ms-2"
      onClick={(e) => {
        props.onExpand(props.record, e);
      }}
    >
      {props.expanded ? (
        <PiCaretUpBold className="h-3.5 w-3.5" />
      ) : (
        <PiCaretDownBold className="h-3.5 w-3.5" />
      )}
    </ActionIcon>
  );
}

const filterState = {
  createdAt: [null, null],
  updatedAt: [null, null],
  status: '',
  condition: '',
};

export default function PatientTable({ className }: { className?: string }) {
  const { isOpen } = useModal();
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    search: '',
  });
  const [filterStateValue, setFilterStateValue] = useState(filterState);

  const {
    data,
    isLoading: isLoadingGetAllPatients,
    refetch,
  } = useGetAllPatients({
    page: params.page,
    perPage: params.perPage,
    q: JSON.stringify({
      name: params.search,
    }),
  });

  const { mutate: mutateDeletePatient } = useDeletePatient();

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback(
    (id: string) => {
      mutateDeletePatient(id, {
        onSuccess: () => {
          refetch();
          toast.success('Patient deleted successfully');
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              'Something went wrong'
          );
        },
      });
    },
    [mutateDeletePatient, refetch]
  );

  const updateFilter = useCallback(
    (columnId: string, filterValue: string | any[]) => {
      setFilterStateValue((prevState) => ({
        ...prevState,
        [columnId]: filterValue,
      }));
    },
    []
  );

  const handleReset = useCallback(() => {
    setFilterStateValue(filterState);
  }, []);

  const handlerSearchFilter = debounce((value: string) => {
    setParams((prevState) => ({
      ...prevState,
      search: value,
    }));
  }, 1000);

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    // updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    // handleReset,
  } = useTable(data?.data ?? [], params.perPage, filterStateValue);

  const columns = React.useMemo(
    () =>
      getColumns({
        data: data?.data ?? [],
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
      data,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  useEffect(() => {
    refetch();
  }, [filterStateValue, refetch, isOpen, params]);

  return (
    <div className={cn(className)}>
      <ControlledTable
        isLoading={isLoading || isLoadingGetAllPatients}
        showLoadingText={true}
        data={tableData ?? []}
        // @ts-ignore
        columns={visibleColumns}
        expandable={{
          expandIcon: CustomExpandIcon,
          expandedRowRender: (record: any) => (
            <ExpandedOrderRow data={record} />
          ),
        }}
        paginatorOptions={{
          pageSize: params.perPage,
          setPageSize: (pageSize: number) =>
            setParams((prevState) => ({
              ...prevState,
              perPage: pageSize,
            })),
          total: data?.count,
          current: params.page,
          onChange: (page: number) => {
            setParams((prevState) => ({
              ...prevState,
              page: page,
            }));
            handlePaginate(page);
          },
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
            handlerSearchFilter('');
          },
          onSearchChange: (event) => {
            handlerSearchFilter(event.target.value);
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          hideIndex: 1,
          columns,
          checkedColumns,
          setCheckedColumns,
          enableDrawerFilter: true,
        }}
        filterElement={
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
        }
        className={
          'rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0'
        }
      />
    </div>
  );
}
