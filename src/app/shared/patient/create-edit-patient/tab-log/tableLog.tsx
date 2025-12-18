import React, { useCallback, useMemo, useState } from 'react'
import { GetColumns } from './tableLogColumns';
import { useTable } from '@/core/hooks/use-table';
import { useMedia } from 'react-use';
import ControlledTable from '@/app/shared/ui/controlled-table';
import { debounce } from 'lodash';
import { useColumn } from '@/core/hooks/use-column';
import cn from '@/core/utils/class-names';
import { Button, Input } from 'rizzui';
import { PiArrowLineUpBold } from 'react-icons/pi';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import { getDateRangeStateValues } from '@/core/utils/get-formatted-date';

const filterState = {
    createdAt: [null, null],
};

const TableLog = (data: any) => {
    const [filterStateValue, setFilterStateValue] = useState(filterState);
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
    });
    const isMediumScreen = useMedia('(max-width: 6000px)', false);

    const {
        isLoading,
        tableData,
        handlePaginate,
        searchTerm,
        handleSearch,
        sortConfig,
        handleSelectAllRow,
        handleSelectRow,
        selectedRowKeys,
        filters
    } = useTable(data?.data?.log_histories, params.perPage, filterStateValue);

    const columns = useMemo(
        () =>
            GetColumns({
                data: data?.data?.log_histories,
                sortConfig,
                checkedItems: selectedRowKeys,
                onChecked: handleSelectRow,
                handleSelectAllRow,
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            sortConfig.key,
            sortConfig.direction,
            selectedRowKeys,
            handleSelectRow,
            handleSelectAllRow,
            data?.data?.log_histories,
        ]
    );

    const { visibleColumns, checkedColumns, setCheckedColumns } = useColumn(columns);

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

    const updateFilter = useCallback(
        (columnId: string, filterValue: string | number | any[] | null) => {
            setFilterStateValue((prevState) => ({
                ...prevState,
                [columnId]: filterValue,
            }));
        },
        []
    );

    return (
        <div
            className={cn(
                '[&_.table-filter>div:first-child]:grow [&_.table-filter>div:first-child]:justify-between',
                !isMediumScreen && '[&_.table-filter>div:first-child]:flex-row-reverse'
            )}
        >
            <ControlledTable
                isDeactiveToogleColumns
                variant="modern"
                isLoading={isLoading}
                showLoadingText={true}
                data={tableData}
                scroll={{
                    x: 1560,
                }}
                // @ts-ignore
                columns={visibleColumns}
                paginatorOptions={{
                    pageSize: params.perPage,
                    setPageSize: (page: any) => setParams({ ...params, perPage: page }),
                    total: 10,
                    current: 1,
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
                    columns,
                    checkedColumns,
                    setCheckedColumns,
                    otherButton: [
                        <div key="action-buttons" className="flex items-center gap-2">
                            <DateFiled
                                selectsRange
                                dateFormat="dd MMM yyyy"
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
                            />
                            <Button variant='outline' className="w-full @lg:w-auto" onClick={() => { }}>
                                <PiArrowLineUpBold className="me-1.5 h-[17px] w-[17px]" />
                                Export
                            </Button>
                        </div>
                    ],
                }}
                className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
            />
        </div>
    )
}

export default TableLog