import TextEditor from '@/components/Tiptap'
import React, { SetStateAction } from 'react'
import { GrAttachment } from 'react-icons/gr'
import { Button, Radio, Select } from 'rizzui'

interface PropTypes {
    setIsCreate: React.Dispatch<SetStateAction<boolean>>
    dataEdit: any;
    setDataEdit: React.Dispatch<SetStateAction<any>>
}

const CreateConsultNotes = (props: PropTypes) => {
    const { setIsCreate, dataEdit, setDataEdit } = props

    return (
        <div className='flex flex-col gap-4 w-full'>
            <div className='flex gap-6 items-center'>
                <h1 className='flex item-center font-medium text-xl'>
                    {dataEdit && 'Edit'} Today’s Notes <GrAttachment className='ml-4' />
                </h1>

                <div className='relative bg-white rounded-lg px-6 py-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] hover:shadow-lg transition-shadow cursor-pointer'>
                    <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white drop-shadow-md'></div>
                    <span className='font-medium text-sm text-gray-900'>Upload Consult Attachments</span>
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <div className='flex gap-4'>
                    <Button
                        variant='outline'
                        type="button"
                        size='sm'
                        onClick={() => { }}
                        className='flex gap-2 text-sm'
                    >
                        Reason
                    </Button>
                    <Select
                        placeholder='Observation'
                        size='sm'
                        options={[]}
                        value={''}
                        onChange={() => { }}
                    />
                    <Select
                        placeholder='Examination'
                        size='sm'
                        options={[]}
                        value={''}
                        onChange={() => { }}
                    />
                    <Button
                        variant='outline'
                        type="button"
                        size='sm'
                        onClick={() => { }}
                        className='flex gap-2 text-sm'
                    >
                        Drawer
                    </Button>
                    <Button
                        variant='outline'
                        type="button"
                        size='sm'
                        onClick={() => { }}
                        className='flex gap-2 text-sm'
                    >
                        Diagnosis
                    </Button>
                    <Select
                        placeholder='Shortcuts'
                        size='sm'
                        options={[]}
                        value={''}
                        onChange={() => { }}
                    />
                    <Select
                        placeholder='New EPC'
                        size='sm'
                        options={[]}
                        value={''}
                        onChange={() => { }}
                    />
                </div>
                <div className='flex-1'>
                    <TextEditor label='' placeholder='Write notes here...' />
                </div>
            </div>

            <div className='flex justify-between gap-2'>
                <div>
                    <Radio size='sm' label="Confidential" />;
                </div>
                <div className='flex gap-4'>
                     <Button
                        variant='outline'
                        type="button"
                        size='sm'
                        onClick={() => {
                            setDataEdit(null)
                            setIsCreate(false)
                        }}
                        className='flex gap-2 text-sm'
                    >
                        Cancel
                    </Button>
                     <Button
                        type="button"
                        size='sm'
                        onClick={() => setIsCreate(false)}
                        className='flex gap-2 text-sm'
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateConsultNotes