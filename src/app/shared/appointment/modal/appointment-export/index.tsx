import { useModal } from "@/app/shared/modal-views/use-modal";
import FormFooter from "@/core/components/form-footer";
import CheckCircleIcon from "@/core/components/icons/check-circle";
import cn from "@/core/utils/class-names";
import { exportToCSV } from "@/core/utils/export-to-csv";
import { useCallback, useEffect, useState } from "react";
import { PiArrowLineUpBold, PiXBold } from "react-icons/pi";
import { ActionIcon, AdvancedRadio, Button, RadioGroup, Select, Text, Title } from "rizzui"

const ExportAppointment = (data: any) => {
    const [value, setValue] = useState("csv");
    const { closeModal } = useModal();
    const [showColumns, setShowColumns] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState([
        'patientName',
        'doctorName',
        'paymentStatus',
        'appointmentDate',
        'appointmentType',
        'appointmentTime',
        'appointmentStatus'
    ])

    const options = [
        {
            value: 'csv',
            title: 'CSV',
        },
        {
            value: 'pdf',
            title: 'PDF',
        },
    ]

    const columnOptions = [
        { value: 'patientName', label: 'Patient Name' },
        { value: 'doctorName', label: 'Doctor Name' },
        { value: 'paymentStatus', label: 'Payment Status' },
        { value: 'appointmentDate', label: 'Appointment Date' },
        { value: 'appointmentType', label: 'Appointment Type' },
        { value: 'appointmentTime', label: 'Appointment Time' },
        { value: 'appointmentStatus', label: 'Appointment Status' },
    ];

    const allSelected = selectedColumns.length === columnOptions.length;

    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedColumns([]);
        } else {
            setSelectedColumns(columnOptions.map((col) => col.value));
        }
    };

    useEffect(() => {
        if (value === "csv") {
            setShowColumns(true);
        } else {
            setShowColumns(false);
        }
    }, [value]);

    const handleExportPdf = useCallback(() => {
        if (!data) return
        exportToCSV(data?.data, "ID,Patient,Doctor,Service Type,Date,Status,Payment,Duration", 'appointment_data');
    }, [data]);

    return (
        <div className="relative flex min-h-[400px] flex-col">
            <div className="flex w-full justify-between border-b border-gray-300 p-5">
                <Title as="h2" className="font-lexend text-lg font-semibold">
                    Export Appointment
                </Title>
                <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={() => {
                        closeModal();
                    }}
                    className="p-0 text-gray-500 hover:!text-gray-900"
                >
                    <PiXBold className="h-5 w-5" />
                </ActionIcon>
            </div>

            <div className="flex-1 flex flex-col gap-4 p-5">
                <RadioGroup
                    value={value}
                    setValue={setValue}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    {options.map((item: any) => (
                        <AdvancedRadio
                            key={item.value}
                            name="payment"
                            value={item.value}
                            inputClassName="[&:checked~span_.icon]:block"
                        >
                            <span className="flex justify-between">
                                <Text as="b">{item.title}</Text>
                                <CheckCircleIcon className="icon hidden h-5 w-5 text-secondary" />
                            </span>
                        </AdvancedRadio>
                    ))}
                </RadioGroup>

                {showColumns && (
                    <div className="flex flex-col gap-2">
                        <Text as="b">Column Name</Text>
                        <div className="border rounded-lg p-4 space-y-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={handleSelectAll}
                                />
                                <span>Select All</span>
                            </label>

                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {columnOptions.map((item) => (
                                    <label key={item.value} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedColumns.includes(item.value)}
                                            onChange={() => {
                                                if (selectedColumns.includes(item.value)) {
                                                    setSelectedColumns(selectedColumns.filter((x) => x !== item.value));
                                                } else {
                                                    setSelectedColumns([...selectedColumns, item.value]);
                                                }
                                            }}
                                        />
                                        <span>{item.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div className="p-5 flex justify-end border border-t border-[#D8D8D8]">
                {value === 'csv' ? (
                    <div>
                        <Button
                            onClick={() => { }}
                            className={cn('w-full @lg:w-auto')}
                        >
                            Download
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button
                            onClick={handleExportPdf}
                            className={cn('w-full @lg:w-auto')}
                        >
                            Download
                        </Button>
                    </div>
                )}
            </div>
            {/* <FormFooter
                className="rounded-b-xl"
                // altBtnText="Cancel"
                submitBtnText="Download"
            /> */}
        </div>
    )
}

export default ExportAppointment