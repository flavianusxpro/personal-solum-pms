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
import { Avatar, FieldError, Flex, Input, Loader, Text } from 'rizzui';
import Calendar from 'react-calendar';
import {
  formDataAtom,
  useStepperAppointment,
} from '@/app/shared/appointment/modal/appointment-form';
import { appointmentBookSchema } from '@/validators/admin-appointment.schema';
import Footer from './footer';
import {
  useGetCalendarScheduleByClinicId,
  useGetDoctorAvailabilityByClinic,
  useGetDoctorByClinic,
} from '@/hooks/useClinic';
import { useEffect, useMemo, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { IGetDoctorByClinicResponse } from '@/types/ApiResponse';
import cn from '@/core/utils/class-names';
import { PiBell, PiCalendar } from 'react-icons/pi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const FormSchema = appointmentBookSchema['appointmentDate'];

type FormSchemaType = z.infer<typeof FormSchema>;

export default function DateTime() {
  const { gotoNextStep } = useStepperAppointment();
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [showSaveButton, setShowSaveButton] = useState<boolean>(true);

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

  // Auto-expand doctor's times if they were pre-selected from last appointment
  useEffect(() => {
    if (formData.doctorId && dataDoctor?.length) {
      setCurrentOpen(Number(formData.doctorId));
    }
  }, [formData.doctorId, dataDoctor]);

  const disabledDate: dayjs.Dayjs[] = useMemo(() => {
    if (!dataCalendarSchedule?.data) return [];
    const disabledDates = dataCalendarSchedule?.data.map((item) =>
      dayjs(item.date)
    );
    return disabledDates;
  }, [dataCalendarSchedule]);

  useEffect(() => {
    if (!formData.date && formData.doctorId && disabledDate.length > 0) {
      let checkDate = dayjs();
      let found = false;
      const maxDaysToCheck = 30;

      for (let i = 0; i < maxDaysToCheck && !found; i++) {
        const dateToCheck = checkDate.add(i, 'day');
        const isAvailable = disabledDate.some((availableDate) =>
          availableDate.isSame(dateToCheck, 'day')
        );

        if (isAvailable) {
          setFormData((prev) => ({
            ...prev,
            date: dateToCheck.format('YYYY-MM-DD'),
          }));
          found = true;
        }
      }
    }
  }, [formData.date, formData.doctorId, disabledDate, setFormData]);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    gotoNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 flex h-[549px] flex-col gap-10 overflow-y-auto p-5">
        <Text className="text-base font-semibold">
          Select Appointment Date:
        </Text>

        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex-[1]">
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
              className="!w-full !border-0 !bg-transparent !p-5 !font-inter !text-base"
            />
            <FieldError error={errors.date?.message} className="!mt-2" />
          </div>

          <div className="flex-[1] overflow-y-auto">
            {isLoadingDoctor && <Loader variant="spinner" size="xl" />}
            {!isLoadingDoctor && dataDoctor?.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4">
                <PiBell className="text-primary" size={48} />
                <Text className="text-2xl font-medium">
                  No Doctor Available
                </Text>
              </div>
            )}
            {!formData.date && (
              <div className="flex flex-col items-center justify-center gap-4">
                <PiCalendar className="text-primary" size={48} />
                <Text className="text-2xl font-medium">Please Select Date</Text>
              </div>
            )}

            {dataDoctor?.map((doctor, index: number) => {
              if (!doctor.id) return null;
              const name = `${doctor?.first_name} ${doctor?.first_name}`;
              console.log(doctor);
              return (
                <div
                  key={`${doctor.id}-${formData.date}-${index}`}
                  className="flex flex-col gap-5"
                >
                  <div className="flex items-center justify-between space-x-4 p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar
                        src={doctor?.photo ? doctor.photo : ''}
                        name={name}
                      />
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

      <Footer showSaveButton={showSaveButton} />
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
  const [formData, setFormData] = useAtom(formDataAtom);
  const [hasAutoSelected, setHasAutoSelected] = useState(false);
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

  useEffect(() => {
    if (
      !hasAutoSelected &&
      formData.doctorId === doctor.id &&
      timeList.length > 0 &&
      !formData.doctorTime
    ) {
      const firstSlot = timeList[0];
      setValue('doctorTime', firstSlot.valueTime);
      setValue('doctorId', doctor.id as number);
      setValue('fee', doctor.cost.amount || '');
      setFormData((prev) => ({
        ...prev,
        doctorTime: firstSlot.valueTime,
        doctorId: doctor.id as number,
        fee: doctor.cost.amount || '',
      }));
      setHasAutoSelected(true);
    }
  }, [
    timeList,
    formData.doctorId,
    doctor.id,
    hasAutoSelected,
    setValue,
    setFormData,
    doctor.cost.amount,
    formData.doctorTime,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  const toSydneyFromAvail = (avail: string) => {
    const today = dayjs().format('YYYY-MM-DD');
    return dayjs(`${today} ${avail}`, 'YYYY-MM-DD h:mm A')
      .tz('Australia/Sydney')
      .format('h:mm A');
  };

  const toSydneyFromValue = (value: string) => {
    const today = dayjs().format('YYYY-MM-DD');
    return dayjs(`${today} ${value}`, 'YYYY-MM-DD HH:mm')
      .tz('Australia/Sydney')
      .format('HH:mm');
  };

  return (
    <div className="px-4 pb-4">
      {timeList.length > 0 ? (
        <div className="relative">
          <div
            className={`mt-4 grid transition-all delay-200 duration-1000 ease-in-out ${
              currentOpen === doctor.id ? 'max-h-[500px]' : 'max-h-20'
            } grid-cols-5 gap-2 overflow-hidden`}
          >
            {timeList.map(({ availTime, valueTime }, idx) => {
              const sydneyAvailTime = toSydneyFromAvail(availTime);
              const sydneyValueTime = toSydneyFromValue(valueTime);

              return (
                <button
                  key={idx}
                  type="button"
                  className={cn(
                    'w-auto rounded-md px-2 py-2 text-sm hover:bg-green-300',
                    formData.doctorId == doctor.id &&
                      formData.doctorTime === sydneyValueTime
                      ? 'bg-green-300'
                      : 'bg-green-200/50'
                  )}
                  onClick={() => {
                    setValue('doctorTime', sydneyValueTime);
                    setValue('doctorId', doctor.id as number);
                    setValue('fee', doctor.cost.amount || '');

                    setFormData((prev) => ({
                      ...prev,
                      doctorTime: sydneyValueTime,
                      doctorId: doctor.id as number,
                      fee: doctor.cost.amount || '',
                      doctor_name: `${doctor.first_name ?? doctor.first_name} ${doctor.last_name ?? doctor.last_name}`,
                      doctor_tz: doctor?.timezone_doctor,
                    }));
                  }}
                >
                  {sydneyAvailTime}
                </button>
              );
            })}

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
