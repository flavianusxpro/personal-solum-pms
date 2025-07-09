'use client';

import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { useColumn } from '@core/hooks/use-column';
import { useTable } from '@core/hooks/use-table';
import React, { useEffect, useMemo, useState } from 'react';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useCopyToClipboard } from 'react-use';
import TableFooter from '../../ui/table-footer';
import {
  useDeleteApiConnection,
  useGetApiConnection,
} from '@/hooks/useConnection';
import { getColumns } from './columns';
import toast from 'react-hot-toast';

const filterState = {
  createdAt: [null, null],
};

export default function ApiTable({}: {}) {
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
    isLoading: isLoadingGetApiConnection,
    refetch,
  } = useGetApiConnection({
    page: params.page,
    perPage: params.perPage,
    q: JSON.stringify({ name: params.search }),
  });

  const { mutate } = useDeleteApiConnection();

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const handleCopy = (text: string | number) => {
    copyToClipboard(String(text));
  };

  const onDeleteItem = (ids: number[]) => {
    mutate(ids, {
      onSuccess: () => {
        toast.success('Api connection deleted successfully');
        refetch();
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || 'An error occurred';
        toast.error(errorMessage);
      },
    });
  };

  const {
    isLoading,
    isFiltered,
    tableData,
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
        onChecked: handleRowSelect,
        handleSelectAll,
        handleCopy,
        onDeleteItem: onDeleteItem,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
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
        isLoading={isLoading || isLoadingGetApiConnection}
        showLoadingText={true}
        data={tableData ?? []}
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
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
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
