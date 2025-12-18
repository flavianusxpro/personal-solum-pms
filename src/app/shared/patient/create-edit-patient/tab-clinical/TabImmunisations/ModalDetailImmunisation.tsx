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

const ModalDetailImmunisation = (props: PropTypes) => {
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
                    Immunisation Details
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>

            <div className='px-10 py-5 flex flex-col gap-4'>
                <div className='flex gap-4 rounded-lg border border-[#E4E4E4] p-4'>
                    <div className='flex-1 flex flex-col gap-4'>
                        <h1 className='font-semibold text-sm text-[#525252]'>
                            Vaccine Information
                        </h1>
                        <div className='flex gap-2 flex-col'>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Vaccine Name:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.vaccine ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Dose:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.dose ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Batch Number:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.batchNo ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Site:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.site ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Route:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.route ?? '-'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 flex flex-col gap-4'>
                        <h1 className='font-semibold text-sm text-[#525252]'>
                            Administration Details
                        </h1>
                        <div className='flex gap-2 flex-col'>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Ordered By:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.issuedBy ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Given By:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.issuedBy ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Date Given:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.givenDate ?? '-'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Given:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.given ? 'Yes' : 'No'}
                                </span>
                            </div>
                            <div className='flex'>
                                <span className='basis-[40%] font-normal text-sm text-[#525252]'>Confidential:</span>
                                <span className='basis-[60%] font-medium text-sm'>
                                    {data?.confidential ? 'Yes' : 'No'}
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

export default ModalDetailImmunisation