import ControlledTable from '@/app/shared/ui/controlled-table'
import React, { useCallback, useMemo, useState } from 'react'
import { GetColumnsTabSMS } from './columnsTabSMS';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import { useColumn } from '@/core/hooks/use-column';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import { getDateRangeStateValues } from '@/core/utils/get-formatted-date';
import { useMedia } from 'react-use';

const TabSMS = () => {
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
      dateTime: '05/12/2025 08:15 AM',
      type: 'Email',
      title: 'Welcome Email',
      message: 'Welcome to Solum, your account has been successfully created...',
      createdBy: 'System',
      status: 'Sent',
      statusColor: 'green',
    },
    {
      id: 2,
      dateTime: '05/12/2025 09:40 AM',
      type: 'SMS',
      title: 'OTP Code',
      message: 'Your OTP code is 739201. Do not share it with anyone.',
      createdBy: 'System',
      status: 'Sent',
      statusColor: 'green',
    },
    {
      id: 3,
      dateTime: '05/12/2025 11:00 AM',
      type: 'Email',
      title: 'Password Reset Request',
      message: 'We received a request to reset your password...',
      createdBy: 'System',
      status: 'Failed',
      statusColor: 'red',
    },
    {
      id: 4,
      dateTime: '06/12/2025 08:25 AM',
      type: 'Admin Notes',
      title: 'Data Verification',
      message: 'Patient identity data has been verified by admin...',
      createdBy: 'Admin Solum',
      status: 'Internal',
      statusColor: 'gray',
    },
    {
      id: 5,
      dateTime: '06/12/2025 10:50 AM',
      type: 'SMS',
      title: 'Appointment Cancelled',
      message: 'Your appointment scheduled for tomorrow has been cancelled...',
      createdBy: 'Clinic Staff',
      status: 'Sent',
      statusColor: 'green',
    },
    {
      id: 6,
      dateTime: '07/12/2025 01:30 PM',
      type: 'Email',
      title: 'Invoice Generated',
      message: 'Invoice INV-20251207 has been generated and is pending payment...',
      createdBy: 'Billing System',
      status: 'Scheduled',
      statusColor: 'orange',
    },
    {
      id: 7,
      dateTime: '07/12/2025 03:10 PM',
      type: 'SMS',
      title: 'Doctor Assigned',
      message: 'Dr. Andi Wijaya has been assigned to your appointment...',
      createdBy: 'System',
      status: 'Sent',
      statusColor: 'green',
    },
    {
      id: 8,
      dateTime: '08/12/2025 09:05 AM',
      type: 'Email',
      title: 'Medical Result Available',
      message: 'Your laboratory test results are now available in the app...',
      createdBy: 'Laboratory',
      status: 'Scheduled',
      statusColor: 'orange',
    },
    {
      id: 9,
      dateTime: '08/12/2025 02:30 PM',
      type: 'Admin Notes',
      title: 'Insurance Approval',
      message: 'Insurance coverage has been approved by finance team...',
      createdBy: 'Finance Team',
      status: 'Internal',
      statusColor: 'gray',
    },
    {
      id: 10,
      dateTime: '09/12/2025 04:45 PM',
      type: 'SMS',
      title: 'Follow-up Reminder',
      message: 'Please remember to schedule your follow-up consultation...',
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
      GetColumnsTabSMS({
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
        SMS Communications
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

export default TabSMS