import { useGetDoctorAvailabilityByClinic } from '@/hooks/useClinic';
import { getDoctorByClinic, postGetDoctorAvailabilityByClinic } from '@/service/doctor';
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

    const appointmentType = useMemo(() => {
        if (formData?.appointment_type?.includes('Follow Up Appointment')) {
          return 'FOLLOWUP';
        } else if (formData?.appointment_type?.includes('SCRIPT_RENEWAL')) {
          return 'SCRIPT_RENEWAL';
        } else {
          return 'INITIAL';
        }
      }, [formData?.appointment_type]);

    const {
        data: dataAvailability,
        isLoading
    } = useQuery({
        queryKey: [
            'data-availability-by-clinic',
            formData.clinicId,
            formData.doctorId,
            formData.appointment_date,
            appointmentType,
        ],
        queryFn: async () => postGetDoctorAvailabilityByClinic({
            clinicId: formData.clinicId,
            doctorId: formData.doctorId,
            appointment_type: appointmentType,
            appointment_date: formData.appointment_date,
            timezone: formData.timezone,
        }),
    })

    return {
        dataDoctors,
        dataAvailability,
    }
}

export default useSelectDateTime