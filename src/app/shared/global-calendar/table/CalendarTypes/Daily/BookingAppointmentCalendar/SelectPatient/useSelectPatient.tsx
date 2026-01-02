import { useProfile } from '@/hooks/useProfile';
import { getAppointmentList } from '@/service/appointment';
import { getTreatments } from '@/service/doctor';
import { getPatientList } from '@/service/patient'
import { useQuery } from '@tanstack/react-query'

interface PropTypes {
    formData: any
}

const useSelectPatient = (props: PropTypes) => {
    const { formData } = props
    const { data: dataProfile } = useProfile(true);
    const {
        data: dataPatients,
        isPending: isLoadingDataPatients
    } = useQuery({
        queryKey: ['get-patients'],
        queryFn: async () => getPatientList({
            page: 1,
            perPage: 100,
            clinicId: dataProfile?.clinics[0].id
        }),
        select: (data) => data?.data
    })

    const {
        data: dataTreatments,
        isPending: isLoadingDataTreatments
    } = useQuery({
        queryKey: ['get-treatments'],
        queryFn: async () => getTreatments({
            page: 1,
            perPage: 100,
            sort: 'DESC'
        }),
        select: (data) => data?.data
    })

    const {
        data: dataAppointments,
        isPending: isLoadingDataAppointments
    } = useQuery({
        queryKey: ['get-appointments', formData.patientId],
        queryFn: async () => getAppointmentList({
            patientId: formData?.patientId,
            page: 1,
            perPage: 100,
            clinicId: dataProfile?.clinics[0].id,
        }),
        select: (data) => data?.data
    })

  return {
    dataPatients,
    isLoadingDataPatients,
    dataTreatments,
    isLoadingDataTreatments,
    dataAppointments,
    isLoadingDataAppointments
  }
}

export default useSelectPatient