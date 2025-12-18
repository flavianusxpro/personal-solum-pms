import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react'
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { PiX } from 'react-icons/pi';
import { Button, Input, Textarea } from 'rizzui';
import { AddNewAllergyForm, addNewAllergySchema } from './addAllergySchema';
import TextEditor from '@/components/Tiptap';

interface PropTypes {
    data?: any;
    isEdit?: boolean;
}

const ModalAddEditNewAllergy = (props: PropTypes) => {
    const { isEdit } = props
    const { closeModal } = useModal();

    const onSubmit: SubmitHandler<AddNewAllergyForm> = (data) => {
        console.log('Submited', data);
    }

    return (
        <div className="w-full rounded-[24px]">
            <div className="flex items-center justify-between px-10 py-5">
                <h1 className="font-semibold text-lg">
                    {isEdit ? 'Edit' : 'New' } Allergy
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>


            <Form<AddNewAllergyForm>
                validationSchema={addNewAllergySchema}
                onSubmit={onSubmit}
                className="@container"
                useFormProps={{
                    mode: 'onChange',
                    defaultValues: {
                        allegen: '',
                        reaction: '',
                        severity: '',
                        notes: ''
                    },
                }}
            >
                {({ register, control, formState: { errors } }) => {
                    return (
                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-4 p-10'>
                                <Controller
                                    control={control}
                                    name="allegen"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Allergen"
                                            placeholder="Allergen"
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="reaction"
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            label="Reaction"
                                            placeholder="Reaction"
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="severity"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Severity"
                                            placeholder="Severity"
                                        />
                                    )}
                                />
                                 <Controller
                                    control={control}
                                    name="notes"
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            label="Warnings / Notes"
                                            placeholder="Warnings / Notes"
                                        />
                                    )}
                                />
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

export default ModalAddEditNewAllergy