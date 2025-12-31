import { getDoctorByClinic } from '@/service/doctor';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react'

interface PropTypes {
    data: any;
    formData: any;
}

const useSelectDateTime = (props: PropTypes) => {
    const {
        data,
        formData
    } = props

    const [params, _] = useState({
        id: data?.clinicId as string,
        page: 1,
        perPage: 10,
        treatment_type: formData?.appointment_type,
        problem_type: 'Anxiety',
        doctorId: formData.rescheduleType === 'same_doctor' ? data?.doctor?.id : undefined,
    })

    const {
        data: dataDoctors,
        isPending: isLoadingDataDoctor
    } = useQuery({
        queryKey: [
            'data-doctor-by-clinic-id',
            params.id,
            params.doctorId,
        ],
        queryFn: async () => getDoctorByClinic(params)
    })

    return {
        dataDoctors,
        isLoadingDataDoctor,
    }
}

export default useSelectDateTime