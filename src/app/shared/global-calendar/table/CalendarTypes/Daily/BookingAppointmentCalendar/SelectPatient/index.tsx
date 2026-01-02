import React, { useEffect, useMemo, useState } from 'react'
import useSelectPatient from './useSelectPatient'
import { Select, Textarea } from 'rizzui';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { PiHospital } from 'react-icons/pi';
import { LuCalendarClock } from 'react-icons/lu';
import dayjs from 'dayjs';

interface PropTypes {
    onChange: (key: string, value: any) => void;
    formData: any
}

interface PatientOption {
    label: string;
    value: number;
    data: any;
}

interface TreatmentOption {
    label: string;
    value: string;
}

const SelectPatient = (props: PropTypes) => {
    const {
        onChange,
        formData,
    } = props

    const {
        dataPatients,
        isLoadingDataPatients,
        dataTreatments,
        isLoadingDataTreatments,
        dataAppointments,
        isLoadingDataAppointments,
    } = useSelectPatient({ formData });

    const [selectedPatient, setSelectedPatient] = useState<PatientOption | null>(null);

    const [selectedTreatmentType, setSelectedTreatmentType] = useState<TreatmentOption | null>(null);

    const patientOptions = dataPatients?.map(patient => ({
        label: `${patient.first_name} ${patient.last_name}`.trim(),
        value: patient.id,
        data: patient
    })) || [];

    const handleTreatmentChange = (option: TreatmentOption | null) => {
        setSelectedTreatmentType(option);
        onChange('treatmentType', option?.value ?? null);
    };

    const handlePatientChange = (option: PatientOption | null) => {
        setSelectedPatient(option);

        if (!option) {
            onChange('patientId', null);
            onChange('patientName', null);
            return;
        }

        onChange('patientId', option.value);
        onChange('patientName', option.label);
    };

    const treatmentOptions: TreatmentOption[] = useMemo(() => {
        if (!dataTreatments) return [];

        const mapped = dataTreatments.map((item: any) => ({
            label: item.name,
            value: item.name,
        }));

        if (dataAppointments?.length === 0) {
            return mapped.filter(item => item.value !== 'Follow Up');
        }

        return mapped;
    }, [dataTreatments, dataAppointments]);
    
    useEffect(() => {
        if (!selectedPatient?.value || !dataAppointments?.length) return;

        const matchedAppointment = dataAppointments.find(
            (appointment: any) =>
                appointment.patientId === selectedPatient.value
        );

        if (!matchedAppointment?.type) return;

        const matchedTreatment = treatmentOptions.find(
            option => option.value === matchedAppointment.type
        );

        if (!matchedTreatment) return;

        setSelectedTreatmentType(matchedTreatment);
        onChange('treatmentType', matchedTreatment.value);
    }, [selectedPatient, dataAppointments, treatmentOptions]);

    const lastClinic = useMemo(() => {
        if (!formData.patientId) return null

        const selectedPatient = dataPatients?.find(
            (patient) => patient.id === formData.patientId
        );

        const patientLastClinic = selectedPatient?.clinics?.[0];
        if (patientLastClinic) {
            onChange('clinicId', patientLastClinic.id);
            return patientLastClinic;
        }

        return null;
    }, [dataPatients, formData.patientId])

    const lastAppointment = useMemo(() => {
        if (!formData.patientId) return null;
        return dataAppointments?.[0];
    }, [dataAppointments, formData.patientId]);

    console.log('zzz lastClinic', lastClinic);
    

    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-2 gap-4'>
                <Select
                    label="Patient"
                    options={patientOptions}
                    value={selectedPatient}
                    disabled={isLoadingDataPatients}
                    onChange={handlePatientChange}
                    placeholder="Select patient"
                    searchable
                    clearable
                />

                <Select
                    label="Appointment Type"
                    options={treatmentOptions}
                    value={selectedTreatmentType}
                    disabled={isLoadingDataTreatments}
                    onChange={handleTreatmentChange}
                    placeholder='Select appointment type'
                    searchable
                    clearable
                />

                <Textarea
                    label="Appointment Notes"
                    placeholder="Add appointment notes"
                    onChange={(e) => onChange('notes', e.target.value)}
                    style={{ minHeight: '120px', resize: 'vertical' }}
                />

                <Textarea
                    label="Comments"
                    placeholder="Add comments"
                    onChange={(e) => onChange('comments', e.target.value)}
                    style={{ minHeight: '120px', resize: 'vertical' }}
                />
            </div>

            {(lastClinic && dataAppointments && dataAppointments.length !== 0) && (
                <div className='flex flex-col gap-4'>
                    <h1 className='font-lexend font-medium text-base'>
                        Last Appointment
                    </h1>

                    <div className='flex gap-2'>
                        {dataAppointments?.map((item, index) => (
                            <div key={index} className="flex gap-4 items-start rounded-2xl px-6 py-4 bg-white border border-black/5 shadow-[0_0_6px_rgba(0,0,0,0.06)]">
                                <span>
                                    <FaRegCalendarAlt className='text-[33px]' />
                                </span>
                                <div className='flex flex-col gap-1'>
                                    <h1 className='font-lexend font-semibold text-base'>
                                        {`Dr. ${item.doctor.first_name} ${item.doctor.last_name}`}
                                    </h1>
                                    <span className='flex items-center'>
                                        <PiHospital className='w-[18px]' /> <p className='ml-2 font-inter font-normal text-sm text-[#A19F9F]'>{item?.clinic.name}</p>
                                    </span>
                                    <span className='flex items-center'>
                                        <LuCalendarClock className='w-[18px]' /> <p className='ml-2 font-inter font-normal text-sm text-[#A19F9F]'>
                                            {dayjs(item?.date).format('dddd, DD MMM YYYY - hh:mm A')}
                                        </p>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SelectPatient