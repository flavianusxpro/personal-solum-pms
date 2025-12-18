import ControlledTable from '@/app/shared/ui/controlled-table'
import React, { useCallback, useMemo, useState } from 'react'
import { GetColumns } from './columns';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import { useColumn } from '@/core/hooks/use-column';
import { Button } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import ModalAddEditMedicalHistory from './ModalAddEditMedicalHistory';

const TabMedicalHistory = () => {
    const { openModal } = useModal();
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
    });

    const data = [
        {
            id: 1,
            date: '19/11/2025',
            condition: 'Hypertension',
            severity: 'Moderate',
            status: 'Active',
            summary: 'BP 150/95',
            mhr: true,
            comments: 'Needs monitoring every month',
            createdBy: 'Dr. Emily',
            confidential: true,
        },
        {
            id: 2,
            date: '05/11/2024',
            condition: 'Diabetes Type 2',
            severity: 'Severe',
            status: 'Active',
            summary: 'HbA1c 9.0%',
            mhr: false,
            comments: 'Patient advised dietary changes',
            createdBy: 'Dr. Emily',
            confidential: true,
        },
        {
            id: 3,
            date: '14/03/2024',
            condition: 'Allergy – Dust',
            severity: 'Mild',
            status: 'Active',
            summary: 'Runny nose & sneezing',
            mhr: false,
            comments: 'Considering allergy test',
            createdBy: 'Admin Dian',
            confidential: true,
        },
        {
            id: 4,
            date: '22/07/2023',
            condition: 'Asthma',
            severity: 'Mild',
            status: 'Resolved',
            summary: 'No attacks in 6 months',
            mhr: true,
            comments: 'Continue inhaler PRN',
            createdBy: 'Nurse Alex',
            confidential: true,
        },
        {
            id: 5,
            date: '30/09/2022',
            condition: 'Migraine',
            severity: 'Moderate',
            status: 'Inactive',
            summary: 'No symptoms in past year',
            mhr: true,
            comments: 'Monitor if recurring',
            createdBy: 'Dr. Benjamin',
            confidential: true,
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
                Medical History
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
                            // openModal({
                            //     view: <ModalDetailLetter data={record} />,
                            //     customSize: '700px',
                            // });
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
                                            view: <ModalAddEditMedicalHistory />,
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

export default TabMedicalHistory