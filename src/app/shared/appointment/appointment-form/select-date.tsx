'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FieldError, Text, Title } from 'rizzui';
import Calendar from 'react-calendar';
import {
  formDataAtom,
  useStepperAppointment,
} from '@/app/shared/appointment/appointment-form';
import dayjs from 'dayjs';
import { appointmentBookSchema } from '@/validators/admin-appointment.schema';
import Footer from './footer';

const disabledDate: dayjs.Dayjs[] = [];
for (
  let date = dayjs('2025-05-06');
  date.isBefore(dayjs('2025-05-31'));
  date = date.add(1, 'day')
) {
  if (date.day() !== 0 && date.day() !== 6) {
    // Exclude weekends (Sunday: 0, Saturday: 6)
    disabledDate.push(date);
  }
}

// generate form types from zod validation schema

const FormSchema = appointmentBookSchema['appointmentDate'];

type FormSchemaType = z.infer<typeof FormSchema>;

export default function DateTime() {
  const { gotoNextStep } = useStepperAppointment();
  const [formData, setFormData] = useAtom(formDataAtom);

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

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setFormData((prev) => ({
      ...prev,
      date: dayjs(data.date).format('YYYY-MM-DD'),
    }));
    gotoNextStep();
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
            <>
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
                    return isDisabled ? 'bg-green-100 hover:bg-green-200' : '';
                  }
                }}
                className="!w-full !border-0 !bg-transparent px-4 pb-4 pt-2.5 !font-inter !text-base md:px-5 md:pb-5"
              />
              <FieldError error={errors.date?.message} className="!mt-2" />
            </>
          )}
        />
      </div>
      <Footer />
    </form>
  );
}
