import ControlledTable from '@/app/shared/ui/controlled-table'
import React, { useCallback, useMemo, useState } from 'react'
import { GetColumns } from './columns';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import { useColumn } from '@/core/hooks/use-column';
import { Button } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import ModalAddEditImmunisation from './ModalAddEditImmunisation';
import ModalDetailImmunisation from './ModalDetailImmunisation';

const TabImmunisations = () => {
    const { openModal } = useModal();
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
    });

    const data = [
        {
            id: 1,
            givenDate: '19/11/2025',
            vaccine: 'Influenza (FluQuadri)',
            dose: '0.5 mL',
            batchNo: 'FLQ25-088',
            site: 'Left Deltoid',
            route: 'Intramuscular',
            given: true,
            confidential: false,
        },
        {
            id: 2,
            givenDate: '19/11/2025',
            vaccine: 'COVID-19 Pfizer',
            dose: '0.3 mL',
            batchNo: 'PFZ25-112',
            site: 'Right Deltoid',
            route: 'Subcutaneous',
            given: true,
            confidential: true,
        },
        {
            id: 3,
            givenDate: '19/11/2025',
            vaccine: 'Tdap',
            dose: '0.5 mL',
            batchNo: 'TDP25-055',
            site: 'Left Anterior Thigh',
            route: 'Oral',
            given: true,
            confidential: false,
        },
        {
            id: 4,
            givenDate: '19/11/2025',
            vaccine: 'Hepatitis B',
            dose: '1 mL',
            batchNo: 'HEP25-009',
            site: 'Right Anterior Thigh',
            route: 'Intradermal',
            given: false,
            confidential: false,
        },
        {
            id: 5,
            givenDate: '19/11/2025',
            vaccine: 'MMR',
            dose: '0.5 mL',
            batchNo: 'TDP25-056',
            site: 'Left Gluteus',
            route: 'Intramuscular',
            given: true,
            confidential: true,
        },
        {
            id: 6,
            givenDate: '19/11/2025',
            vaccine: 'MMR',
            dose: '0.5 mL',
            batchNo: 'TDP25-057',
            site: 'Right Gluteus',
            route: 'Subcutaneous',
            given: true,
            confidential: true,
        },
        {
            id: 7,
            givenDate: '19/11/2025',
            vaccine: 'MMR',
            dose: '0.5 mL',
            batchNo: 'TDP25-058',
            site: 'Left Forearm',
            route: 'Oral',
            given: true,
            confidential: true,
        },
        {
            id: 8,
            givenDate: '19/11/2025',
            vaccine: 'MMR',
            dose: '0.5 mL',
            batchNo: 'TDP25-059',
            site: 'Right Forearm',
            route: 'Intradermal',
            given: true,
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
                Immunisations
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
                                view: <ModalDetailImmunisation data={record} />,
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
                                            view: <ModalAddEditImmunisation />,
                                            customSize: '1100px',
                                        });
                                    }}
                                >
                                    + New Immunisation
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

export default TabImmunisations