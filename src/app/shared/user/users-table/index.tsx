'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@core/hooks/use-table';
import { useColumn } from '@core/hooks/use-column';
import { getColumns } from './columns';
import ControlledTable from '../../ui/controlled-table';
import { useDeleteUserById, useGetUsers } from '@/hooks/useUser';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';

const FilterElement = dynamic(() => import('./filter-element'), { ssr: false });
const TableFooter = dynamic(() => import('@/app/shared/ui/table-footer'), {
  ssr: false,
});

const filterState = {
  role: '',
  status: null,
  role_name: null,
};

export default function UsersTable() {
  const [filterStateValue, setFilterStateValue] = useState(filterState);

  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    search: '',
  });

  const { data: dataUsers, refetch } = useGetUsers({
    ...params,
    q: JSON.stringify({
      name: params.search,
      status: filterStateValue.status ? filterStateValue.status : undefined,
      role_name: filterStateValue.role_name
        ? filterStateValue.role_name
        : undefined,
    }),
  });
  const { mutate: mutateDelete } = useDeleteUserById();

  const dataList = useMemo(() => {
    return dataUsers?.users.filter((item) => {
      return !['superadmin'].includes(item.role.name);
    });
  }, [dataUsers]);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback(
    (ids: number[]) => {
      mutateDelete(ids, {
        onSuccess: () => {
          toast.success('User deleted successfully.');
          refetch();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              'An error occurred while deleting the user.'
          );
        },
      });
    },
    [mutateDelete, refetch]
  );

  const updateFilter = useCallback(
    (columnId: string, filterValue: string | any[] | null) => {
      setFilterStateValue((prevState) => ({
        ...prevState,
        [columnId]: filterValue,
      }));
    },
    []
  );

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
    handleReset,
  } = useTable(dataList ?? [], params.perPage, filterStateValue);

  const columns = useMemo(
    () =>
      getColumns({
        data: dataList ?? [],
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

  useEffect(() => {
    refetch();
  }, [params, refetch, filterStateValue]);

  return (
    <div className="">
      <ControlledTable
        variant="modern"
        data={tableData ?? []}
        isLoading={isLoading}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize: params.perPage,
          setPageSize: (value) =>
            setParams((prev) => ({
              ...prev,
              perPage: value,
            })),
          total: dataUsers?.count,
          current: currentPage,
          onChange: (page: number) => {
            setParams((prev) => ({
              ...prev,
              page,
            }));
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
            handlerSearch(event.target.value);
            handleSearch(event.target.value);
          },
          columns,
          checkedColumns,
          setCheckedColumns,
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
              onDeleteItem(ids.map((id) => parseInt(id)));
            }}
          />
        }
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
