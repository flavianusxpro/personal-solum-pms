import ControlledTable from '@/app/shared/ui/controlled-table'
import React, { useCallback, useMemo, useState } from 'react'
import { GetColumns } from './columns';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import { useColumn } from '@/core/hooks/use-column';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import { getDateRangeStateValues } from '@/core/utils/get-formatted-date';
import { useMedia } from 'react-use';
import { Button } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import ModalAddEditLetter from './ModalAddEditLetter';
import ModalDetailLetter from './ModalDetailLetter';

const TabLetter = () => {
    const { openModal } = useModal();
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
    });

    const data = [
        {
            id: 1,
            subject: 'Appointment Reschedule',
            summary: "Patient's appointment has been moved to a new schedule...",
            fileName: 'appointment-reschedule-letter.pdf',
            issuedBy: 'Dr. Emily',
            issuedAt: '01/12/2025 7:56 AM',
        },
        {
            id: 2,
            subject: 'Follow-up Reminder',
            summary: 'A reminder for the scheduled follow-up visit...',
            fileName: 'follow-up-reminder.pdf',
            issuedBy: 'Dr. Benjamin',
            issuedAt: '01/12/2025 7:56 AM',
        },
        {
            id: 3,
            subject: 'Email Evidence',
            summary: 'Recent pathology results are now ready for review...',
            fileName: 'pathology-result-summary.pdf',
            issuedBy: 'Nurse Putri',
            issuedAt: '01/12/2025 7:56 AM',
        },
        {
            id: 4,
            subject: 'Vaccination Update',
            summary: 'Immunisation schedule updated based on latest records...',
            fileName: 'vaccination-update-letter.pdf',
            issuedBy: 'Dr. Lee',
            issuedAt: '01/12/2025 7:56 AM',
        },
        {
            id: 5,
            subject: 'General Health Advice',
            summary: 'Lifestyle recommendations provided for improving health...',
            fileName: 'general-health-advice.pdf',
            issuedBy: 'Dr. Emily',
            issuedAt: '01/12/2025 7:56 AM',
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
    } = useTable(data, params.perPage);

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

    return (
        <div className='flex flex-col gap-9'>
            <h1 className='font-medium font-lexend text-base'>
                Letter
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
                    onRow={(record, index) => ({
                        onClick: () => {
                            openModal({
                                view: <ModalDetailLetter data={record} />,
                                customSize: '700px',
                            });
                        },
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
                            <div key='action-buttos' className='flex items-center gap-2'>
                                <Button
                                    onClick={() => {
                                        openModal({
                                            view: <ModalAddEditLetter />,
                                            customSize: '1100px',
                                        });
                                    }}
                                >
                                    + Add New
                                </Button>
                            </div>
                        ],
                    }}

                    className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
                />
            </div>
        </div>
    )
}

export default TabLetter