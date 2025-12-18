import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react'
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { PiX } from 'react-icons/pi';
import { Button, Checkbox, Input, Select, Textarea } from 'rizzui';
import { AddImmunisationForm, addImmunisationSchema } from './addImmunisationSchema';
import TextEditor from '@/components/Tiptap';

interface PropTypes {
    data?: any;
    isEdit?: boolean;
}

const ModalAddEditImmunisation = (props: PropTypes) => {
    const { isEdit } = props
    const { closeModal } = useModal();

    const onSubmit: SubmitHandler<AddImmunisationForm> = (data) => {
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
                    {isEdit ? 'Edit' : 'New'} Immunisation
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>


            <Form<AddImmunisationForm>
                validationSchema={addImmunisationSchema}
                onSubmit={onSubmit}
                className="@container"
                useFormProps={{
                    mode: 'onChange',
                    defaultValues: {
                        givenDate: '',
                        batchNumber: undefined,
                        vaccine: '',
                        dose: '',
                        site: '',
                        route: '',
                        orderedBy: '',
                        givenBy: '',
                        notes: '',
                        confidential: false,
                        given: false,
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
                                            name="givenDate"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type='date'
                                                    label="Given Date"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="batchNumber"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type='number'
                                                    label="Batch Number"
                                                    placeholder='Batch number'
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="vaccine"
                                            render={({ field: { value, onChange } }) => (
                                                <Select
                                                    label="Vaccine"
                                                    dropdownClassName="!z-10 h-auto"
                                                    inPortal={false}
                                                    placeholder="Select vaccine"
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
                                            name="dose"
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Dose"
                                                    placeholder='Dose'
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='flex-1'>
                                        <Controller
                                            control={control}
                                            name="site"
                                            render={({ field: { value, onChange } }) => (
                                                <Select
                                                    label="Site"
                                                    dropdownClassName="!z-10 h-auto"
                                                    inPortal={false}
                                                    placeholder="Select site"
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
                                            name="route"
                                            render={({ field: { value, onChange } }) => (
                                                <Select
                                                    label="Route"
                                                    dropdownClassName="!z-10 h-auto"
                                                    inPortal={false}
                                                    placeholder="Select route"
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
                                            name="orderedBy"
                                            render={({ field: { value, onChange } }) => (
                                                <Select
                                                    label="Ordered By"
                                                    dropdownClassName="!z-10 h-auto"
                                                    inPortal={false}
                                                    placeholder="Select ordered by"
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
                                            name="givenBy"
                                            render={({ field: { value, onChange } }) => (
                                                <Select
                                                    label="Given By"
                                                    dropdownClassName="!z-10 h-auto"
                                                    inPortal={false}
                                                    placeholder="Select given by"
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

                                <div className='flex-1 flex gap-6'>
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
                                    <Controller
                                        control={control}
                                        name="given"
                                        render={({ field }) => (
                                            <Checkbox
                                                label="Given"
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

export default ModalAddEditImmunisation