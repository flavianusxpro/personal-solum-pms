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
import { useCopyToClipboard } from 'react-use';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import TableFooter from '../../ui/table-footer';

// dynamic import
const FilterElement = dynamic(
  () => import('@/app/shared/doctor/tableDataDoctor/filter-element'),
  { ssr: false }
);

const filterState = {
  createdAt: [null, null],
};

export default function DoctorTable({}: {}) {
  const { isOpen } = useModal();
  const [filterStateValue, setFilterStateValue] = useState(filterState);
  const [_, copyToClipboard] = useCopyToClipboard();

  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    search: '',
  });

  const {
    data,
    isLoading: isLoadingGetAllDoctors,
    refetch,
  } = useGetAllDoctors({
    page: params.page,
    perPage: params.perPage,
    from: filterStateValue?.createdAt?.[0]
      ? dayjs(filterStateValue?.createdAt?.[0]).format('YYYY-MM-DD')
      : undefined,
    to: filterStateValue?.createdAt?.[1]
      ? dayjs(filterStateValue?.createdAt?.[1]).format('YYYY-MM-DD')
      : undefined,
    q: JSON.stringify({ name: params.search }),
  });

  const { mutate: mutateDeleteDoctor } = useDeleteDoctor();

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback(
    (ids: number[]) => {
      mutateDeleteDoctor(ids, {
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

  const handlerSearch = debounce((value: string) => {
    setParams((prevState) => ({
      ...prevState,
      search: value,
    }));
  }, 1000);

  const handleReset = useCallback(() => {
    setFilterStateValue(filterState);
  }, []);

  const handleCopy = (text: string | number) => {
    copyToClipboard(String(text));
  };

  const {
    isLoading,
    isFiltered,
    tableData,
    filters,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    setSelectedRowKeys,
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
        handleCopy,
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
  }, [params, refetch, isOpen, filterStateValue]);

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
            handlerSearch('');
          },
          onSearchChange: (event) => {
            handlerSearch(event.target.value);
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
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              onDeleteItem(ids.map((id) => parseInt(id)));
            }}
          />
        }
        className={
          'rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0'
        }
      />
    </div>
  );
}
