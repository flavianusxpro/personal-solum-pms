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

const ModalDetailFlagAndNotes = (props: PropTypes) => {
    const { data } = props 
    const { closeModal } = useModal();

    function HtmlBlock({ html }: HtmlBlockProps) {
        return (
            <div dangerouslySetInnerHTML={{ __html: html }} />
        );
    }

    return (
        <div className="w-full rounded-[24px]">
            <div className="flex items-center justify-between mb-6 px-10 py-5 border-b border-[#D8D8D8]">
                <h1 className="font-semibold text-lg">
                    {data?.type === 'flag' ? 'Flag' : 'Note'} Details
                </h1>

                <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>

            <div className='px-10 py-5 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <div className='flex'>
                        <span className='basis-[20%] font-normal text-sm text-[#787878]'>Created By:</span>
                        <span className='basis-[80%] font-medium text-sm'>
                            {data?.created_by ?? '-'}
                        </span>
                    </div>
                    <div className='flex'>
                        <span className='basis-[20%] font-normal text-sm text-[#787878]'>Created at:</span>
                        <span className='basis-[80%] font-medium text-sm'>
                            {data?.created_at ? (dayjs(data?.created_at).format('DD/MM/YYYY, H:mm A')) : '-'}
                        </span>
                    </div>
                </div>

                <div className='bg-[#FAFAFA] p-4 rounded-lg'>
                    <HtmlBlock html={data?.description} />
                </div>
            </div>
        </div>
    )
}

export default ModalDetailFlagAndNotes