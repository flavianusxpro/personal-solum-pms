'use client';

import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { getColumns } from '@/app/shared/doctor/tableDataDoctor/columns';
import { useDeleteDoctor, useGetAllDoctors } from '@/hooks/useDoctor';
import { useColumn } from '@core/hooks/use-column';
import { useTable } from '@core/hooks/use-table';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';

// dynamic import
const FilterElement = dynamic(
  () => import('@/app/shared/doctor/tableDataDoctor/filter-element'),
  { ssr: false }
);

const filterState = {
  price: ['', ''],
  createdAt: [null, null],
  updatedAt: [null, null],
  status: '',
};

export default function DoctorTable({}: {}) {
  const { isOpen } = useModal();
  const [filterStateValue, setFilterStateValue] = useState(filterState);

  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
  });

  const {
    data,
    isLoading: isLoadingGetAllDoctors,
    refetch,
  } = useGetAllDoctors({
    page: params.page,
    perPage: params.perPage,
  });

  const { mutate: mutateDeleteDoctor } = useDeleteDoctor();

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback(
    (id: string) => {
      mutateDeleteDoctor(id, {
        onSuccess: () => {
          refetch();
          toast.success('Delete doctor successfully');
        },
        onError: (error: any) => {
          toast.error(error.response.data.message || 'Delete doctor failed');
        },
      });
    },
    [mutateDeleteDoctor, refetch]
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

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    filters,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
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
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  useEffect(() => {
    refetch();
  }, [params, refetch, isOpen]);

  return (
    <div>
      <ControlledTable
        isLoading={isLoading || isLoadingGetAllDoctors}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize: params.perPage,
          setPageSize: (pageSize: number) => {
            setParams((prev) => ({
              ...prev,
              perPage: pageSize,
            }));
          },
          total: data?.count,
          current: params.page,
          onChange: (page: number) => setParams((prev) => ({ ...prev, page })),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
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
