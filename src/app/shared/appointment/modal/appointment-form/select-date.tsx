'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormSetValue,
} from 'react-hook-form';
import { FieldError, Flex, Input, Loader, Text, Title } from 'rizzui';
import Calendar from 'react-calendar';
import {
  formDataAtom,
  useStepperAppointment,
} from '@/app/shared/appointment/modal/appointment-form';
import dayjs from 'dayjs';
import { appointmentBookSchema } from '@/validators/admin-appointment.schema';
import Footer from './footer';
import {
  useGetCalendarScheduleByClinicId,
  useGetDoctorAvailabilityByClinic,
  useGetDoctorByClinic,
} from '@/hooks/useClinic';
import { useMemo, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { IParamGetDoctorByClinic } from '@/types/paramTypes';
import { IGetDoctorByClinicResponse } from '@/types/ApiResponse';
import cn from '@/core/utils/class-names';
import { PiBell } from 'react-icons/pi';

// generate form types from zod validation schema

const FormSchema = appointmentBookSchema['appointmentDate'];

type FormSchemaType = z.infer<typeof FormSchema>;

export default function DateTime() {
  const { gotoNextStep } = useStepperAppointment();
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [formData, setFormData] = useAtom(formDataAtom);
  const [currentOpen, setCurrentOpen] = useState<number | null>(null);

  const { data: dataCalendarSchedule, isLoading } =
    useGetCalendarScheduleByClinicId(formData.clinicId as number);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: formData.date ? new Date(formData.date) : new Date(),
    },
  });

  const { data: dataDoctor, isLoading: isLoadingDoctor } = useGetDoctorByClinic(
    {
      id: formData?.clinicId?.toString() as string,
      page: 1,
      perPage: 10,
      treatment_type: formData.treatment,
      problem_type: formData.patient_problem,
      date: formData.date,
    }
  );

  const doctor = useMemo(() => {
    return dataDoctor?.find(
      (doctor) => doctor.id === Number(formData.doctorId)
    );
  }, [dataDoctor, formData.doctorId]);

  const disabledDate: dayjs.Dayjs[] = useMemo(() => {
    if (!dataCalendarSchedule?.data) return [];
    const disabledDates = dataCalendarSchedule?.data.map((item) =>
      dayjs(item.date)
    );
    return disabledDates;
  }, [dataCalendarSchedule]);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    gotoNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center">
        <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
          <Text className="text-base font-semibold">
            Select Appointment Date:
          </Text>

          <div className="flex justify-center">
            <Calendar
              onChange={(date) => {
                if (date instanceof Date) {
                  setFormData((prev) => ({
                    ...prev,
                    date: dayjs(date).format('YYYY-MM-DD'),
                  }));
                }
              }}
              minDate={new Date()}
              prev2Label={false}
              next2Label={false}
              tileDisabled={({ date, view }) => {
                if (['year', 'decade', 'century'].includes(view)) {
                  return false;
                }
                return !disabledDate.some((disabled) =>
                  disabled.isSame(dayjs(date), 'day')
                );
              }}
              tileClassName={({ date, view }) => {
                if (view === 'month') {
                  const isDisabled = disabledDate.some((disabled) =>
                    disabled.isSame(dayjs(date), 'day')
                  );
                  return isDisabled ? 'bg-green-100' : '';
                }
              }}
              className="self-center !border-0 !bg-transparent px-4 pb-4 pt-2.5 !font-inter !text-base md:px-5 md:pb-5"
            />
            <FieldError error={errors.date?.message} className="!mt-2" />
          </div>
        </div>

        <div className="space-y-5 pb-6 pt-5 md:pt-7">
          <Flex justify="between" align="center">
            <Input
              label="Doctor"
              value={
                doctor &&
                `${doctor?.first_name ?? ''} ${doctor?.last_name ?? ''}`
              }
              disabled
              className="w-full"
              placeholder="Select Doctor"
              error={errors.doctorId?.message}
            />
            <Input
              label="Doctor Time"
              placeholder="Select Time"
              value={formData.doctorTime}
              disabled
              error={errors.doctorTime?.message}
            />
          </Flex>
          <div className="mx-auto max-h-80 max-w-4xl divide-y divide-gray-200 overflow-auto">
            {isLoadingDoctor && <Loader variant="spinner" size="xl" />}
            {!isLoadingDoctor && dataDoctor?.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4">
                <PiBell className="text-primary" size={48} />
                <Text className="text-2xl font-medium">
                  No Doctor Available
                </Text>
              </div>
            )}
            {dataDoctor?.map((doctor, index: number) => {
              if (!doctor.id) return null;

              return (
                <div key={index} className="mb-5">
                  {/* Doctor Header */}
                  <div className="flex items-center justify-between space-x-4 p-6">
                    <div className="flex items-center space-x-4">
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
                    localTimezone={localTimezone}
                  />
                </div>
              );
            })}
          </div>
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
  localTimezone,
}: {
  doctor: IGetDoctorByClinicResponse['data'][number];
  currentOpen: number | null;
  setValue: UseFormSetValue<FormSchemaType>;
  localTimezone: string;
}) {
  const [formData] = useAtom(formDataAtom);

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
      timezone: localTimezone,
    });

  const timeList = useMemo(() => {
    if (!dataAvailability?.data) return [];
    return dataAvailability.data.reduce(
      (acc, item) => {
        if (item.available) {
          let timeObj = dayjs(item.time);
          const availTime = timeObj.format('h:mm A');
          const valueTime = timeObj.format('HH:mm');
          acc.push({ availTime, valueTime });
        }
        return acc;
      },
      [] as { availTime: string; valueTime: string }[]
    );
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
            {timeList.map(({ availTime, valueTime }, idx) => (
              <button
                key={idx}
                type="button"
                className="rounded-md bg-green-200/50 px-3 py-2 text-sm hover:bg-green-300"
                onClick={() => {
                  setValue('doctorTime', valueTime);
                  setValue('doctorId', doctor.id as number);
                  setValue('fee', doctor.cost.amount || '');
                }}
              >
                {availTime}
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
