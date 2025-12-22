import ControlledTable from '@/app/shared/ui/controlled-table';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { GetColumns } from './columns';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import { getDateRangeStateValues } from '@/core/utils/get-formatted-date';
import { useMedia } from 'react-use';
import { useColumn } from '@/core/hooks/use-column';
import ExportButton from '@/app/shared/ui/export-button';

const PatientHistory = () => {
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
            "id": 1,
            "date": "01/12/2025",
            "time": "7:56 AM",
            "type": "Appointments",
            "description": "An appointment for patient Smith, Jane, scheduled for 11/12/2025 at 11:40 AM, has been deleted."
        },
        {
            "id": 2,
            "date": "01/12/2025",
            "time": "7:56 AM",
            "type": "Clinical",
            "description": "Patient record Smith, Jane was updated. Click here to see updates."
        },
        {
            "id": 3,
            "date": "01/12/2025",
            "time": "7:56 AM",
            "type": "Appointments",
            "description": "An appointment for patient Smith, Jane, scheduled for 11/12/2025 at 11:40 AM, has been updated. Click here to view details."
        },
        {
            "id": 4,
            "date": "01/12/2025",
            "time": "7:56 AM",
            "type": "Activities",
            "description": "A task has been updated for Smith, Jane. Type: Reminder; Subject: Appointment Reminder; Assignee: Work List; Priority: Low; Status: Cancelled; Due Date: 10/12/2025; Completed Date: -"
        },
        {
            "id": 5,
            "date": "01/12/2025",
            "time": "7:56 AM",
            "type": "Appointments",
            "description": "An appointment for patient Smith, Jane, scheduled for 11/12/2025 at 11:40 AM, has been created. Click here to view details."
        }
    ]

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

    const handlerSearch = useMemo(() => {
        const debounced = debounce((value: string) => {
            setParams((prev) => ({
                ...prev,
                search: value,
            }));
        }, 500);

        return debounced;
    }, []);

    useEffect(() => {
        return () => {
            handlerSearch.cancel();
        };
    }, [handlerSearch]);


    const updateFilter = useCallback(
        (columnId: string, filterValue: string | number | any[] | null) => {
            setFilterStateValue((prevState) => ({
                ...prevState,
                [columnId]: filterValue,
            }));
        },
        []
    );

    const columns = useMemo(
        () =>
            GetColumns({
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

    const isMediumScreen = useMedia('(max-width: 6000px)', false);
    const { visibleColumns, checkedColumns, setCheckedColumns } = useColumn(columns);

    return (
        <div className='w-full'>
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
                                placeholderText="Select start & end date"
                                {...(isMediumScreen && {
                                    label: 'Date',
                                    labelClassName: 'font-medium text-gray-700',
                                })}
                            />

                            <ExportButton
                                data={data}
                                fileName="patient-history"
                                header="Id,Date,Time,Type,Description"
                            />
                        </div>
                    ],
                }}

                className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
            />
        </div>
    )
}

export default PatientHistory