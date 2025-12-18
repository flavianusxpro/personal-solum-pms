import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { PiX } from 'react-icons/pi';
import { Button, FileInput, Input, Select, Textarea } from 'rizzui';
import {
    AddSpecialistLetterForm,
    addSpecialistLetterSchema,
} from './addSpecialistLetterSchema';
import FileUploadField from '@/core/ui/uploadFile';

interface PropTypes {
    data?: any;
    isEdit?: boolean;
}

const ModalAddEditSpecialistLetter = (props: PropTypes) => {
    const { isEdit } = props;
    const { closeModal } = useModal();

    const onSubmit: SubmitHandler<AddSpecialistLetterForm> = (data) => {
        console.log('Submited', data);
    };

    const specialistType = [
        {
            value: 'Type 1',
            label: 'Type 1',
        },
        {
            value: 'Type 2',
            label: 'Type 2',
        },
    ];

    return (
        <div className="w-full rounded-[24px]">
            <div className="flex items-center justify-between px-10 py-5">
                <h1 className="text-lg font-semibold">
                    {isEdit ? 'Edit' : 'Add'} Specialist Letter
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>

            <Form<AddSpecialistLetterForm>
                validationSchema={addSpecialistLetterSchema}
                onSubmit={onSubmit}
                className="@container"
                useFormProps={{
                    mode: 'onChange',
                    defaultValues: {
                        specialistType: '',
                        referralPurpose: '',
                        pastMedicalHistory: '',
                        patientConditionSummary: '',
                        attachment: [],
                    },
                }}
            >
                {({ setValue, getValues, register, control, formState: { errors } }) => {
                    return (
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-4 p-10">
                                <Controller
                                    control={control}
                                    name="specialistType"
                                    render={({ field: { value, onChange } }) => (
                                        <Select
                                            label="Specialist Type"
                                            dropdownClassName="!z-10 h-auto"
                                            inPortal={false}
                                            placeholder="Select specialist Type"
                                            options={specialistType}
                                            onChange={onChange}
                                            value={value}
                                            getOptionValue={(option) => option.value}
                                            displayValue={(selected) =>
                                                specialistType?.find((cat) => cat.value === selected)
                                                    ?.label ?? ''
                                            }
                                            error={errors.specialistType?.message as string}
                                        />
                                    )}
                                />


                                <Controller
                                    control={control}
                                    name="referralPurpose"
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            label="ReasonReferral Purpose"
                                            placeholder="Write referral purpose"
                                            error={errors.referralPurpose?.message as string}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="patientConditionSummary"
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            label="Patient Condition Summary"
                                            placeholder="Write patient condition summary"
                                            error={errors.referralPurpose?.message as string}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="pastMedicalHistory"
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            label="Past Medical History (optional)"
                                            placeholder="Write past medical history"
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="attachment"
                                    render={({ field: { value, onChange } }) => (
                                        <FileUploadField
                                            label="Attachment (optional)"
                                            acceptedFileTypes={['image/*', '.pdf', '.doc', '.docx']}
                                            maxFiles={1}
                                            value={value}
                                            onChange={onChange}
                                            error={errors.attachment?.message as string}
                                            helperText="Upload images, PDF, or Word documents"
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

export default ModalAddEditSpecialistLetter;
