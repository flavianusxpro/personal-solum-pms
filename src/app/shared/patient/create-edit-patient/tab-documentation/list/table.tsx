'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@core/hooks/use-table';
import { Button } from 'rizzui';
import { useColumn } from '@core/hooks/use-column';
import FileFilters from '@/app/shared/ui/file/file-filters';
import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { allFilesData } from '@/data/all-files';
import { getColumns } from './columns';
import UploadFile from '@/app/shared/ui/modal-button/modal-upload-file-button';
const TableFooter = dynamic(() => import('@/app/shared/ui/table-footer'), {
  ssr: false,
});

export default function ListTable({ className }: { className?: string }) {
  const [pageSize, setPageSize] = useState(10);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {
    handleDelete(id);
  };

  const {
    isLoading,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
  } = useTable(allFilesData, pageSize);

  const columns = useMemo(
    () =>
      getColumns({
        data: allFilesData,
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

  const { visibleColumns } = useColumn(columns);

  return (
    <div className={className}>
      <FileFilters
        filters={filters}
        updateFilter={updateFilter}
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <UploadFile />
      <ControlledTable
        isLoading={isLoading}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        scroll={{ x: 1300 }}
        variant="modern"
        tableLayout="auto"
        rowKey={(record) => record.id}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          >
            <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
              Download {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Files' : 'File'}
            </Button>
          </TableFooter>
        }
      />
    </div>
  );
}
