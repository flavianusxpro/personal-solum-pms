import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { PiX } from 'react-icons/pi';
import { Button, Input, Select, Textarea } from 'rizzui';
import {
    AddMedicalCertificateLetterForm,
    addMedicalCertificateLetterSchema,
} from './addMedicalCertificateLetterSchema';
import TextEditor from '@/components/Tiptap';

interface PropTypes {
    data?: any;
    isEdit?: boolean;
}

const ModalAddEditMedicalCertificateLetter = (props: PropTypes) => {
    const { isEdit } = props;
    const { closeModal } = useModal();

    const onSubmit: SubmitHandler<AddMedicalCertificateLetterForm> = (data) => {
        console.log('Submited', data);
    };

    const certificateType = [
        {
            value: 'Fit for Work',
            label: 'Fit for Work',
        },
        {
            value: 'Unfit for Work',
            label: 'Unfit for Work',
        },
        {
            value: 'Light Duty',
            label: 'Light Duty',
        },
        {
            value: 'Medical Leave',
            label: 'Medical Leave',
        },
    ];

    return (
        <div className="w-full rounded-[24px]">
            <div className="flex items-center justify-between px-10 py-5">
                <h1 className="text-lg font-semibold">
                    {isEdit ? 'Edit' : 'Add'} Medical Certificate Letter
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>

            <Form<AddMedicalCertificateLetterForm>
                validationSchema={addMedicalCertificateLetterSchema}
                onSubmit={onSubmit}
                className="@container"
                useFormProps={{
                    mode: 'onChange',
                    defaultValues: {
                        certificateType: '',
                        startDate: undefined,
                        endDate: undefined,
                        reason: '',
                        doctorSignature: '',
                    },
                }}
            >
                {({ getValues, register, control, formState: { errors } }) => {
                    return (
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-4 p-10">
                                <Controller
                                    control={control}
                                    name="certificateType"
                                    render={({ field: { value, onChange } }) => (
                                        <Select
                                            label="Certificate Type"
                                            dropdownClassName="!z-10 h-auto"
                                            inPortal={false}
                                            placeholder="Select Certificate Type"
                                            options={certificateType}
                                            onChange={onChange}
                                            value={value}
                                            getOptionValue={(option) => option.value}
                                            displayValue={(selected) =>
                                                certificateType?.find((cat) => cat.value === selected)
                                                    ?.label ?? ''
                                            }
                                            error={errors.certificateType?.message as string}
                                        />
                                    )}
                                />

                                <div className="flex gap-4">
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <Input
                                                    type="date"
                                                    label="Start Date"
                                                    value={
                                                        field.value
                                                            ? field.value.toISOString().split('T')[0]
                                                            : ''
                                                    }
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.value ? new Date(e.target.value) : undefined
                                                        )
                                                    }
                                                    error={errors.startDate?.message as string}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="endDate"
                                            render={({ field }) => (
                                                <Input
                                                    type="date"
                                                    label="End Date"
                                                    value={
                                                        field.value
                                                            ? field.value.toISOString().split('T')[0]
                                                            : ''
                                                    }
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.value ? new Date(e.target.value) : undefined
                                                        )
                                                    }
                                                    error={errors.endDate?.message as string}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <Controller
                                    control={control}
                                    name="reason"
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            label="Reason / Diagnosis Summary"
                                            placeholder="Write your reason / diagnosis summary"
                                            error={errors.reason?.message as string}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="doctorSignature"
                                    render={({ field: { value, onChange } }) => (
                                        <Select
                                            label="Doctor's Signature"
                                            dropdownClassName="!z-10 h-auto"
                                            inPortal={false}
                                            placeholder="Select Doctor's Signature"
                                            options={certificateType}
                                            onChange={onChange}
                                            value={value}
                                            getOptionValue={(option) => option.value}
                                            displayValue={(selected) =>
                                                certificateType?.find((cat) => cat.value === selected)
                                                    ?.label ?? ''
                                            }
                                            error={errors.doctorSignature?.message as string}
                                        />
                                    )}
                                />
                            </div>

                            <div className="flex justify-end border-t border-[#D8D8D8] px-10 py-5">
                                <Button type="submit">Save</Button>
                            </div>
                        </div>
                    );
                }}
            </Form>
        </div>
    );
};

export default ModalAddEditMedicalCertificateLetter;
