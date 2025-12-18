import ControlledTable from '@/app/shared/ui/controlled-table'
import React, { useCallback, useMemo, useState } from 'react'
import { GetColumns } from './columns';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import { useColumn } from '@/core/hooks/use-column';
import { Button } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import ModalAddEditRx from './ModalAddEditRx';

const TabMedications = () => {
    const { openModal } = useModal();
    const [subTab, setSubTab] = useState<'current rx' | 'past rx'>('current rx')
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
    });

    const data = [
        {
            id: 1,
            type: 'Acute',
            drugName: 'Amoxicillin',
            strength: '500 mg',
            dose: '1 tablet, 3x/day',
            qty: 21,
            repeats: 0,
            prescribed: '12/01/2025',
            longTerm: false,
            endDate: '19/01/2025',
            status: 'Active',
            reason: 'Infection',
        },
        {
            id: 2,
            type: 'Long-term',
            drugName: 'Metformin',
            strength: '850 mg',
            dose: '1 tablet, 2x/day',
            qty: 60,
            repeats: 3,
            prescribed: '05/01/2025',
            longTerm: true,
            endDate: '-',
            status: 'Active',
            reason: 'Diabetes',
        },
        {
            id: 3,
            type: 'Long-term',
            drugName: 'Amlodipine',
            strength: '10 mg',
            dose: '1 tablet/day',
            qty: 30,
            repeats: 5,
            prescribed: '15/12/2024',
            longTerm: true,
            endDate: '-',
            status: 'Active',
            reason: 'Hypertension',
        },
        {
            id: 4,
            type: 'Imported',
            drugName: 'Vitamin D',
            strength: '1000 IU',
            dose: '1 capsule/day',
            qty: 30,
            repeats: 0,
            prescribed: '10/11/2024',
            longTerm: false,
            endDate: '10/12/2024',
            status: 'Active',
            reason: 'Supplement',
        },
        {
            id: 5,
            type: 'Acute',
            drugName: 'Ibuprofen',
            strength: '400 mg',
            dose: '1 tablet PRN',
            qty: 10,
            repeats: 0,
            prescribed: '02/10/2024',
            longTerm: false,
            endDate: '07/10/2024',
            status: 'Active',
            reason: 'Pain relief',
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
        <div className='flex flex-col gap-9 w-full'>
            <div className='flex gap-2 justify-between items-center'>
                <h1 className='font-medium font-lexend text-base'>
                    Medications
                </h1>
                <div className='flex gap-2'>
                    <Button
                        variant={subTab === 'current rx' ? 'solid' : 'outline'}
                        type="button"
                        size='sm'
                        onClick={() => setSubTab('current rx')}
                        className='flex text-sm'
                    >
                        Current rx
                    </Button>
                    <Button
                        variant={subTab === 'past rx' ? 'solid' : 'outline'}
                        type="button"
                        size='sm'
                        onClick={() => setSubTab('past rx')}
                        className='flex text-sm'
                    >
                        Past Rx
                    </Button>
                </div>
            </div>

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
                                            view: <ModalAddEditRx />,
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

export default TabMedications