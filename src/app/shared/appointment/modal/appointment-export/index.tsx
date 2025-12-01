import { useModal } from "@/app/shared/modal-views/use-modal";
import FormFooter from "@/core/components/form-footer";
import CheckCircleIcon from "@/core/components/icons/check-circle";
import { useEffect, useState } from "react";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, AdvancedRadio, RadioGroup, Select, Text, Title } from "rizzui"

const ExportAppointment = () => {
    const [value, setValue] = useState("csv");
    const [type, setType] = useState("csv")
    const { closeModal } = useModal();
    const [showColumns, setShowColumns] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState([
        'patient_first_name', 'patient_last_name', 'date', 'doctor_first_name', 'doctor_last_name', 'patient_type', 'apt_status', 'payment_status', 'time'
    ])
    useEffect(() => {
        if (selectedColumns.length > 0 && type === undefined) {
            setType('Spesific')
        }
    }, [selectedColumns])

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
        { value: 'patient_first_name', label: 'Patient First Name' },
        { value: 'patient_last_name', label: 'Patient Last Name' },
        { value: 'date', label: 'Appointment Date' },
        { value: 'time', label: 'Appointment Time' },
        { value: 'doctor_first_name', label: 'Doctor First Name' },
        { value: 'doctor_last_name', label: 'Doctor Last Name' },
        { value: 'apt_status', label: 'Appointment Status' },
        { value: 'payment_status', label: 'Payment Status' },
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
                {/* <Select
                    label="Select column"
                    options={[]}
                    disabled={value === 'pdf'}
                    value={value}
                    onChange={setValue}
                /> */}
                {showColumns && (
                    <div className="border rounded-lg p-4 space-y-2">
                        <Text as="b">Column Name</Text>

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
                )}

            </div>

            <FormFooter
                className="rounded-b-xl"
                // altBtnText="Cancel"
                submitBtnText="Download"
            />
        </div>
    )
}

export default ExportAppointment