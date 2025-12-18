import ControlledTable from '@/app/shared/ui/controlled-table'
import React, { useCallback, useMemo, useState } from 'react'
import { GetColumns } from './columns';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import { useColumn } from '@/core/hooks/use-column';
import { Button } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import ModalAddEditAdmissionHistory from './ModalAddEditAdmissionHistory';
import ModalDetailAdmission from './ModalDetailAdmission';

const TabAdmissionHistory = () => {
    const { openModal } = useModal();
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
    });

    const data = [
        {
            "id": 1,
            "admissionDate": "18/12/2025",
            "status": "Discharge",
            "clinicBranch": "Solum Clinic",
            "attendingProvider": "Dr. Lisa Morgan",
            "reasonForPresentation": "Acute Appendicitis",
            "dischargeDate": "21/12/2025",
            "confirmed": true,
            "patientName": "Ahmad Santoso",
            "age": 32,
            "gender": "Male",
            "roomNumber": "A-102",
            "medicalRecordNumber": "MR-2025-001"
        },
        {
            "id": 2,
            "admissionDate": "05/12/2025",
            "status": "Discharge",
            "clinicBranch": "Solum Clinic",
            "attendingProvider": "Dr. Michael Turner",
            "reasonForPresentation": "Severe Migraine",
            "dischargeDate": "07/12/2025",
            "confirmed": true,
            "patientName": "Siti Rahayu",
            "age": 28,
            "gender": "Female",
            "roomNumber": "B-205",
            "medicalRecordNumber": "MR-2025-002"
        },
        {
            "id": 3,
            "admissionDate": "20/11/2025",
            "status": "Emergency",
            "clinicBranch": "Solum Clinic",
            "attendingProvider": "Dr. Chloe Wright",
            "reasonForPresentation": "Abdominal Pain",
            "dischargeDate": null,
            "confirmed": true,
            "patientName": "Budi Hartono",
            "age": 45,
            "gender": "Male",
            "roomNumber": "E-301",
            "medicalRecordNumber": "MR-2025-003"
        },
        {
            "id": 4,
            "admissionDate": "12/11/2025",
            "status": "Discharge",
            "clinicBranch": "Solum Clinic",
            "attendingProvider": "Dr. Henry Collins",
            "reasonForPresentation": "Wrist Fracture",
            "dischargeDate": "12/11/2025",
            "confirmed": true,
            "patientName": "Dewi Kusuma",
            "age": 19,
            "gender": "Female",
            "roomNumber": "C-108",
            "medicalRecordNumber": "MR-2025-004"
        },
        {
            "id": 5,
            "admissionDate": "03/11/2025",
            "status": "Admitted",
            "clinicBranch": "Solum Clinic",
            "attendingProvider": "Dr. Sarah Logan",
            "reasonForPresentation": "Gallbladder Issue",
            "dischargeDate": null,
            "confirmed": true,
            "patientName": "Eko Prasetyo",
            "age": 51,
            "gender": "Male",
            "roomNumber": "A-215",
            "medicalRecordNumber": "MR-2025-005"
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
                Admission History
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
                                view: <ModalDetailAdmission data={record} />,
                                customSize: '1100px',
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
                                            view: <ModalAddEditAdmissionHistory />,
                                            customSize: '1100px',
                                        });
                                    }}
                                >
                                    + Add External Admission
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

export default TabAdmissionHistory