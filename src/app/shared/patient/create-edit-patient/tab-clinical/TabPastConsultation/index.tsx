import ControlledTable from '@/app/shared/ui/controlled-table'
import React, { useMemo, useState } from 'react'
import { GetColumns } from './columns';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import { useColumn } from '@/core/hooks/use-column';
import { Button } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import AppointmentDetails from '@/app/shared/appointment/appointment-list/list/appointment-details';

const TabPastConsultation = () => {
    const { openModal } = useModal();
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
    });

    const data = [
        {
            "id": 130,
            "clinicId": 13,
            "patientId": 167,
            "doctorId": 14,
            "date": "2025-12-18T15:40:00.000Z",
            "status": 5,
            "type": "Initial Consult",
            "meeting_link": null,
            "meeting_id": null,
            "meeting_passcode": null,
            "patient_type": "Initial Consult",
            "patient_problem": null,
            "note": null,
            "timezone_client": "Australia/Sydney",
            "halaxy_appointment_id": null,
            "sessionId": null,
            "paymentId": 468,
            "is_reschedule": false,
            "receipt_doctor_url": null,
            "created_at": "2025-12-18T04:28:16.310Z",
            "updated_at": "2025-12-18T04:28:16.310Z",
            "payment": {
                "id": 468,
                "paymentId": "129",
                "amount": "72.34",
                "stripeId": "pi_3SfYp22USgj6t5ue0zdiUgyA",
                "type": "CARD",
                "status": 5,
                "created_at": "2025-12-18T04:28:16.310Z",
                "updated_at": "2025-12-18T04:28:16.310Z"
            },
            "patient": {
                "id": 167,
                "patient_id": "f6763b0d-658c-4c86-ac38-80836048fbcc",
                "first_name": "AL",
                "middle_name": "",
                "last_name": "Fakhri",
                "email": "al.fakhri.testing2@gmail.com",
                "mobile_number": "0481234567",
                "timezone": "Australia/Sydney",
                "age": 23
            },
            "doctor": {
                "id": 14,
                "first_name": "Ben",
                "last_name": "Carter",
                "email": "ben.carter.md@yopmail.com"
            },
            "clinic": {
                "id": 13,
                "name": "Solum Clinic"
            },
            "local_date": "2025-12-18 03:40 PM"
        },
        {
            "id": 131,
            "clinicId": 13,
            "patientId": 168,
            "doctorId": 15,
            "date": "2025-12-19T01:00:00.000Z",
            "status": 4,
            "type": "Follow Up",
            "timezone_client": "Australia/Sydney",
            "paymentId": 469,
            "is_reschedule": false,
            "created_at": "2025-12-18T06:10:00.000Z",
            "updated_at": "2025-12-18T06:10:00.000Z",
            "payment": {
                "id": 469,
                "paymentId": "130",
                "amount": "65.00",
                "type": "CARD",
                "status": 4
            },
            "patient": {
                "id": 168,
                "first_name": "Sarah",
                "last_name": "Lim",
                "email": "sarah.lim@test.com",
                "timezone": "Australia/Sydney",
                "age": 31
            },
            "doctor": {
                "id": 15,
                "first_name": "Emily",
                "last_name": "Stone"
            },
            "clinic": {
                "id": 13,
                "name": "Solum Clinic"
            },
            "local_date": "2025-12-19 12:00 PM"
        },
        {
            "id": 132,
            "clinicId": 13,
            "patientId": 169,
            "doctorId": 14,
            "date": "2025-12-20T05:30:00.000Z",
            "status": 3,
            "type": "Telehealth",
            "timezone_client": "Australia/Sydney",
            "paymentId": 470,
            "is_reschedule": true,
            "created_at": "2025-12-19T03:00:00.000Z",
            "updated_at": "2025-12-19T03:00:00.000Z",
            "payment": {
                "id": 470,
                "paymentId": "131",
                "amount": "80.00",
                "type": "CARD",
                "status": 3
            },
            "patient": {
                "id": 169,
                "first_name": "Daniel",
                "last_name": "Wong",
                "email": "daniel.wong@test.com",
                "age": 40
            },
            "doctor": {
                "id": 14,
                "first_name": "Ben",
                "last_name": "Carter"
            },
            "clinic": {
                "id": 13,
                "name": "Solum Clinic"
            },
            "local_date": "2025-12-20 04:30 PM"
        },
        {
            "id": 133,
            "clinicId": 13,
            "patientId": 170,
            "doctorId": 16,
            "date": "2025-12-21T02:00:00.000Z",
            "status": 5,
            "type": "Initial Consult",
            "timezone_client": "Australia/Sydney",
            "paymentId": 471,
            "is_reschedule": false,
            "payment": {
                "id": 471,
                "paymentId": "132",
                "amount": "90.00",
                "type": "CARD",
                "status": 5
            },
            "patient": {
                "id": 170,
                "first_name": "Michael",
                "last_name": "Brown",
                "age": 28
            },
            "doctor": {
                "id": 16,
                "first_name": "James",
                "last_name": "Lee"
            },
            "clinic": {
                "id": 13,
                "name": "Solum Clinic"
            },
            "local_date": "2025-12-21 01:00 PM"
        },
        {
            "id": 134,
            "clinicId": 13,
            "patientId": 171,
            "doctorId": 15,
            "date": "2025-12-22T06:45:00.000Z",
            "status": 2,
            "type": "Review",
            "timezone_client": "Australia/Sydney",
            "paymentId": 472,
            "is_reschedule": false,
            "payment": {
                "id": 472,
                "paymentId": "133",
                "amount": "55.00",
                "type": "CARD",
                "status": 2
            },
            "patient": {
                "id": 171,
                "first_name": "Aisyah",
                "last_name": "Rahman",
                "age": 35
            },
            "doctor": {
                "id": 15,
                "first_name": "Emily",
                "last_name": "Stone"
            },
            "clinic": {
                "id": 13,
                "name": "Solum Clinic"
            },
            "local_date": "2025-12-22 05:45 PM"
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
                Past Consultations
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
                                view: <AppointmentDetails data={record} />,
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
                        otherButton: [],
                    }}

                    className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
                />
            </div>
        </div>
    )
}

export default TabPastConsultation