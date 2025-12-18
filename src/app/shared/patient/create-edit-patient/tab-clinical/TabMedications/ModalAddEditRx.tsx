import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react'
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { PiX } from 'react-icons/pi';
import { Button, Checkbox, Input, Radio, Select, Textarea } from 'rizzui';
import { AddMedicationsForm, addMedicationSchema } from './addMedicationsSchema';
import TextEditor from '@/components/Tiptap';

interface PropTypes {
    data?: any;
    isEdit?: boolean;
}

const ModalAddEditRx = (props: PropTypes) => {
    const { isEdit } = props
    const { closeModal } = useModal();

    const onSubmit: SubmitHandler<AddMedicationsForm> = (data) => {
        console.log('Submited', data);
    }

    const drugNameOptions = [
        {
            label: 'Drug Name 1',
            value: 'Drug Name 1'
        }
    ]

    return (
        <div className="w-full rounded-[24px]">
            <div className="flex items-center justify-between px-10 py-5">
                <h1 className="font-semibold text-lg">
                    {isEdit ? 'Edit' : 'New'} Rx
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>


            <Form<AddMedicationsForm>
                validationSchema={addMedicationSchema}
                onSubmit={onSubmit}
                className="@container"
                useFormProps={{
                    mode: 'onChange',
                    defaultValues: {
                        drugName: '',
                        drugNameType: '',
                        conditionDate: undefined,
                        strength: '',
                        dose: '',
                        qty: 0,
                        repeats: 0,
                        isLongTerm: false,
                        prescribedDate: undefined,
                        endDate: undefined,
                        reason: ''
                    },
                }}
            >
                {({ register, control, formState: { errors } }) => {
                    return (
                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-4 p-10'>
                                <div className='flex flex-col gap-4'>
                                    <h1 className='font-medium  text-base'>
                                        Medication Information
                                    </h1>

                                    <div className='flex gap-4'>
                                        <div className='flex-1'>
                                            <Controller
                                                control={control}
                                                name="drugName"
                                                render={({ field: { value, onChange } }) => (
                                                    <Select
                                                        label="Drug Name"
                                                        dropdownClassName="!z-10 h-auto"
                                                        inPortal={false}
                                                        placeholder="Select drug name"
                                                        options={drugNameOptions}
                                                        onChange={onChange}
                                                        value={value}
                                                        getOptionValue={(option) => option.value}
                                                        displayValue={(selected) =>
                                                            drugNameOptions?.find((cat) => cat.value === selected)
                                                                ?.label ?? ''
                                                        }
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <Controller
                                                control={control}
                                                name="drugNameType"
                                                render={({ field: { value, onChange } }) => (
                                                    <Select
                                                        label="Type"
                                                        dropdownClassName="!z-10 h-auto"
                                                        inPortal={false}
                                                        placeholder="Select Category"
                                                        options={drugNameOptions}
                                                        onChange={onChange}
                                                        value={value}
                                                        getOptionValue={(option) => option.value}
                                                        displayValue={(selected) =>
                                                            drugNameOptions?.find((cat) => cat.value === selected)
                                                                ?.label ?? ''
                                                        }
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="flex-1">
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
                                    </div>

                                    <div className='flex gap-4'>
                                        <div className='flex-1'>
                                            <Controller
                                                control={control}
                                                name="strength"
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type='text'
                                                        label="Strength (mg/IU/etc.)"
                                                        placeholder='Strength'
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <Controller
                                                control={control}
                                                name="dose"
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type='text'
                                                        label="Dose Instructions"
                                                        placeholder='Dose'
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className='flex-1 flex gap-4'>
                                            <Controller
                                                control={control}
                                                name="qty"
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type='number'
                                                        label="Quantity"
                                                        placeholder='0'
                                                    />
                                                )}
                                            />
                                            <Controller
                                                control={control}
                                                name="repeats"
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type='number'
                                                        label="Repeats"
                                                        placeholder='0'
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <Controller
                                        control={control}
                                        name="isLongTerm"
                                        render={({ field }) => (
                                            <Controller
                                                control={control}
                                                name="isLongTerm"
                                                render={({ field }) => (
                                                    <Checkbox
                                                        label="Is Long Term?"
                                                        checked={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </div>

                                <div className='flex flex-col gap-4 mt-4 mb-4'>
                                    <h1 className='font-medium  text-base'>
                                        Prescription Timeline
                                    </h1>

                                    <div className='flex gap-4'>
                                        <div className='flex-1'>
                                            <Controller
                                                control={control}
                                                name="prescribedDate"
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type="date"
                                                        label="Prescribed Date"
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <Controller
                                                control={control}
                                                name="endDate"
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type="date"
                                                        label="End Date (optional)"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-4'>
                                    <h1 className='font-medium  text-base'>
                                        Notes
                                    </h1>

                                    <Controller
                                        control={control}
                                        name="reason"
                                        render={({ field }) => (
                                            <Textarea
                                                {...field}
                                                label="Reason / Clinical Notes"
                                                placeholder="Write reason / clinical notes" />
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

export default ModalAddEditRx