import React from 'react'
import TableLog from './tab-log/tableLog'
import { useParams } from 'next/navigation';
import { useGetPatientById } from '@/hooks/usePatient';

type DeviceType = 'laptop' | 'desktop' | 'mobile';

interface LoginSession {
    id: number;
    device: string;
    type: DeviceType;
    isActive: boolean;
    location: string;
    lastActive: string;
}

const TabLog = () => {
    const id = useParams<{ id: string }>().id;
    const {
        data: dataPatient,
        refetch: refetchGetDataPatient,
        isLoading: isLoadingGetDataPatient,
    } = useGetPatientById(id);

    const loginSessions: LoginSession[] = [
        {
            id: 1,
            device: '2018 Macbook Pro 15-inch',
            type: 'laptop',
            isActive: true,
            location: 'Melbourne, Australia',
            lastActive: '22 Jan at 4:20pm',
        },
        {
            id: 2,
            device: 'Office PC - Chrome',
            type: 'desktop',
            isActive: false,
            location: 'Jakarta, Indonesia',
            lastActive: '20 Jan at 9:12am',
        },
        {
            id: 3,
            device: 'iPhone 14 Pro',
            type: 'mobile',
            isActive: false,
            location: 'Bandung, Indonesia',
            lastActive: '18 Jan at 7:45pm',
        },
    ]

    const DeviceIcon = ({ type }: { type: DeviceType }) => {
        switch (type) {
            case 'laptop':
                return (
                    <svg viewBox="0 0 256 256" className="h-7 w-7 text-gray-500">
                        <path
                            fill="currentColor"
                            d="M232,176H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM208,48H48a16,16,0,0,0-16,16v96H224V64A16,16,0,0,0,208,48Z"
                        />
                    </svg>
                );

            case 'desktop':
                return (
                    <svg viewBox="0 0 256 256" className="h-7 w-7 text-gray-500">
                        <path
                            fill="currentColor"
                            d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24h72v16H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V200h72a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Z"
                        />
                    </svg>
                );

            case 'mobile':
                return (
                    <svg viewBox="0 0 256 256" className="h-7 w-7 text-gray-500">
                        <path
                            fill="currentColor"
                            d="M176,16H80A24,24,0,0,0,56,40V216a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V40A24,24,0,0,0,176,16ZM128,224a12,12,0,1,1,12-12A12,12,0,0,1,128,224Z"
                        />
                    </svg>
                );
        }
    };



    return (
        <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-6'>
                <h1 className='text-xl font-medium'>Log Activity</h1>
                <div className='flex flex-col gap-4'>
                    <TableLog
                        data={dataPatient}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="font-medium text-base font-lexend">
                        Where you’re logged in
                    </h1>
                    <p className="font-normal text-base">
                        We’ll alert you via sasmithayuli@gmail.com if there is any unusual activity on your account.
                    </p>
                </div>

                {loginSessions.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-6 border-t border-dashed border-muted py-6"
                    >
                        <DeviceIcon type={item.type} />

                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <h4 className="text-base font-medium text-gray-900">
                                    {item.device}
                                </h4>

                                {item.isActive && (
                                    <span className="relative hidden rounded-md border border-muted py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:block">
                                        Active Now
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-500">{item.location}</p>
                                <span className="h-1 w-1 rounded-full bg-gray-600" />
                                <p className="text-sm text-gray-500">{item.lastActive}</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>


        </div>
    )
}

export default TabLog