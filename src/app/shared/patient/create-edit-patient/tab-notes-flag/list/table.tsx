'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@core/hooks/use-table';
import { Button } from 'rizzui';
import { useColumn } from '@core/hooks/use-column';
import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { getColumns } from './columns';
import TableHeader from '@/app/shared/ui/table-header';
import ModalButton from '@/app/shared/ui/modal-button/modal-button';
import FlagForm from '../modal/add-flag';
import FormGroup from '@/app/shared/ui/form-group';
import { useGetPatientFlags } from '@/hooks/usePatientFlag';
import { useModal } from '@/app/shared/modal-views/use-modal';
const TableFooter = dynamic(() => import('@/app/shared/ui/table-footer'), {
  ssr: false,
});

export default function ListTable({ className }: { className?: string }) {
  const { openModal } = useModal();
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
  });

  const { data: dataFlags } = useGetPatientFlags({
    page: params.page,
    perPage: params.perPage,
  });

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
  } = useTable(dataFlags?.data ?? [], params.perPage);

  const columns = useMemo(
    () =>
      getColumns({
        data: dataFlags?.data ?? [],
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
      openModal,
    ]
  );

  const { visibleColumns } = useColumn(columns);

  return (
    <div className={className}>
      <FormGroup title="Notes & Flags" className="mb-5" />

      <ControlledTable
        isLoading={isLoading}
        showLoadingText={true}
        data={tableData ?? []}
        // @ts-ignore
        columns={visibleColumns}
        scroll={{ x: 1300 }}
        variant="modern"
        tableLayout="auto"
        rowKey={(record) => record.id}
        paginatorOptions={{
          pageSize: params.perPage,
          setPageSize: (pageSize: number) =>
            setParams((prev) => ({ ...prev, perPage: pageSize })),
          total: totalItems,
          current: params.page,
          onChange: (page: number) => {
            setParams((prev) => ({ ...prev, page }));
            handlePaginate(page);
          },
        }}
        tableHeader={
          <TableHeader isCustomHeader checkedItems={[]}>
            <ModalButton view={<FlagForm />} />
          </TableHeader>
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
              Download {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Files' : 'File'}
            </Button>
          </TableFooter>
        }
      />
    </div>
  );
}
