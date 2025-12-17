import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react'
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { PiX } from 'react-icons/pi';
import { Button, Input } from 'rizzui';
import { AddLetterForm, addLetterSchema } from './addLetterSchema';
import TextEditor from '@/components/Tiptap';

interface PropTypes {
    data?: any;
    isEdit?: boolean;
}

const ModalAddEditLetter = (props: PropTypes) => {
    const { isEdit } = props
    const { closeModal } = useModal();

    const onSubmit: SubmitHandler<AddLetterForm> = (data) => {
        console.log('Submited', data);
    }

    return (
        <div className="w-full rounded-[24px]">
            <div className="flex items-center justify-between px-10 py-5">
                <h1 className="font-semibold text-lg">
                    {isEdit ? 'Edit' : 'Add' } Letter
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>


            <Form<AddLetterForm>
                validationSchema={addLetterSchema}
                onSubmit={onSubmit}
                className="@container"
                useFormProps={{
                    mode: 'onChange',
                    defaultValues: {
                        subject: '',
                        description: '',
                    },
                }}
            >
                {({ register, control, formState: { errors } }) => {
                    return (
                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-4 p-10'>
                                <Controller
                                    control={control}
                                    name="subject"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Subject"
                                            placeholder="Subject"
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <TextEditor
                                            {...field}
                                            label='Description'
                                            placeholder='Write description here...'
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

export default ModalAddEditLetter