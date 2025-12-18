import ControlledTable from '@/app/shared/ui/controlled-table'
import React, { useCallback, useMemo, useState } from 'react'
import { GetColumns } from './columns';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import { useColumn } from '@/core/hooks/use-column';
import { Button } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CreateConsultNotes from './CreateConsultNotes';
import ModalDetailConsultNotes from './ModalDetailConsultNotes';

const TabConsultNotes = () => {
    const { openModal } = useModal();
    const [isCreate, setIsCreate] = useState(false)
    const [dataEdit, setDataEdit] = useState(null)
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
    });

    const data = [
        {
            id: 1,
            date: '01/12/2025 7:56 AM',
            notes: 'Initial consult: fever, mild cough, given paracetamol',
            confidential: true,
            createdBy: 'Dr. Emily',
        },
        {
            id: 2,
            date: '01/12/2025 7:56 AM',
            notes: 'Follow-up: BP stable, reduced amlodipine dosage',
            confidential: true,
            createdBy: 'Dr. Emily',
        },
        {
            id: 3,
            date: '01/12/2025 7:56 AM',
            notes: 'Rash improving, continue topical steroid',
            confidential: false,
            createdBy: 'Nurse Putri',
        },
        {
            id: 4,
            date: '01/12/2025 7:56 AM',
            notes: 'Dizziness complaint, advised CBC & hydration',
            confidential: false,
            createdBy: 'Dr. Benjamin',
        },
        {
            id: 5,
            date: '01/12/2025 7:56 AM',
            notes: 'Flu recovery follow-up, symptoms decreased',
            confidential: true,
            createdBy: 'Dr. Emily',
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
                setIsCreate,
                setDataEdit,
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            handleSelectAllRow,
            selectedRowKeys,
            data,
            setIsCreate,
            setDataEdit
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
        <>
            {isCreate ? (
                <CreateConsultNotes 
                    setIsCreate={setIsCreate}
                    dataEdit={dataEdit} 
                    setDataEdit={setDataEdit}
                />
            ) : (
                <div className='flex flex-col gap-9 w-full'>
                    <h1 className='font-medium font-lexend text-base'>
                        Consult Notes
                    </h1 >

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
                                        view: <ModalDetailConsultNotes data={record} />,
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
                                                setIsCreate(true)
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
                </div >
            )}
        </>
    )
}

export default TabConsultNotes