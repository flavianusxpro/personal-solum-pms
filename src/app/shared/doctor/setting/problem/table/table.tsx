'use client';

import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { useColumn } from '@core/hooks/use-column';
import { useTable } from '@core/hooks/use-table';
import React, { useCallback, useEffect, useState } from 'react';
import { getColumns } from './columns';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { IParamGetSpecialists } from '@/types/paramTypes';
import {
  useDeletePatientProblem,
  useGetPatientProblem,
} from '@/hooks/usePatient';
import toast from 'react-hot-toast';

export default function ProblemTable({}: {}) {
  const { openModal } = useModal();
  const [params, setParams] = useState<IParamGetSpecialists>({
    page: 1,
    perPage: 10,
    sort: 'DESC',
    search: undefined,
  });

  const {
    data,
    isLoading: isLoadingGetSpecialists,
    refetch,
  } = useGetPatientProblem(params);

  const { mutate } = useDeletePatientProblem();

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
  } = useTable(data?.data ?? [], params.perPage);

  const onDeleteItem = useCallback(
    (id: string) => {
      mutate(id, {
        onSuccess: () => {
          toast.success('Problem deleted successfully');
          handleDelete(id);
          refetch();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Error deleting problem'
          );
        },
      });
    },
    [handleDelete, mutate]
  );

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

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  return (
    <div>
      <ControlledTable
        isLoading={isLoading || isLoadingGetSpecialists}
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
          current: currentPage,
          onChange: (page: number) => {
            handlePaginate(page);
            setParams((prev) => ({
              ...prev,
              page: page,
            }));
          },
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
