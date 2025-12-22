import { useModal } from '@/app/shared/modal-views/use-modal';
import ControlledTable from '@/app/shared/ui/controlled-table';
import { useColumn } from '@/core/hooks/use-column';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react'
import { PiX } from 'react-icons/pi';
import { GetColumns } from './columns';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import { getDateRangeStateValues } from '@/core/utils/get-formatted-date';
import ExportButton from '@/app/shared/ui/export-button';
import { useMedia } from 'react-use';

interface PropTypes {
    data?: any;
    isEdit?: boolean;
}

const LogAppointment = (props: PropTypes) => {
    const [filterStateValue, setFilterStateValue] = useState({
        createdAt: [null, null]
    });
    const { isEdit } = props
    const { closeModal } = useModal();
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
    });

    const data = [
        {
            "id": 1,
            "dateTime": "10/12/2025 7:56 AM",
            "event": "Appointment completed",
            "source": "Clinic",
            "performedBy": "Dr. Ben Carter",
            "status": "Success",
            "reference": "APT-01124"
        },
        {
            "id": 2,
            "dateTime": "09/12/2025 7:56 AM",
            "event": "Appointment deleted",
            "source": "System",
            "performedBy": "System",
            "status": "Success",
            "reference": "APT-01124"
        },
        {
            "id": 3,
            "dateTime": "08/12/2025 7:56 AM",
            "event": "Appointment cancelled",
            "source": "Clinic",
            "performedBy": "Admin Sarah",
            "status": "Success",
            "reference": "APT-01124"
        },
        {
            "id": 4,
            "dateTime": "05/12/2025 7:56 AM",
            "event": "Appointment rescheduled",
            "source": "Clinic",
            "performedBy": "Admin Sarah",
            "status": "Failed",
            "reference": "APT-01124"
        },
        {
            "id": 5,
            "dateTime": "04/12/2025 7:56 AM",
            "event": "Appointment updated",
            "source": "Clinic",
            "performedBy": "Admin Sarah",
            "status": "Success",
            "reference": "APT-01124"
        },
        {
            "id": 6,
            "dateTime": "04/12/2025 7:56 AM",
            "event": "Appointment created",
            "source": "Portal",
            "performedBy": "Admin Sarah",
            "status": "Success",
            "reference": "APT-01124"
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
        <div className="w-full rounded-[24px]">
            <div className="border-b border-[#D8D8D8] flex items-center justify-between px-10 py-5">
                <h1 className="font-semibold text-lg">
                    Appointment Logs
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>


            <div className='p-10'>
                <ControlledTable
                    isDeactiveToogleColumns
                    variant='modern'
                    isLoading={isLoading}
                    showLoadingText={true}
                    data={tableData}
                    scroll={{
                        x: 1560,
                    }}
                    onRow={(record, index) => ({
                        // onClick: () => {
                        //     openModal({
                        //         view: <ModalDetailLetter data={record} />,
                        //         customSize: '700px',
                        //     });
                        // },
                    })}
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
                            <div key='action-buttons' className='flex items-center gap-2'>
                                <DateFiled
                                    selectsRange
                                    dateFormat="dd MMM yyyy"
                                    className="w-[270px]"
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

                                <div>
                                    <ExportButton
                                        data={data}
                                        fileName="log-appointment"
                                        header="Id,Date,Time,Type,Description"
                                    />
                                </div>
                            </div>
                        ],
                    }}

                    className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
                />
            </div>
        </div>
    )
}

export default LogAppointment