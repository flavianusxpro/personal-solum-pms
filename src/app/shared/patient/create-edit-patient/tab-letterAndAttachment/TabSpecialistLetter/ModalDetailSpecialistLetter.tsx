import { useModal } from '@/app/shared/modal-views/use-modal';
import dayjs from '@/config/dayjs';
import React from 'react'
import { PiX } from 'react-icons/pi';

interface PropTypes {
    data?: any;
}

const ModalDetailSpecialistLetter = (props: PropTypes) => {
    const { data } = props
    const { closeModal } = useModal();

    return (
        <div className="w-full rounded-[24px]">
            <div className="flex items-center justify-between mb-6 px-10 py-5 border-b border-[#D8D8D8]">
                <h1 className="font-semibold text-lg">
                    Specialist Letter Details
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>

            <div className='px-10 py-5 flex flex-col gap-4'>
                <div className='flex-1 flex flex-col gap-2'>
                    <div className='flex'>
                        <span className='basis-[20%] font-normal text-sm text-[#787878]'>Specialist Type:</span>
                        <span className='basis-[80%] font-medium text-sm'>
                            {data?.specialistType ?? '-'}
                        </span>
                    </div>
                    <div className='flex'>
                        <span className='basis-[20%] font-normal text-sm text-[#787878]'>Referred by:</span>
                        <span className='basis-[80%] font-medium text-sm'>
                            {data?.referredBy ?? '-'}
                        </span>
                    </div>
                    <div className='flex'>
                        <span className='basis-[20%] font-normal text-sm text-[#787878]'>Created At:</span>
                        <span className='ba8is-[60%] font-medium text-sm'>
                            {data?.createdAt ? (dayjs(data?.createdAt).format('DD/MM/YYYY, H:mm A')) : '-'}
                        </span>
                    </div>
                </div>

                <div className='bg-[#FAFAFA] flex flex-col p-4 rounded-lg gap-4'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-medium text-sm'>Referral Purpose:</h1>
                        <p className='font-normal text-sm'>
                            {data?.reasonForReferral ?? '-'}
                        </p>
                    </div>

                    <div className='h-1 border-b w-full' />

                    <div className='flex flex-col gap-2'>
                        <h1 className='font-medium text-sm'>Patient Condition Summary:</h1>
                        <p className='font-normal text-sm'>
                            {data?.reason ?? '-'}
                        </p>
                    </div>

                    <div className='h-1 border-b w-full' />

                    <div className='flex flex-col gap-2'>
                        <h1 className='font-medium text-sm'>Past Medical History:</h1>
                        <p className='font-normal text-sm'>
                            {data?.reason ?? '-'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDetailSpecialistLetter