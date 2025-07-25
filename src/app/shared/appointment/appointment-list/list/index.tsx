'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Title } from 'rizzui';
import { GetColumns } from '@/app/shared/appointment/appointment-list/list/columns';
import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { useMedia } from '@core/hooks/use-media';
import { useTable } from '@core/hooks/use-table';
import { useColumn } from '@core/hooks/use-column';
import cn from '@core/utils/class-names';
import {
  useDeleteAppointment,
  useGetAppointments,
} from '@/hooks/useAppointment';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import { useProfile } from '@/hooks/useProfile';

const TableFooter = dynamic(() => import('@/app/shared/ui/table-footer'), {
  ssr: false,
});
const FilterElement = dynamic(
  () => import('@/app/shared/appointment/appointment-list/list/filter-element'),
  { ssr: false }
);

const filterState = {
  createdAt: [null, null],
  payment_status: null,
  status: null,
  by_reschedule: null,
};

export default function AppointmentListTable() {
  const { isOpen } = useModal();

  const [filterStateValue, setFilterStateValue] = useState(filterState);
  const [_, setCheckedItems] = useState<string[]>([]);
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    search: '',
  });

  const { data: dataProfile } = useProfile(true);
  const {
    data: dataAppointments,
    isLoading: isLoadingGetAppointments,
    refetch,
  } = useGetAppointments({
    page: params.page,
    perPage: params.perPage,
    q: JSON.stringify({
      patientName: params.search,
    }),
    from: filterStateValue?.createdAt?.[0]
      ? dayjs(filterStateValue?.createdAt?.[0]).format('YYYY-MM-DD')
      : undefined,
    to: filterStateValue?.createdAt?.[1]
      ? dayjs(filterStateValue?.createdAt?.[1]).format('YYYY-MM-DD')
      : undefined,
    status: filterStateValue?.status || undefined,
    payment_status: filterStateValue?.payment_status || undefined,
    by_reschedule: filterStateValue?.by_reschedule || undefined,
    clinicId: dataProfile?.clinics[0].id || 0,
  });

  const { mutate } = useDeleteAppointment();

  const isMediumScreen = useMedia('(max-width: 1860px)', false);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback(
    (ids: number[]) => {
      mutate(ids, {
        onSuccess: () => {
          toast.success('Appointment deleted successfully');
          refetch();
        },
        onError: (error: any) => {
          console.error('Failed to delete appointment:', error);
          toast.error(
            'Failed to delete appointment: ' + error.response.data.message
          );
        },
      });
    },
    [mutate, refetch]
  );

  const handlerSearch = debounce((value: string) => {
    setParams((prevState) => ({
      ...prevState,
      search: value,
    }));
  }, 1000);

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

  const updateFilter = useCallback(
    (columnId: string, filterValue: string | number | any[] | null) => {
      setFilterStateValue((prevState) => ({
        ...prevState,
        [columnId]: filterValue,
      }));
    },
    []
  );

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
    handleDelete,
    handleReset,
    handleSelectAll,
    handleRowSelect,
    setSelectedRowKeys,
    selectedRowKeys,
  } = useTable(dataAppointments?.data ?? [], params.perPage, filterStateValue);

  const columns = useMemo(
    () =>
      GetColumns({
        data: dataAppointments?.data,
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

  useEffect(() => {
    refetch();
  }, [isOpen, refetch, filterStateValue, params]);

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
        data={tableData ?? []}
        scroll={{
          x: 1560,
        }}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize: params.perPage,
          setPageSize: (page) => setParams({ ...params, perPage: page }),
          total: dataAppointments?.count,
          current: currentPage,
          onChange: (page: number) => {
            handlePaginate(page);
            setParams({ ...params, page });
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
              onDeleteItem(ids.map((id) => parseInt(id)));
            }}
          >
            {/* <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
              Download {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Appointments' : 'Appointment'}
            </Button> */}
          </TableFooter>
        }
      />
    </div>
  );
}
