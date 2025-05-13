'use client';

import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { getColumns } from '@/app/shared/product/tableDataProduct/columns';
import { useColumn } from '@core/hooks/use-column';
import { useTable } from '@core/hooks/use-table';
import cn from '@core/utils/class-names';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import { ActionIcon, Loader } from 'rizzui';
import { useDeleteItem, useGetItems } from '@/hooks/useItems';
import { useModal } from '../../modal-views/use-modal';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';
import TableFooter from '../../ui/table-footer';

// dynamic import
const FilterElement = dynamic(
  () => import('@/app/shared/product/tableDataProduct/filter-element'),
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
};

export default function ProductTable({
  variant = 'modern',
  className,
}: {
  variant?: 'modern' | 'minimal' | 'classic' | 'elegant' | 'retro';
  className?: string;
}) {
  const { openModal } = useModal();

  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    search: '',
  });

  const {
    data: dataItems,
    isLoading: isLoadingGetItems,
    refetch,
  } = useGetItems({
    page: params.page,
    perPage: params.perPage,
    q: JSON.stringify({
      name: params.search,
    }),
  });

  const { mutate: mutateDelete } = useDeleteItem();

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((ids: number[]) => {
    mutateDelete(ids, {
      onSuccess: () => {
        toast.success('Item deleted successfully');
        refetch();
      },
      onError: (error: any) => {
        toast.error('Failed to delete item: ', error?.response?.data?.message);
      },
    });
  }, []);

  const handlerSearch = debounce((value: string) => {
    setParams((prevState) => ({
      ...prevState,
      search: value,
    }));
  }, 1000);

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
  } = useTable(dataItems?.data ?? [], params.perPage, filterState);

  const columns = React.useMemo(
    () =>
      getColumns({
        data: dataItems?.data ?? [],
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
    <div className={cn(className)}>
      <ControlledTable
        variant={variant}
        isLoading={isLoading || isLoadingGetItems}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        // expandable={{
        //   expandIcon: CustomExpandIcon,
        //   expandedRowRender: (record) => <ExpandedOrderRow record={record} />,
        // }}
        paginatorOptions={{
          pageSize: params.perPage,
          setPageSize: (pageSize: number) => {
            setParams((p) => ({ ...p, perPage: pageSize }));
          },
          total: totalItems,
          current: params.page,
          onChange: (page: number) => {
            setParams((p) => ({ ...p, page }));
            handlePaginate(page);
          },
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
            handlerSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
            handlerSearch(event.target.value);
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
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
              onDeleteItem(ids.map((id) => parseInt(id)));
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
