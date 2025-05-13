import Footer from './footer';
import { Text } from 'rizzui';
import { useAtom } from 'jotai';
import { formRescheduleDataAtom, useStepperCancelAppointment } from '.';
import dayjs from 'dayjs';
import { useGetAllDoctors } from '@/hooks/useDoctor';

export default function RescheduleConfirmation() {
  const [formData, setFormData] = useAtom(formRescheduleDataAtom);

  const { data: dataDoctor } = useGetAllDoctors({
    page: 1,
    perPage: 100,
  });

  function getDoctorName(doctorId?: number) {
    if (!doctorId) return '-';
    const doctor = dataDoctor?.data.find((doctor) => doctor.id === doctorId);
    if (doctor) {
      return `${doctor.first_name} ${doctor.last_name}`;
    }
    return '-';
  }

  return (
    <>
      <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
        <Text className="text-base font-semibold">Reschedule Confirmation</Text>

        <div className="">
          <Text className="font-semibold">Last Schedule</Text>
          <Text>
            Date & Time : {dayjs(formData.oldData?.date).format('MMM DD, YYYY')}{' '}
            - {formData.oldData?.doctorTime}
          </Text>

          <Text>Doctor : {getDoctorName(formData.doctorId)}</Text>
        </div>

        <div className="">
          <Text className="font-semibold">New Schedule</Text>
          <Text>
            Date & Time : {dayjs(formData?.date).format('MMM DD, YYYY')} -{' '}
            {formData?.doctorTime}
          </Text>
          <Text> Doctor : {getDoctorName(formData.oldData?.doctorId)}</Text>
        </div>
      </div>
      <Footer isLastStep />
    </>
  );
}
