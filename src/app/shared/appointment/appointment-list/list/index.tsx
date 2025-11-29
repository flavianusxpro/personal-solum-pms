'use client';

import dynamic from 'next/dynamic';
import { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
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
import TableHeader from '@/app/shared/ui/table-header';
import { StatusSelect } from '@/app/shared/invoice/invoice-list/columns';
import AppointmentDetails from './appointment-details';

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
  inactive_patients_months: null,
  doctor: null,
  patient: null,
};

export default function AppointmentListTable({ range, setRange }: { range: string | null | undefined, setRange?: React.Dispatch<SetStateAction<string | null | undefined>>; }) {
  const { isOpen: open } = useModal();
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [filterStateValue, setFilterStateValue] = useState(filterState);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [_, setCheckedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [idAppointment, setIdAppointment] = useState<string | number>('');
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
    range: range ? range : undefined,
    page: isFilter ? 1 : params.page,
    perPage: params.perPage,
    q: JSON.stringify({
      patientName: params.search === "" ? params.search : undefined,
      status: filterStateValue?.status || undefined,
      doctorId: filterStateValue?.doctor ? filterStateValue?.doctor : undefined,
      patientId: filterStateValue?.patient ? filterStateValue?.patient : undefined,
      inactive_patients_months: filterStateValue?.inactive_patients_months ? Number(
        filterStateValue?.inactive_patients_months,
      ) : undefined,
      payment_status: filterStateValue?.payment_status || undefined,
      by_reschedule: filterStateValue?.by_reschedule || undefined,
      clinicId: dataProfile?.clinics[0].id || 0,
      from: filterStateValue?.createdAt?.[0]
        ? dayjs(filterStateValue?.createdAt?.[0]).format('YYYY-MM-DD')
        : undefined,
      to: filterStateValue?.createdAt?.[1]
        ? dayjs(filterStateValue?.createdAt?.[1]).format('YYYY-MM-DD')
        : undefined,
    }),
    timezone_client: localTimezone,
  });

  const { mutate } = useDeleteAppointment();
  const isMediumScreen = useMedia('(max-width: 6000px)', false);
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback(
    (ids: number[]) => {
      mutate(ids, {
        onSuccess: () => {
          setIsOpen(false);
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

  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (!isResetting) {
      setRange?.(null);
    }
  }, [filterStateValue.createdAt]);

  useEffect(() => {
    if (range !== null && !isResetting) {
      setIsResetting(true);

      setFilterStateValue((prev) => ({
        ...prev,
        createdAt: [null, null],
      }));

      setTimeout(() => setIsResetting(false), 0);
    }
  }, [range]);

  const updateFilter = useCallback(
    (columnId: string, filterValue: string | number | any[] | null) => {
      setFilterStateValue((prevState) => ({
        ...prevState,
        [columnId]: filterValue,
      }));
    }, []
  );

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    // totalItems,
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

  const sortedTableData = useMemo(() => {
    return [...tableData].sort((a, b) => {
      if (a.status === 4 && b.status !== 4) return 1;
      if (a.status !== 4 && b.status === 4) return -1;
      return 0;
    });
  }, [tableData]);

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
        idAppointment,
        setIdAppointment,
        isOpen,
        setIsOpen,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      onChecked,
      isOpen,
      idAppointment,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  useEffect(() => {
    refetch();
  }, [open, refetch, filterStateValue, params]);

  const { openModal } = useModal();

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
        data={sortedTableData ?? []}
        scroll={{
          x: 1560,
        }}
        onRow={(record, index) => ({
          onClick: () => {
            openModal({
              view: (
                <AppointmentDetails data={record} />
              ),
              customSize: '1100px',
            })
          },
        })}

        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize: params.perPage,
          setPageSize: (page) => setParams({ ...params, perPage: page }),
          total: dataAppointments?.count,
          current: isFilter ? 1 : currentPage,
          onChange: (page: number) => {
            handlePaginate(page);
            setParams({ ...params, page });
            setIsFilter(false);
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
            setIsFilter={setIsFilter}
          />
        }
        tableHeader={
          <TableHeader checkedItems={selectedRowKeys}>
            <StatusSelect />
          </TableHeader>
        }
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              onDeleteItem(ids.map((id) => parseInt(id)));
            }}
          ></TableFooter>
        }
      />
    </div>
  );
}
