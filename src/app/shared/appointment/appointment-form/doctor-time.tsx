'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, UseFormSetValue } from 'react-hook-form';
import { Flex, Input, Loader, Text } from 'rizzui';
import Footer from './footer';
import {
  formDataAtom,
  useStepperAppointment,
} from '@/app/shared/appointment/appointment-form';
import { IParamGetDoctorByClinic } from '@/types/paramTypes';
import { useMemo, useState } from 'react';
import { useGetDoctorByClinic } from '@/hooks/useClinic';
import Image from 'next/image';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { IGetDoctorByClinicResponse } from '@/types/ApiResponse';
import { appointmentBookSchema } from '@/validators/admin-appointment.schema';
import cn from '@/core/utils/class-names';

const FormSchema = appointmentBookSchema['selectDoctorAndTime'];

type FormSchemaType = z.infer<typeof FormSchema>;

export default function AppointmentPatientDoctor() {
  const { gotoNextStep } = useStepperAppointment();

  const [formData, setFormData] = useAtom(formDataAtom);
  const [currentOpen, setCurrentOpen] = useState<number | null>(null);

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      doctorId: formData?.doctorId,
      doctorTime: formData?.doctorTime,
    },
  });
  const watchDoctor = watch('doctorId');
  const watchDoctorTime = watch('doctorTime');

  const [params] = useState<IParamGetDoctorByClinic>({
    id: formData?.clinicId?.toString() as string,
    page: 1,
    perPage: 10,
  });

  const { data: dataDoctor, isLoading } = useGetDoctorByClinic(params);

  const doctor = useMemo(() => {
    return dataDoctor?.find((doctor) => doctor.id === Number(watchDoctor));
  }, [dataDoctor, watchDoctor]);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setFormData((prev) => ({
      ...prev,
      doctorId: data.doctorId,
      doctorTime: data.doctorTime,
    }));
    gotoNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
        <Flex justify="between" align="center">
          <Input
            label="Doctor"
            value={
              doctor && `${doctor?.first_name ?? ''} ${doctor?.last_name ?? ''}`
            }
            disabled
            className="w-full"
            placeholder="Select Doctor"
            error={errors.doctorId?.message}
          />
          <Input
            label="Doctor Time"
            placeholder="Select Time"
            value={watchDoctorTime}
            disabled
            error={errors.doctorTime?.message}
          />
        </Flex>
        <div className="mx-auto max-h-80 max-w-4xl divide-y divide-gray-200 overflow-auto">
          {isLoading && <Loader variant="spinner" size="xl" />}
          {dataDoctor?.map((doctor, index: number) => (
            <div key={index} className="mb-5">
              {/* Doctor Header */}
              <div className="flex items-center justify-between space-x-4 p-6">
                <div className="flex items-center space-x-4">
                  {doctor.url_photo ? (
                    <Image
                      src={doctor.url_photo}
                      alt={doctor.first_name}
                      className="h-12 w-12 rounded-full"
                      height={48}
                      width={48}
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                      🏥
                    </div>
                  )}
                  <h3 className="cursor-pointer text-base font-bold hover:underline">
                    Dr. {doctor.first_name} {doctor.last_name}
                  </h3>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setCurrentOpen((prev) =>
                      prev === doctor.id ? null : doctor.id
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    {currentOpen === doctor.id ? (
                      <>
                        <Text>Hide Appointment</Text> <BiChevronUp size={30} />
                      </>
                    ) : (
                      <>
                        <Text>See All Appointment</Text>
                        <BiChevronDown size={30} />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Doctor Times */}

              <DoctorTime
                setValue={setValue}
                currentOpen={currentOpen}
                doctor={doctor}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </form>
  );
}

function DoctorTime({
  doctor,
  currentOpen,
  setValue,
}: {
  doctor: IGetDoctorByClinicResponse['data'][number];
  currentOpen: number | null;
  setValue: UseFormSetValue<{
    doctorId: number;
    doctorTime: string;
  }>;
}) {
  const [formData, setFormData] = useAtom(formDataAtom);

  const practices_open = doctor.appointment_schedule.practices_open;
  const practices_close = doctor.appointment_schedule.practices_close;

  const [startHours, startMinutes] = practices_open.split(':').map(Number);
  const [endHours, endMinutes] = practices_close.split(':').map(Number);

  const appointmentType = useMemo(
    () => formData?.appointment_type?.includes('FOLLOWUP'),
    [formData?.appointment_type]
  );

  const interval = useMemo(
    () =>
      appointmentType
        ? doctor.appointment_duration.followup
        : doctor.appointment_duration.initial,
    [appointmentType, doctor.appointment_duration]
  );

  const bookedTimes: string[] = useMemo(() => {
    return (
      doctor.booked_times.find((item) => item.date === formData.date)
        ?.booked_times ?? []
    );
  }, [formData.date, doctor.booked_times]);

  const timeList = useMemo(() => {
    const times: string[] = [];
    const start = new Date();
    start.setHours(startHours, startMinutes, 0, 0);

    const end = new Date();
    end.setHours(endHours, endMinutes, 0, 0);

    while (start <= end) {
      const timeString = start.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      if (!bookedTimes.includes(timeString.split(' ')[0])) {
        times.push(timeString);
      }

      start.setMinutes(start.getMinutes() + interval);
    }

    return times;
  }, [startHours, startMinutes, endHours, endMinutes, bookedTimes, interval]);

  return (
    <div className="px-4 pb-4">
      {doctor.appointment_schedule ? (
        <div className="relative">
          <div
            className={`mt-4 grid transition-all delay-200 duration-1000 ease-in-out ${
              currentOpen === doctor.id ? 'max-h-[500px]' : 'max-h-20'
            } grid-cols-5 gap-2 overflow-hidden`}
          >
            {timeList.map((time, idx) => (
              <button
                key={idx}
                type="button"
                className="rounded-md bg-green-200/50 px-3 py-2 text-sm hover:bg-green-300"
                onClick={() => {
                  setValue('doctorTime', time);
                  setValue('doctorId', doctor.id);
                  // setFormData((p) => ({
                  //   ...p,
                  //   doctorId: doctor.id,
                  //   doctorTime: time,
                  // }));
                }}
              >
                {time}
              </button>
            ))}
            <div
              className={cn(
                'absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-white to-white/50 transition-opacity duration-1000 ease-in-out',
                currentOpen !== doctor.id
                  ? 'opacity-100'
                  : 'pointer-events-none opacity-0'
              )}
            ></div>
          </div>
        </div>
      ) : (
        <div className="mt-2 w-full bg-gray-50 p-4 text-left text-sm text-gray-500">
          <span className="rounded-md px-2 py-1 text-green-700">
            Next available:{' '}
            <span className="text-black">Please contact centre</span>
          </span>
        </div>
      )}
    </div>
  );
}
