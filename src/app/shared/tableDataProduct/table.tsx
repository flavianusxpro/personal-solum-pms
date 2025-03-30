'use client';

import ControlledTable from '@/app/shared/controlled-table/index';
import { getColumns } from '@/app/shared/tableDataProduct/columns';
import { useColumn } from '@core/hooks/use-column';
import { useTable } from '@core/hooks/use-table';
import cn from '@core/utils/class-names';
import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';
// dynamic import
const FilterElement = dynamic(
  () => import('@/app/shared/tableDataProduct/filter-element'),
  { ssr: false }
);

function CustomExpandIcon(props: any) {
  return (
    <ActionIcon
      size="sm"
      variant="outline"
      rounded="full"
      className="expand-row-icon ms-2"
      onClick={(e) => {
        props.onExpand(props.record, e);
      }}
    >
      {props.expanded ? (
        <PiCaretUpBold className="h-3.5 w-3.5" />
      ) : (
        <PiCaretDownBold className="h-3.5 w-3.5" />
      )}
    </ActionIcon>
  );
}

const filterState = {
  price: ['', ''],
  createdAt: [null, null],
  updatedAt: [null, null],
  status: '',
};

export default function PatientTable({
  data = [],
  variant = 'modern',
  className,
}: {
  data: any[];
  variant?: 'modern' | 'minimal' | 'classic' | 'elegant' | 'retro';
  className?: string;
}) {
  const [pageSize, setPageSize] = useState(10);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      selectedRowKeys,
      setSelectedRowKeys,
      handleRowSelect,
      handleSelectAll,
      handleDelete,
      handleReset,
    } = useTable(data, pageSize, filterState);
  
    const columns = React.useMemo(
      () =>
        getColumns({
          data,
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

  return (
    <div className={cn(className)}>
      <ControlledTable
        variant={variant}
        isLoading={isLoading}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        // expandable={{
        //   expandIcon: CustomExpandIcon,
        //   expandedRowRender: (record) => <ExpandedOrderRow record={record} />,
        // }}
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
        filterElement={
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
        }
        className={
          'rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0'
        }
      />
    </div>
  );
}
