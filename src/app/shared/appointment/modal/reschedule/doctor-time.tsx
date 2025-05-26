'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, UseFormSetValue } from 'react-hook-form';
import { Flex, Input, Loader, Text } from 'rizzui';
import Footer from './footer';
import { IParamGetDoctorByClinic } from '@/types/paramTypes';
import { useMemo, useState } from 'react';
import {
  useGetDoctorAvailabilityByClinic,
  useGetDoctorByClinic,
} from '@/hooks/useClinic';
import Image from 'next/image';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { IGetDoctorByClinicResponse } from '@/types/ApiResponse';
import cn from '@/core/utils/class-names';
import dayjs from 'dayjs';
import { formRescheduleDataAtom, useStepperCancelAppointment } from '.';
import { rescheduleAppointmentSchema } from '@/validators/reschedule-appointment.schema';

const FormSchema = rescheduleAppointmentSchema['selectDoctorAndTime'];

type FormSchemaType = z.infer<typeof FormSchema>;

export default function AppointmentPatientDoctor() {
  const { gotoNextStep } = useStepperCancelAppointment();

  const [formData, setFormData] = useAtom(formRescheduleDataAtom);
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
      fee: formData?.fee,
    },
  });
  const watchDoctor = watch('doctorId');
  const watchDoctorTime = watch('doctorTime');

  const [params] = useState<IParamGetDoctorByClinic>({
    id: formData?.clinicId?.toString() as string,
    page: 1,
    perPage: 10,
    treatment_type: formData.treatment,
    problem_type: formData.patient_problem,
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
      fee: data.fee as string,
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
          {dataDoctor?.map((doctor, index: number) => {
            if (!doctor.id) return null;

            return (
              <div key={index} className="mb-5">
                {/* Doctor Header */}
                <div className="flex items-center justify-between space-x-4 p-6">
                  <div className="flex items-center space-x-4">
                    {/* {doctor.url_photo ? (
                      <Image
                        src={doctor.url_photo}
                        alt={doctor.first_name}
                        className="h-12 w-12 rounded-full"
                        height={48}
                        width={48}
                      />
                    ) : ( */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                      🏥
                    </div>
                    {/* )} */}
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
                          <Text>Hide Appointment</Text>{' '}
                          <BiChevronUp size={30} />
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
            );
          })}
        </div>
      </div>
      <Footer goBackToStepNumber={0} />
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
    fee?: string;
  }>;
}) {
  const [formData] = useAtom(formRescheduleDataAtom);

  const appointmentType = useMemo(() => {
    if (formData?.appointment_type?.includes('FOLLOWUP')) {
      return 'FOLLOWUP';
    } else if (formData?.appointment_type?.includes('SCRIPT_RENEWAL')) {
      return 'SCRIPT_RENEWAL';
    } else {
      return 'INITIAL';
    }
  }, [formData?.appointment_type]);

  const { data: dataAvailability, isLoading } =
    useGetDoctorAvailabilityByClinic({
      clinicId: formData?.clinicId as number,
      doctorId: doctor.id as number,
      appointment_type: appointmentType,
      appointment_date: dayjs(formData.date).format('YYYY-MM-DD'),
    });

  const timeList = useMemo(() => {
    if (!dataAvailability?.data) return [];
    return dataAvailability.data.reduce((acc, item) => {
      if (item.available) {
        const availTime = dayjs(item.time, 'HH:mm:ss').format('h:mm A');
        acc.push(`${availTime}`);
      }
      return acc;
    }, [] as string[]);
  }, [dataAvailability?.data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="px-4 pb-4">
      {timeList.length > 0 ? (
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
                  setValue('doctorId', doctor.id as number);
                  setValue('fee', doctor.cost.amount);
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
