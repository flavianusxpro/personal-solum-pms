import ControlledTable from '@/app/shared/ui/controlled-table'
import React, { useCallback, useMemo, useState } from 'react'
import { GetColumnsTabAll } from './columnsTabAll';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import { useColumn } from '@/core/hooks/use-column';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import { getDateRangeStateValues } from '@/core/utils/get-formatted-date';
import { useMedia } from 'react-use';

const TabAll = () => {
  const [filterStateValue, setFilterStateValue] = useState({
    createdAt: [null, null]
  });
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    search: '',
  });

  const data = [
    {
      id: 1,
      dateTime: '01/12/2025 7:56 AM',
      type: 'Email',
      title: 'Invoice Available',
      message: 'Your invoice INV-20251213 is now available...',
      createdBy: 'System',
      status: 'Scheduled',
    },
    {
      id: 2,
      dateTime: '01/12/2025 7:56 AM',
      type: 'Email',
      title: 'Appointment Confirmation',
      message: 'Your appointment has been succe...',
      createdBy: 'System',
      status: 'Sent',
    },
    {
      id: 3,
      dateTime: '01/12/2025 7:56 AM',
      type: 'SMS',
      title: 'Appointment Reminder',
      message: 'This is a reminder for your appointment tomorrow...',
      createdBy: 'System',
      status: 'Sent',
    },
    {
      id: 4,
      dateTime: '01/12/2025 7:56 AM',
      type: 'Admin Notes',
      title: 'Lab Result Notification',
      message: 'Your lab results are ready to be reviewed...',
      createdBy: 'System',
      status: 'Internal',
    },
    {
      id: 5,
      dateTime: '01/12/2025 7:56 AM',
      type: 'SMS',
      title: 'Appointment Rescheduled',
      message: 'Your appointment schedule has been updated...',
      createdBy: 'Admin Solum',
      status: 'Failed',
    },
    {
      id: 6,
      dateTime: '02/12/2025 9:30 AM',
      type: 'Email',
      title: 'Payment Received',
      message: 'Thank you for your payment of $150.00...',
      createdBy: 'System',
      status: 'Sent',
    },
    {
      id: 7,
      dateTime: '02/12/2025 10:15 AM',
      type: 'SMS',
      title: 'Prescription Ready',
      message: 'Your prescription is ready for pickup at...',
      createdBy: 'Pharmacy Staff',
      status: 'Sent',
    },
    {
      id: 8,
      dateTime: '03/12/2025 8:00 AM',
      type: 'Email',
      title: 'Health Check Reminder',
      message: "It's time for your annual health check...",
      createdBy: 'System',
      status: 'Scheduled',
    },
    {
      id: 9,
      dateTime: '03/12/2025 2:45 PM',
      type: 'Admin Notes',
      title: 'Patient Chart Updated',
      message: 'Medical history has been updated by Dr. Smith...',
      createdBy: 'Dr. Smith',
      status: 'Internal',
    },
    {
      id: 10,
      dateTime: '04/12/2025 11:20 AM',
      type: 'SMS',
      title: 'Test Results Available',
      message: 'Your COVID-19 test results are now available...',
      createdBy: 'System',
      status: 'Sent',
    },
  ];


  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    handlePaginate,
    searchTerm,
    handleSearch,
    handleSelectAllRow,
    handleSelectRow,
    selectedRowKeys,
    filters,
  } = useTable(data, params.perPage, filterStateValue);

  const columns = useMemo(
    () =>
      GetColumnsTabAll({
        data: data,
        handleSelectAllRow,
        checkedItems: selectedRowKeys,
        onChecked: handleSelectRow,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      handleSelectAllRow,
      selectedRowKeys,
      data,
    ]
  );

  const handlerSearch = useMemo(
    () =>
      debounce((value: string) => {
        setParams((prevState) => ({
          ...prevState,
          search: value,
        }));
      }, 500),
    []
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } = useColumn(columns);

  const updateFilter = useCallback(
    (columnId: string, filterValue: string | number | any[] | null) => {
      setFilterStateValue((prevState) => ({
        ...prevState,
        [columnId]: filterValue,
      }));
    },
    []
  );

  const isMediumScreen = useMedia('(max-width: 6000px)', false);
  return (
    <div className='flex flex-col gap-9'>
      <h1 className='font-medium font-lexend text-base'>
        All Communications
      </h1>

      <div>
        <ControlledTable
          isDeactiveToogleColumns
          variant='modern'
          isLoading={isLoading}
          showLoadingText={true}
          data={tableData ?? []}
          scroll={{
            x: 1560,
          }}
          columns={visibleColumns}
          paginatorOptions={{
            pageSize: params.perPage,
            setPageSize: (page) => setParams({ ...params, perPage: page }),
            total: 10,
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
            otherButton: [
              <div key='action-buttos' className='flex items-center gap-2'>
                <DateFiled
                  selectsRange
                  dateFormat="dd MMM yyyy"
                  className="w-full"
                  isClearable
                  onClear={() => {
                    updateFilter('createdAt', [null, null]);
                  }}
                  selected={getDateRangeStateValues(filters?.['createdAt']?.[0])}
                  startDate={getDateRangeStateValues(filters?.['createdAt']?.[0]) as Date}
                  endDate={getDateRangeStateValues(filters?.['createdAt']?.[1]) as Date}
                  onChange={(date: any) => {
                    updateFilter('createdAt', date);
                  }}
                  placeholderText="Select date"
                  {...(isMediumScreen && {
                    label: 'Date',
                    labelClassName: 'font-medium text-gray-700',
                  })}
                />
              </div>
            ],
          }}

          className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
        />
      </div>
    </div>
  )
}

export default TabAll