import React from 'react'
import TableLog from './tab-log/tableLog'
import { useParams } from 'next/navigation';
import { useGetPatientById } from '@/hooks/usePatient';

const TabLog = () => {
    const id = useParams<{ id: string }>().id;
    const {
        data: dataPatient,
        refetch: refetchGetDataPatient,
        isLoading: isLoadingGetDataPatient,
      } = useGetPatientById(id);

    return (
        <div className='flex flex-col gap-6'>
            <h1 className='text-xl font-medium'>Log Activity</h1>
            <div className='flex flex-col gap-4'>
                <TableLog
                    data={dataPatient}
                />
            </div>
        </div>
    )
}

export default TabLog