'use client';

import { useMemo, useState } from 'react';
import { useColumn } from '@core/hooks/use-column';
import { useTable } from '@core/hooks/use-table';
import { Button } from 'rizzui';
import TableFooter from '@/app/shared/ui/table-footer';
import { exportToCSV } from '@core/utils/export-to-csv';
import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { billingHistoryData } from '@/data/billing-history';
import { getColumns } from './columns';
import { useGetInvoices } from '@/hooks/useInvoice';
import { useGetPatientById } from '@/hooks/usePatient';
import { useParams } from 'next/navigation';

export default function BillingHistoryTable({
  className,
}: {
  className?: string;
}) {
  const id = useParams().id as string;

  const [pageSize, setPageSize] = useState(5);

  const { data: dataPatient } = useGetPatientById(id);

  const { data: dataInvoice, isLoading: isLoadingGetInvoices } = useGetInvoices(
    {
      patientId: dataPatient?.id,
      page: 1,
      perPage: pageSize,
    }
  );

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
  } = useTable(dataInvoice ?? [], pageSize);

  const columns = useMemo(
    () =>
      getColumns({
        data: dataInvoice,
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

  // const selectedData = dataInvoice?.filter((item) =>
  //   selectedRowKeys.includes(item.id.toString())
  // );
  // function handleExportData() {
  //   exportToCSV(
  //     selectedData,
  //     'Title,Amount,Date,Status,Shared',
  //     `billing_history_${selectedData.length}`
  //   );
  // }

  return (
    <div
      className={`w-full overflow-hidden rounded-lg bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      <ControlledTable
        isLoading={isLoading || isLoadingGetInvoices}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        scroll={{ x: 1300 }}
        variant="modern"
        rowKey={(record) => record.id}
        className="text-sm"
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
            {/* <Button
              size="sm"
              onClick={() => handleExportData()}
              className="dark:bg-gray-300 dark:text-gray-800"
            >
              Download {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Files' : 'File'}
            </Button> */}
          </TableFooter>
        }
      />
    </div>
  );
}
