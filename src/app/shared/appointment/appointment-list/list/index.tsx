'use client';

import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';
import { Button, Title } from 'rizzui';
import { GetColumns } from '@/app/shared/appointment/appointment-list/list/columns';
import ControlledTable from '@/app/shared/controlled-table/index';
import { useMedia } from '@core/hooks/use-media';
import { useTable } from '@core/hooks/use-table';
import { useColumn } from '@core/hooks/use-column';
import cn from '@core/utils/class-names';
import { useGetAppointments } from '@/hooks/useAppointment';

const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});
const FilterElement = dynamic(
  () => import('@/app/shared/appointment/appointment-list/list/filter-element'),
  { ssr: false }
);

const filterState = {
  payment_status: '',
  appointment_status: '',
  by_reschedule: '',
};

export default function AppointmentListTable() {
  const [pageSize, setPageSize] = useState(10);
  const [_, setCheckedItems] = useState<string[]>([]);

  const { data: dataAppointments, isLoading: isLoadingGetAppointments } =
    useGetAppointments({
      page: 1,
      perPage: pageSize,
    });

  const isMediumScreen = useMedia('(max-width: 1860px)', false);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setCheckedItems((prevItems) => [...prevItems, id]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const {
    isLoading,
    isFiltered,
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
    handleDelete,
    handleReset,
    handleSelectAll,
    handleRowSelect,
    setSelectedRowKeys,
    selectedRowKeys,
  } = useTable(dataAppointments ?? [], pageSize, filterState);

  const columns = useMemo(
    () =>
      GetColumns({
        data: dataAppointments,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      onChecked,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <div
      className={cn(
        '[&_.table-filter>div:first-child]:grow [&_.table-filter>div:first-child]:justify-between',
        !isMediumScreen && '[&_.table-filter>div:first-child]:flex-row-reverse'
      )}
    >
      <ControlledTable
        variant="modern"
        isLoading={isLoading || isLoadingGetAppointments}
        showLoadingText={true}
        data={tableData}
        scroll={{
          x: 1560,
        }}
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
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
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
              Download {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Appointments' : 'Appointment'}
            </Button>
          </TableFooter>
        }
      />
    </div>
  );
}
