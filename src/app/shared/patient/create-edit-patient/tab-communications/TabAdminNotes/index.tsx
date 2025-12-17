import ControlledTable from '@/app/shared/ui/controlled-table'
import React, { useCallback, useMemo, useState } from 'react'
import { GetColumnsTabAdminNotes } from './columnsTabAdminNotes';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import { useColumn } from '@/core/hooks/use-column';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import { getDateRangeStateValues } from '@/core/utils/get-formatted-date';
import { useMedia } from 'react-use';

const TabAdminNotes = () => {
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
      dateTime: '06/12/2025 08:05 AM',
      type: 'Email',
      title: 'Account Activation',
      message: 'Please activate your account using the link provided...',
      createdBy: 'System',
      status: 'Sent',
      statusColor: 'green',
    },
    {
      id: 2,
      dateTime: '06/12/2025 09:20 AM',
      type: 'SMS',
      title: 'Verification Code',
      message: 'Your verification code is 928374.',
      createdBy: 'System',
      status: 'Sent',
      statusColor: 'green',
    },
    {
      id: 3,
      dateTime: '06/12/2025 10:45 AM',
      type: 'Email',
      title: 'Password Reset Failed',
      message: 'We could not process your password reset request...',
      createdBy: 'System',
      status: 'Failed',
      statusColor: 'red',
    },
    {
      id: 4,
      dateTime: '07/12/2025 08:30 AM',
      type: 'Admin Notes',
      title: 'Manual Data Review',
      message: 'Patient data has been reviewed manually by admin...',
      createdBy: 'Admin Solum',
      status: 'Internal',
      statusColor: 'gray',
    },
    {
      id: 5,
      dateTime: '07/12/2025 11:10 AM',
      type: 'SMS',
      title: 'Appointment Cancelled',
      message: 'Your appointment has been cancelled due to doctor unavailability...',
      createdBy: 'Clinic Staff',
      status: 'Sent',
      statusColor: 'green',
    },
    {
      id: 6,
      dateTime: '08/12/2025 01:25 PM',
      type: 'Email',
      title: 'Invoice Reminder',
      message: 'This is a reminder that your invoice is still unpaid...',
      createdBy: 'Billing System',
      status: 'Scheduled',
      statusColor: 'orange',
    },
    {
      id: 7,
      dateTime: '08/12/2025 03:40 PM',
      type: 'SMS',
      title: 'Doctor Assigned',
      message: 'Dr. Rina Pratama has been assigned to your appointment...',
      createdBy: 'System',
      status: 'Sent',
      statusColor: 'green',
    },
    {
      id: 8,
      dateTime: '09/12/2025 09:00 AM',
      type: 'Email',
      title: 'Health Check Schedule',
      message: 'Your annual health check has been scheduled...',
      createdBy: 'System',
      status: 'Scheduled',
      statusColor: 'orange',
    },
    {
      id: 9,
      dateTime: '09/12/2025 02:15 PM',
      type: 'Admin Notes',
      title: 'Insurance Updated',
      message: 'Patient insurance information has been updated...',
      createdBy: 'Finance Team',
      status: 'Internal',
      statusColor: 'gray',
    },
    {
      id: 10,
      dateTime: '10/12/2025 04:50 PM',
      type: 'SMS',
      title: 'Follow-up Needed',
      message: 'Please contact the clinic to schedule a follow-up visit...',
      createdBy: 'System',
      status: 'Sent',
      statusColor: 'green',
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
      GetColumnsTabAdminNotes({
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

export default TabAdminNotes