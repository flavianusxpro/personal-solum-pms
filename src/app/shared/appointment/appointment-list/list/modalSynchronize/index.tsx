import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react'
import { PiX } from 'react-icons/pi'
import { Badge, Button, Flex, Text } from 'rizzui'

interface PropTypes {
    setSynchronize: React.Dispatch<React.SetStateAction<string | null>>
    isPush?: boolean;
}

const ModalSynchronize = (props: PropTypes) => {
    const { setSynchronize, isPush } = props
    const { closeModal } = useModal();
    return (
        <div className="w-full rounded-[24px]">
            <div className='p-10'>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="font-semibold text-lg">
                        Synchronization Result
                    </h1>

                    <button
                        onClick={() => {
                            closeModal()
                            setSynchronize(null)
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    >
                        <PiX className="h-5 w-5" />
                    </button>
                </div>

                <div className='flex flex-col gap-4'>
                    <div className='border border-[#E4E4E4] py-4 px-6 rounded-lg flex flex-col gap-6'>
                        <h1 className='font-medium text-base text-center'>
                            {isPush ? 'Push to Source' : 'Pull from source'}
                        </h1>
                        <div className='flex'>
                            <Flex gap="1" align="center" justify='center'>
                                <Badge color="success" renderAsDot />
                                <Text className="font-medium text-sm text-green-dark flex gap-4">Success <span className='text-[#515151]'>22 Appointment</span></Text>
                            </Flex>
                             <Flex gap="1" align="center" justify='center'>
                                <Badge color="danger" renderAsDot />
                                <Text className="font-medium text-sm text-[#C50000] flex gap-4">Success <span className='text-[#515151]'>22 Appointment</span></Text>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-end px-10 py-5 border-t border-[#D8D8D8] gap-4'>
                <Button
                    variant='outline'
                    onClick={() => { }}
                >
                    Done
                </Button>
                <Button
                    onClick={() => { }}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default ModalSynchronize