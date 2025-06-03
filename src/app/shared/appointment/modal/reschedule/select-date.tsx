'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FieldError, Text, Title } from 'rizzui';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import Footer from './footer';
import { rescheduleAppointmentSchema } from '@/validators/reschedule-appointment.schema';
import { formRescheduleDataAtom, useStepperCancelAppointment } from '.';
import { useGetCalendarScheduleByClinicId } from '@/hooks/useClinic';
import { useMemo } from 'react';

// generate form types from zod validation schema
const FormSchema = rescheduleAppointmentSchema['appointmentDate'];

type FormSchemaType = z.infer<typeof FormSchema>;

export default function DateTime() {
  const { gotoStep } = useStepperCancelAppointment();
  const [formData, setFormData] = useAtom(formRescheduleDataAtom);

  const { data: dataCalendarSchedule, isLoading } =
    useGetCalendarScheduleByClinicId(formData.clinicId as number);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: formData.date ? new Date(formData.date) : new Date(),
    },
  });

  const disabledDate: dayjs.Dayjs[] = useMemo(() => {
    if (!dataCalendarSchedule?.data) return [];
    const disabledDates = dataCalendarSchedule?.data.map((item) =>
      dayjs(item.date)
    );
    return disabledDates;
  }, [dataCalendarSchedule]);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setFormData((prev) => ({
      ...prev,
      date: dayjs(data.date).format('YYYY-MM-DD'),
    }));

    gotoStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
        <Text className="text-base font-semibold">
          Select Appointment Date:
        </Text>

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <div className="flex justify-center">
              <Calendar
                {...field}
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
                    return isDisabled ? '' : '';
                  }
                }}
                className="self-center !border-0 !bg-transparent px-4 pb-4 pt-2.5 !font-inter !text-base md:px-5 md:pb-5"
              />
              <FieldError error={errors.date?.message} className="!mt-2" />
            </div>
          )}
        />
      </div>
      <Footer />
    </form>
  );
}
