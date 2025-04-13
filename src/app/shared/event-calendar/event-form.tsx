'use client';

import uniqueId from 'lodash/uniqueId';
import { PiXBold } from 'react-icons/pi';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { ActionIcon, Button, Flex, Input, Text, Textarea, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { DatePicker } from '@core/ui/datepicker';
import { CalendarEvent } from '@/types';
import useEventCalendar from '@core/hooks/use-event-calendar';
import { EventFormInput } from '@/validators/create-event.schema';
import CSelect from '@/core/ui/select';
import { useGetAllDoctors } from '@/hooks/useDoctor';
import { useMemo } from 'react';
import {
  useGetListSchedule,
  usePostCreateSchedule,
  usePutUpdateSchedule,
} from '@/hooks/useSchedule';
import dayjs from 'dayjs';

interface CreateEventProps {
  startDate?: Date;
  endDate?: Date;
  event?: CalendarEvent;
}

export default function EventForm({
  startDate,
  endDate,
  event,
}: CreateEventProps) {
  const { closeModal } = useModal();
  const { createEvent, updateEvent } = useEventCalendar();

  const isNewEvent = event?.id === '' || event?.id === undefined;

  const { data: dataDoctor } = useGetAllDoctors({
    page: 1,
    perPage: 50,
  });

  const { refetch } = useGetListSchedule({
    page: 1,
    perPage: 100,
  });

  const { mutate: mutateCreateSchedule, isPending: isPendingCreateSchedule } =
    usePostCreateSchedule();
  const { mutate: mutateUpdateSchedule, isPending: isPendingUpdateSchedule } =
    usePutUpdateSchedule();

  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<EventFormInput>({
    defaultValues: {
      title: isNewEvent ? '' : (event?.title ?? ''),
      description: isNewEvent ? '' : (event?.description ?? ''),
      location: isNewEvent ? '' : (event?.location ?? ''),
      startDate: isNewEvent ? startDate : event?.start,
      endDate: isNewEvent ? endDate : event?.end,
      breakTimes: isNewEvent ? [] : (event?.breakTimes ?? []),
      doctor: isNewEvent ? undefined : (event?.doctor ?? undefined),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'breakTimes',
  });

  const isUpdateEvent = event !== undefined;

  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');

  const doctorOptions = useMemo(() => {
    if (!dataDoctor) return [];

    return dataDoctor?.map((doctor) => ({
      label: doctor.first_name + ' ' + doctor.last_name,
      value: doctor.id.toString(),
    }));
  }, [dataDoctor]);

  const onSubmit: SubmitHandler<EventFormInput> = (data) => {
    toast.success(
      <Text as="b">
        Event {isNewEvent ? 'Created' : 'Updated'} Successfully
      </Text>
    );

    if (isNewEvent) {
      mutateCreateSchedule(
        {
          title: data.title,
          description: data.description ?? '',
          start_date: dayjs(data.startDate).format('YYYY-MM-DD HH:mm'),
          end_date: dayjs(data.endDate).format('YYYY-MM-DD HH:mm'),
          doctorId: Number(data.doctor),
          break_times: data.breakTimes?.map((date) => ({
            start_date: dayjs(date.start).format('YYYY-MM-DD HH:mm'),
            end_date: dayjs(date.end).format('YYYY-MM-DD HH:mm'),
          })),
        },
        {
          onSuccess: () => {
            toast.success('Event Created Successfully');
            refetch();
            closeModal();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message ?? 'Something went wrong'
            );
          },
        }
      );
    } else {
      mutateUpdateSchedule(
        {
          id: event?.id,
          title: data.title,
          description: data.description ?? '',
          start_date: dayjs(data.startDate).format('YYYY-MM-DD HH:mm'),
          end_date: dayjs(data.endDate).format('YYYY-MM-DD HH:mm'),
          doctorId: Number(data.doctor),
          break_times: data.breakTimes?.map((date) => ({
            start_date: dayjs(date.start).format('YYYY-MM-DD HH:mm'),
            end_date: dayjs(date.end).format('YYYY-MM-DD HH:mm'),
          })),
        },
        {
          onSuccess: () => {
            toast.success('Event Updated Successfully');
            refetch();
            closeModal();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message ?? 'Something went wrong'
            );
          },
        }
      );
    }
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          {isUpdateEvent ? 'Update Event' : 'Create a new event'}
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium"
      >
        <Input
          label="Event Name"
          placeholder="Enter a name of event"
          {...register('title')}
          className="col-span-full"
          error={errors.title?.message}
        />

        <Textarea
          label="Event Description"
          placeholder="Enter your event description"
          {...register('description')}
          error={errors.description?.message}
          textareaClassName="h-20"
          className="col-span-full"
        />
        <Controller
          name="doctor"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CSelect
              label="Doctor"
              placeholder="Select a doctor"
              options={doctorOptions}
              value={value}
              onChange={onChange}
              error={errors.doctor?.message}
              className="col-span-full"
              searchable
            />
          )}
        />
        <Controller
          name="startDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              popperPlacement="top-start"
              selected={value}
              onChange={onChange}
              selectsStart
              startDate={value}
              endDate={endDateValue}
              minDate={new Date()}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="date-picker-event-calendar"
              placeholderText="Event Start Date"
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              popperPlacement="top-start"
              selected={value}
              onChange={onChange}
              selectsEnd
              minDate={startDate}
              startDate={startDateValue}
              endDate={value}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="date-picker-event-calendar"
              placeholderText="Event End Date"
            />
          )}
        />
        <div className="col-span-full grid grid-cols-1 gap-2">
          <Text className="mb-2 text-sm font-medium">Break Times</Text>
          {fields.map((item, index) => (
            <Flex key={item.id} gap="2" align="center" className="w-full">
              <Controller
                name={`breakTimes.${index}.start`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    popperPlacement="top-start"
                    selected={value}
                    onChange={onChange}
                    minDate={new Date()}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="date-picker-event-calendar w-full"
                    placeholderText="Break Start Time"
                  />
                )}
              />
              <Controller
                name={`breakTimes.${index}.end`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    popperPlacement="top-start"
                    selected={value}
                    onChange={onChange}
                    startDate={watch(`breakTimes.${index}.start`)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full"
                    placeholderText="Break End Time"
                  />
                )}
              />
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => remove(index)}
                className="p-0 text-gray-500 hover:!text-gray-900"
              >
                <PiXBold className="h-[18px] w-[18px]" />
              </ActionIcon>
            </Flex>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          className="col-span-full mt-2 @xl:w-auto dark:hover:border-gray-400"
          onClick={() => append({ start: new Date(), end: new Date() })}
        >
          Add Break Time
        </Button>
        <div className={cn('col-span-full grid grid-cols-2 gap-4 pt-5')}>
          <Button
            variant="outline"
            className="w-full @xl:w-auto dark:hover:border-gray-400"
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isPendingUpdateSchedule || isPendingCreateSchedule}
            className="hover:gray-700 w-full @xl:w-auto"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
