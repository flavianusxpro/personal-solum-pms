'use client';

import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@core/hooks/use-table';
import { useColumn } from '@core/hooks/use-column';
import { Button } from 'rizzui';
import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { getColumns } from './columns';
import { useDeleteInvoice, useGetInvoices } from '@/hooks/useInvoice';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
const FilterElement = dynamic(
  () => import('@/app/shared/invoice/invoice-list/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/ui/table-footer'), {
  ssr: false,
});

const filterState = {
  createdAt: [null, null],
  // dueDate: [null, null],
  status: null,
};

export default function InvoiceTableList() {
  const [filterStateValue, setFilterStateValue] = useState(filterState);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });

  const {
    data: dataInvoices,
    isLoading: isLoadingGetInvoices,
    refetch,
  } = useGetInvoices({
    page: params.page,
    perPage: params.pageSize,
    from: filterStateValue?.createdAt[0] || undefined,
    to: filterStateValue?.createdAt[1] || undefined,
    status: filterStateValue?.status || undefined,
  });

  const { mutate: mutateDelete } = useDeleteInvoice();

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    mutateDelete(id, {
      onSuccess: () => {
        refetch();
        toast.success('Invoice deleted successfully');
      },
      onError: (error: any) => {
        toast.error('Error deleting invoice: ' + error.response.data.message);
        console.error('Error deleting invoice:', error);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFilter = useCallback(
    (columnId: string, filterValue: string | number | any[] | null) => {
      setFilterStateValue((prevState) => ({
        ...prevState,
        [columnId]: filterValue,
      }));
    },
    []
  );

  useEffect(() => {
    refetch();
  }, [refetch, filterStateValue]);

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
    handleReset,
  } = useTable(dataInvoices?.data ?? [], params.pageSize, filterStateValue);

  const columns = React.useMemo(
    () =>
      getColumns({
        data: dataInvoices?.data ?? [],
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
  }, [params, refetch]);

  return (
    <>
      <ControlledTable
        variant="modern"
        data={tableData ?? []}
        isLoading={isLoading || isLoadingGetInvoices}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize: params.pageSize,
          setPageSize: (pageSize: number) =>
            setParams((p) => ({ ...p, pageSize })),
          total: dataInvoices?.count,
          current: params.page,
          onChange: (page: number) => setParams((p) => ({ ...p, page })),
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
          columns,
          checkedColumns,
          setCheckedColumns,
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
              handleDelete(ids);
            }}
          >
            <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
              Re-send {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Invoices' : 'Invoice'}{' '}
            </Button>
          </TableFooter>
        }
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </>
  );
}
