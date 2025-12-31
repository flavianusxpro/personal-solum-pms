import { postGetDoctorAvailabilityByClinic } from "@/service/doctor";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface PropTypes {
    data: any;
    formData: any;
    doctor: any
}

const useDoctorTime = (props: PropTypes) => {
    const {
        data,
        formData,
        doctor
    } = props

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
        isPending: isPendingAvailability
    } = useQuery({
        queryKey: [
            'data-availability-by-clinic',
            formData.clinicId,
            doctor.id as number,
            formData.appointment_date,
            appointmentType,
        ],
        queryFn: async () => postGetDoctorAvailabilityByClinic({
            clinicId: formData.clinicId,
            doctorId: doctor.id as number,
            appointment_type: appointmentType,
            appointment_date: formData.appointment_date,
            timezone: formData.timezone,
        }),
    })

    return {
        dataAvailability,
        isPendingAvailability
    }
}

export default useDoctorTime