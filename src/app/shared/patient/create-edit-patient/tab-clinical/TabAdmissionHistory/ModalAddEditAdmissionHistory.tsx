import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react'
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { PiX } from 'react-icons/pi';
import { Button, Checkbox, Input, Select, Textarea } from 'rizzui';
import { AddAdmissionHistoryForm, addAdmissionHistorySchema } from './addAdmissionHIstorySchema';
import TextEditor from '@/components/Tiptap';
import FileUploadField from '@/core/ui/uploadFile';

interface PropTypes {
    data?: any;
    isEdit?: boolean;
}

const ModalAddEditAdmissionHistory = (props: PropTypes) => {
    const { isEdit } = props
    const { closeModal } = useModal();

    const onSubmit: SubmitHandler<AddAdmissionHistoryForm> = (data) => {
        console.log('Submited', data);
    }

    const option = [
        {
            label: 'Admitted',
            value: 'Admitted'
        },
        {
            label: 'Emergency',
            value: 'Emergency'
        },
        {
            label: 'Discharge',
            value: 'Discharge'
        },
    ]

    return (
        <div className="w-full rounded-[24px]">
            <div className="flex items-center justify-between px-10 py-5">
                <h1 className="font-semibold text-lg">
                    {isEdit ? 'Edit' : 'Add'} Admission
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>


            <Form<AddAdmissionHistoryForm>
                validationSchema={addAdmissionHistorySchema}
                onSubmit={onSubmit}
                className="@container"
                useFormProps={{
                    mode: 'onChange',
                    defaultValues: {
                        admissionDate: '',
                        status: '',
                        clinicBranch: '',
                        attendingProvider: '',
                        reasonForPresentation: '',
                        procedurePerformed: '',
                        dischargeSummary: [],
                        notes: '',
                        confidential: false
                    },
                }}
            >
                {({ watch, register, control, formState: { errors } }) => {
                    const status = watch('status')
                    const isDischarge = status === 'Discharge'
                    return (
                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-4 p-10'>
                                <div className='flex gap-4'>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="admissionDate"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Admission Date"
                                                    type='date'
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="status"
                                            render={({ field: { value, onChange } }) => (
                                                <Select
                                                    label="Status"
                                                    dropdownClassName="!z-10 h-auto"
                                                    inPortal={false}
                                                    placeholder="Select status"
                                                    options={option}
                                                    onChange={onChange}
                                                    value={value}
                                                    getOptionValue={(option) => option.value}
                                                    displayValue={(selected) =>
                                                        option?.find((cat) => cat.value === selected)
                                                            ?.label ?? ''
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                    {isDischarge && (
                                        <div className='flex-1'>
                                            <Controller
                                                control={control}
                                                name="dischargeDate"
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        label="Discharge Date"
                                                        type='date'
                                                    />
                                                )}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="clinicBranch"
                                            render={({ field: { value, onChange } }) => (
                                                <Select
                                                    label="Clinic Branch"
                                                    dropdownClassName="!z-10 h-auto"
                                                    inPortal={false}
                                                    placeholder="Select clinic branch"
                                                    options={option}
                                                    onChange={onChange}
                                                    value={value}
                                                    getOptionValue={(option) => option.value}
                                                    displayValue={(selected) =>
                                                        option?.find((cat) => cat.value === selected)
                                                            ?.label ?? ''
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="attendingProvider"
                                            render={({ field: { value, onChange } }) => (
                                                <Select
                                                    label="Attending Provider"
                                                    dropdownClassName="!z-10 h-auto"
                                                    inPortal={false}
                                                    placeholder="Select attending provider"
                                                    options={option}
                                                    onChange={onChange}
                                                    value={value}
                                                    getOptionValue={(option) => option.value}
                                                    displayValue={(selected) =>
                                                        option?.find((cat) => cat.value === selected)
                                                            ?.label ?? ''
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="reasonForPresentation"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Reason for Presentation"
                                                    placeholder='Reason for Presentation'
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="procedurePerformed"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Procedure Performed"
                                                    placeholder='Procedure Performed'
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex-1'>
                                    <Controller
                                        control={control}
                                        name="dischargeSummary"
                                        render={({ field: { value, onChange } }) => (
                                            <FileUploadField
                                                label="Discharge Summary"
                                                acceptedFileTypes={['image/*', '.pdf', '.doc', '.docx']}
                                                maxFiles={1}
                                                value={value}
                                                onChange={onChange}
                                                helperText="Upload images, PDF, or Word documents"
                                            />
                                        )}
                                    />
                                </div>
                                <div className='flex-1'>
                                    <Controller
                                        control={control}
                                        name="notes"
                                        render={({ field }) => (
                                            <Textarea
                                                {...field}
                                                label="Notes"
                                                placeholder='Notes'
                                            />
                                        )}
                                    />
                                </div>
                                <div className='flex-1'>
                                    <Controller
                                        control={control}
                                        name="confidential"
                                        render={({ field }) => (
                                            <Checkbox
                                                label="Confidential"
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='flex justify-end px-10 py-5 border-t border-[#D8D8D8]'>
                                <Button type='submit'>
                                    Save
                                </Button>
                            </div>
                        </div>
                    )
                }}
            </Form>
        </div>
    )
}

export default ModalAddEditAdmissionHistory