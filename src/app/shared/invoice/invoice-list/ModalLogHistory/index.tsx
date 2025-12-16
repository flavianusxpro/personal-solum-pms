import { useModal } from '@/app/shared/modal-views/use-modal';
import ControlledTable from '@/app/shared/ui/controlled-table';
import { useColumn } from '@/core/hooks/use-column';
import React, { useCallback, useMemo, useState } from 'react'
import { PiX } from 'react-icons/pi'
import { Badge, Button, Flex, Input, Table, Text } from 'rizzui'
import { useTable } from '@/core/hooks/use-table';
import { getColumns } from './columns';
import { debounce } from 'lodash';
import TableFooter from '@/app/shared/ui/table-footer';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import { getDateRangeStateValues } from '@/core/utils/get-formatted-date';
import ExportButton from '@/app/shared/ui/export-button';

interface PropTypes {

}

const ModalLogHistory = (props: PropTypes) => {
    const { } = props
    const { closeModal } = useModal();
    const [filterStateValue, setFilterStateValue] = useState({
        createdAt: [null, null]
    });
    const data = [
        {
            id: 1,
            datetime: '12/12/2025 10:00 AM',
            event: 'Invoice deleted',
            entity: 'Invoice',
            source: 'Clinic',
            performed_by: 'Admin',
            status: 'Success',
            reference: 'INV-00123',
        },
        {
            id: 2,
            datetime: '11/12/2025 11:00 AM',
            event: 'Invoice cancelled',
            entity: 'Invoice',
            source: 'Clinic',
            performed_by: 'Admin',
            status: 'Failed',
            reference: 'INV-00123',
        },
        {
            id: 3,
            datetime: '10/12/2025 12:00 PM',
            event: 'Invoice refunded',
            entity: 'Payment',
            source: 'Clinic',
            performed_by: 'Admin',
            status: 'Success',
            reference: 'INV-00123',
        },
        {
            id: 4,
            datetime: '09/12/2025 01:00 PM',
            event: 'Invoice status updated',
            entity: 'Invoice',
            source: 'System',
            performed_by: 'System',
            status: 'Success',
            reference: 'INV-00123',
        },
        {
            id: 5,
            datetime: '09/12/2025 02:00 PM',
            event: 'Payment completed',
            entity: 'Payment',
            source: 'Integration',
            performed_by: 'Payment Gateway',
            status: 'Success',
            reference: 'INV-00123',
        },
        {
            id: 6,
            datetime: '08/12/2025 03:00 PM',
            event: 'Invoice sent',
            entity: 'Invoice',
            source: 'System',
            performed_by: 'System',
            status: 'Success',
            reference: 'INV-00123',
        },
        {
            id: 7,
            datetime: '04/12/2025 04:00 PM',
            event: 'Invoice issued',
            entity: 'Invoice',
            source: 'Clinic',
            performed_by: 'Admin',
            status: 'Success',
            reference: 'INV-00123',
        },
        {
            id: 8,
            datetime: '03/12/2025 05:00 PM',
            event: 'Invoice updated',
            entity: 'Invoice',
            source: 'Clinic',
            performed_by: 'Admin',
            status: 'Success',
            reference: 'INV-00123',
        },
        {
            id: 9,
            datetime: '02/12/2025 06:00 PM',
            event: 'Invoice created',
            entity: 'Invoice',
            source: 'System',
            performed_by: 'System',
            status: 'Success',
            reference: 'INV-00123',
        },
    ];


    const [params, setParams] = useState({
        page: 1,
        pageSize: 10,
        search: '',
    });
    const {
        searchTerm,
        selectedRowKeys,
        handleRowSelect,
        handleSelectAll,
        handleSearch,
        setSelectedRowKeys,
    } = useTable(data, params.pageSize, filterStateValue);

    const columns = useMemo(
        () =>
            getColumns({
                data: data,
                checkedItems: selectedRowKeys,
                handleSelectAll,
                onChecked: handleRowSelect,
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            data,
            selectedRowKeys,
            handleRowSelect,
            handleSelectAll,
        ]
    );

    const { visibleColumns, checkedColumns, setCheckedColumns } = useColumn(columns);

    const handlerSearch = useCallback(
        debounce((value: string) => {
            setParams((prevState) => ({
                ...prevState,
                search: value,
            }));
        }, 500), // Reduced from 1000ms to 500ms
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
        <div className="w-full rounded-[24px]">
            <div className="flex items-center justify-between px-10 py-5 border-b border-[#D8D8D8]">
                <h1 className="font-semibold text-lg">
                    Invoice Logs
                </h1>

                <button
                    onClick={() => {
                        closeModal()
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>

            <div className='p-10'>
                <ControlledTable
                    variant='modern'
                    isDeactiveToogleColumns={true}
                    data={data ?? []}
                    isLoading={false}
                    showLoadingText={true}
                    scroll={{
                        x: 1560,
                    }}
                    paginatorOptions={{
                        current: params.page,
                        pageSize: params.pageSize,
                        setPageSize: (pageSize: number) => setParams((p) => ({...p, pageSize})),
                        total: 10,
                        onChange: (page: number) => setParams((p) => ({ ...p, page }))
                    }}
                    columns={visibleColumns}
                    filterOptions={{
                        searchTerm,
                        onSearchClear: () => {
                            handlerSearch('');
                            handleSearch('');
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
                                    className="w-full items-center"
                                    isClearable
                                    onClear={() => {
                                        updateFilter('createdAt', [null, null]);
                                    }}
                                    selected={getDateRangeStateValues(filterStateValue['createdAt'][0])}
                                    startDate={getDateRangeStateValues(filterStateValue['createdAt'][0]) as Date}
                                    endDate={getDateRangeStateValues(filterStateValue['createdAt'][1]) as Date}
                                    onChange={(date: any) => {
                                        updateFilter('createdAt', date);
                                    }}
                                    placeholderText="Select start & end date"
                                />

                                <div>
                                    <ExportButton
                                        data={data}
                                        fileName="invoice_data"
                                        header="ID,Name,Username,Avatar,Email,Due Date,Amount,Status,Created At"
                                    />
                                </div>
                            </div>
                        ]
                    }}
                    tableFooter={
                        <TableFooter
                            checkedItems={selectedRowKeys}
                            handleDelete={(ids: string[]) => {
                                setSelectedRowKeys([]);
                            }}
                        >
                        </TableFooter>
                    }
                />
            </div>

            {/* <div className='flex justify-end px-10 py-5 border-t border-[#D8D8D8] gap-4'>
                <Button
                    variant='outline'
                    onClick={() => { }}
                >
                    Done
                </Button>
                <Button
                    onClick={() => { }}
                >
                    Retry Failed Only
                </Button>
            </div> */}
        </div>
    )
}

export default ModalLogHistory