import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react'
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { PiX } from 'react-icons/pi';
import { Button, Checkbox, Input, Select, Textarea } from 'rizzui';
import { AddMedicalHistoryForm, addMedicalHistorySchema } from './addMedicalHistorySchema';
import TextEditor from '@/components/Tiptap';

interface PropTypes {
    data?: any;
    isEdit?: boolean;
}

const ModalAddEditMedicalHistory = (props: PropTypes) => {
    const { isEdit } = props
    const { closeModal } = useModal();

    const onSubmit: SubmitHandler<AddMedicalHistoryForm> = (data) => {
        console.log('Submited', data);
    }

    const option = [
        {
            label: 'Option 1',
            value: 'Option 1'
        }
    ]

    return (
        <div className="w-full rounded-[24px]">
            <div className="flex items-center justify-between px-10 py-5">
                <h1 className="font-semibold text-lg">
                    {isEdit ? 'Edit' : 'New'} Condition
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>


            <Form<AddMedicalHistoryForm>
                validationSchema={addMedicalHistorySchema}
                onSubmit={onSubmit}
                className="@container"
                useFormProps={{
                    mode: 'onChange',
                    defaultValues: {
                        conditionDate: '',
                        condition: '',
                        severity: '',
                        mhr: '',
                        summary: '',
                        comments: '',
                        confidential: false,
                    },
                }}
            >
                {({ register, control, formState: { errors } }) => {
                    return (
                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-4 p-10'>
                                <div className='flex gap-4'>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="conditionDate"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="date"
                                                    label="Condition Date"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="condition"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    label="Condition"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="severity"
                                            render={({ field: { value, onChange } }) => (
                                                <Select
                                                    label="Severity"
                                                    dropdownClassName="!z-10 h-auto"
                                                    inPortal={false}
                                                    placeholder="Select severity"
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
                                            name="mhr"
                                            render={({ field: { value, onChange } }) => (
                                                <Select
                                                    label="MHR"
                                                    dropdownClassName="!z-10 h-auto"
                                                    inPortal={false}
                                                    placeholder="Select MHR"
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

                                <div className='flex-1'>
                                    <Controller
                                        control={control}
                                        name="summary"
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="text"
                                                label="Summary"
                                            />
                                        )}
                                    />
                                </div>

                                <div className='flex-1'>
                                    <Controller
                                        control={control}
                                        name="comments"
                                        render={({ field }) => (
                                            <Textarea
                                                {...field}
                                                label="Comments"
                                                placeholder='Comments'
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

export default ModalAddEditMedicalHistory