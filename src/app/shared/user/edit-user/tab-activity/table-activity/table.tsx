'use client';

import { useMemo, useState } from 'react';
import { useColumn } from '@core/hooks/use-column';
import { useTable } from '@core/hooks/use-table';
import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { getColumns } from './columns';
import { useParams } from 'next/navigation';

export default function ActivityTable({ className }: { className?: string }) {
  const id = useParams().id as string;

  const [params, setParams] = useState({
    page: 1,
    perPage: 5,
  });

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const {
    isLoading,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
  } = useTable([], params.perPage);

  const columns = useMemo(
    () =>
      getColumns({
        data: [],
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onChecked: handleRowSelect,
        handleSelectAll,
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
  const { visibleColumns } = useColumn(columns);

  return (
    <div
      className={`w-full overflow-hidden rounded-lg bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      <ControlledTable
        isLoading={isLoading}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        scroll={{ x: 1300 }}
        variant="modern"
        rowKey={(record) => record.id}
        className="text-sm"
        paginatorOptions={{
          pageSize: params.perPage,
          setPageSize: (value) =>
            setParams((prev) => ({
              ...prev,
              perPage: value,
            })),
          total: totalItems,
          current: params.page,
          onChange: (page: number) => {
            setParams((prev) => ({
              ...prev,
              page,
            }));
            handlePaginate(page);
          },
        }}
      />
    </div>
  );
}
