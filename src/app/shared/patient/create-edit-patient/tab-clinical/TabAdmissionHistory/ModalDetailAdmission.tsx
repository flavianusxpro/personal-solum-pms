import { useModal } from '@/app/shared/modal-views/use-modal';
import dayjs from '@/config/dayjs';
import React from 'react'
import { PiX } from 'react-icons/pi';

interface PropTypes {
    data?: any;
}

interface HtmlBlockProps {
    html: string;
}

const ModalDetailAdmission = (props: PropTypes) => {
    const { data } = props
    const { closeModal } = useModal();
    function HtmlBlock({ html }: HtmlBlockProps) {
        return (
            <div dangerouslySetInnerHTML={{ __html: html }} />
        );
    }

    return (
        <div className="w-full rounded-[24px]">
            <div className="flex items-center justify-between px-10 py-5 border-b border-[#D8D8D8]">
                <h1 className="font-semibold text-lg">
                    Admission Details
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>

            <div className='px-10 py-5 flex flex-col gap-4'>
                <div className='flex gap-4 rounded-lg'>
                    <div className='flex-1 flex flex-col gap-4'>
                        <div className='flex gap-2 flex-col'>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Admission Date:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.admissionDate ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Status:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.status ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Clinic Branch:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.clinicBranch ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Attending Provider:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.attendingProvider ?? '-'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 flex flex-col gap-4'>
                        <div className='flex gap-2 flex-col'>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Reason for Presentation:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.reasonForPresentation ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Procedure Performed:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.patientName ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Discharge Date:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.dischargeDate ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Confodential:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.confirmed ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-[#FAFAFA] flex flex-col gap-4 p-4 rounded-lg'>
                    <h1 className='font-medium text-sm'>Notes:</h1>
                    <HtmlBlock html={data?.summary ?? '-'} />
                </div>
            </div>
        </div>
    )
}

export default ModalDetailAdmission