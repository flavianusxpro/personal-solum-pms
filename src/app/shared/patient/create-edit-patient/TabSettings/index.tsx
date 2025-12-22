import FormGroup from '@/app/shared/ui/form-group'
import React from 'react'
import { Controller, SubmitHandler, useFieldArray } from 'react-hook-form'
import { Form } from '@core/ui/form';
import { Button, Select } from 'rizzui'
import { AddSettingsForm, addSettingsSchema } from './addSettigsSchema'
import { useParams } from 'next/navigation'

const TabSettings = ({ isView }: { isView?: boolean }) => {
    const id = useParams<{ id: string }>().id;

    const options = [
        {
            label: 'Doctor',
            value: 'Doctor'
        }
    ]

    return (
        <Form<AddSettingsForm>
            validationSchema={addSettingsSchema}
            onSubmit={() => {
                console.log();
            }}
            className="@container"
            useFormProps={{
                mode: 'all',
                defaultValues: {
                    doctor: ''
                }
            }}
        >
            {({
                register,
                control,
                setValue,
                getValues,
                formState: { errors },
            }) => {
                return (
                    <div className='flex flex-col gap-6'>
                        <div className='flex-1 flex flex-col gap-6'>
                            <h1 className='font-medium text-base'>
                                Assign
                            </h1>

                            <div className='flex flex-col gap-4'>
                                <FormGroup title="Doctors" isLabel>
                                    <Controller
                                        control={control}
                                        name="doctor"
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                label=""
                                                dropdownClassName="!z-10 h-auto"
                                                inPortal={false}
                                                placeholder="Select doctor"
                                                options={options}
                                                onChange={onChange}
                                                value={value}
                                                getOptionValue={(option) => option.value}
                                                displayValue={(selected) =>
                                                    options?.find((cat) => cat.value === selected)
                                                        ?.label ?? ''
                                                }
                                            />
                                        )}
                                    />
                                </FormGroup>
                            </div>
                        </div>

                        <div className='flex justify-end py-5 border-t border-[#D8D8D8]'>
                            <Button type='submit'>
                                Save
                            </Button>
                        </div>
                    </div>
                )
            }}
        </Form>
    )
}

export default TabSettings