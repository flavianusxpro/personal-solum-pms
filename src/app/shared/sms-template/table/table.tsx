'use client';

import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { useColumn } from '@core/hooks/use-column';
import { useTable } from '@core/hooks/use-table';
import React, { useCallback, useState } from 'react';
import { useDeleteSmsTemplate, useGetSmsTemplates } from '@/hooks/useTemplate';
import { getColumns } from './columns';
import { useModal } from '../../modal-views/use-modal';

export default function SmsTemplateTable({}: {}) {
  const { openModal } = useModal();
  const [pageSize, setPageSize] = useState(10);

  const {
    data,
    isLoading: isLoadingGetAllTemplate,
    refetch,
  } = useGetSmsTemplates({
    page: 1,
    perPage: pageSize,
    sort: 'DESC',
  });

  const { mutate } = useDeleteSmsTemplate();

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

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
  } = useTable(data ?? [], pageSize);

  const onDeleteItem = useCallback(
    (id: string) => {
      mutate(id, {
        onSuccess: () => {
          handleDelete(id);
          refetch();
        },
        onError: (error: any) => {
          console.error(
            'Failed to delete sms template: ',
            error?.response?.data?.message
          );
        },
      });
    },
    [handleDelete, mutate]
  );

  const columns = React.useMemo(
    () =>
      getColumns({
        data: data ?? [],
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
        openModal,
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

  return (
    <div>
      <ControlledTable
        isLoading={isLoading || isLoadingGetAllTemplate}
        showLoadingText={true}
        data={tableData ?? []}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
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
        className={
          'rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0'
        }
      />
    </div>
  );
}
