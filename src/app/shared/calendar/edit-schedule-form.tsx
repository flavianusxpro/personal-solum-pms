'use client';

import { PiXBold } from 'react-icons/pi';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { ActionIcon, Button, Flex, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useGetListSchedule, usePutUpdateSchedule } from '@/hooks/useSchedule';
import dayjs from 'dayjs';
import { DatePicker } from '@/core/ui/datepicker';

import { DoctorSchedule } from '@/types/ApiResponse';
import { EditDoctorScheduleFormType } from '@/validators/edit-doctor-schedule.schema';
import { IPayloadPutUpdateSchedule } from '@/types/paramTypes';
import toast from 'react-hot-toast';

interface EditDoctorScheduleProps {
  event?: DoctorSchedule;
  doctorId?: string;
}

export default function EditScheduleForm({
  doctorId,
  event,
}: EditDoctorScheduleProps) {
  const { closeModal } = useModal();
  const startDay = dayjs().hour(9).minute(0).toDate();
  const endDay = dayjs().hour(17).minute(0).toDate();

  const { refetch } = useGetListSchedule({
    doctorId,
    page: 1,
    perPage: 100,
  });

  const {
    control,
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm<EditDoctorScheduleFormType>({
    defaultValues: {
      date: {
        start_date: event?.start_date
          ? dayjs(event?.start_date).toDate()
          : startDay,
        end_date: event?.end_date ? dayjs(event?.end_date).toDate() : endDay,
      },
      dailyBreakTimes: event?.break_times
        ? event.break_times.map((breakTime) => ({
            ...breakTime,
            start_date: new Date(breakTime.start_date),
            end_date: new Date(breakTime.end_date),
          }))
        : [],
    },
  });

  const { mutate } = usePutUpdateSchedule();

  const {
    fields: dailyBreakFields,
    append: appendDailyBreakField,
    update: updateDailyBreakField,
    remove: removeDailyBreakTime,
    replace: replaceDailyBreakField,
  } = useFieldArray({
    control,
    name: 'dailyBreakTimes',
  });

  const onSubmit: SubmitHandler<EditDoctorScheduleFormType> = (data) => {
    const payloadUpdateSchedule: IPayloadPutUpdateSchedule = {
      id: event?.id,
      doctorId: Number(doctorId),
      start_date: dayjs(data.date.start_date).format('YYYY-MM-DD HH:mm'),
      end_date: dayjs(data.date.end_date).format('YYYY-MM-DD HH:mm'),
      break_times:
        data?.dailyBreakTimes?.map((breakTime) => ({
          start_date: dayjs(breakTime.start_date).format('YYYY-MM-DD HH:mm'),
          end_date: dayjs(breakTime.end_date).format('YYYY-MM-DD HH:mm'),
        })) ?? [],
      description: event?.description,
    };

    mutate(payloadUpdateSchedule, {
      onSuccess: () => {
        refetch();
        closeModal();
        toast.success('Schedule updated successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to update schedule: ' + error.response.data.message
        );
      },
    });
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          Update Selected Date&apos;s Schedule (
          <span className="font-semibold">
            {dayjs(event?.start_date).format('DD MMM YYYY')})
          </span>
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
        className="grid grid-cols-1 gap-5 @container [&_label]:font-medium"
      >
        <Flex align="center" gap="2">
          <Controller
            name={`date.start_date`}
            control={control}
            render={({ field }) => (
              <DatePicker
                popperPlacement="top-start"
                selected={field.value}
                onChange={(value) => field.onChange(value)}
                selectsStart
                // startDate={value}
                // endDate={endDateValue}
                minDate={new Date()}
                showTimeSelect
                showTimeSelectOnly
                dateFormat="h:mm aa"
                className="w-full"
                placeholderText="Start Time"
              />
            )}
          />

          <Controller
            name={`date.end_date`}
            control={control}
            render={({ field }) => (
              <DatePicker
                popperPlacement="top-start"
                selected={field.value}
                onChange={(value) => field.onChange(value)}
                selectsEnd
                minDate={watch(`date.start_date`)}
                startDate={watch(`date.end_date`)}
                showTimeSelect
                showTimeSelectOnly
                dateFormat="h:mm aa"
                placeholderText="End Time"
                className="w-full"
              />
            )}
          />
        </Flex>

        <div className="col-span-full grid grid-cols-1 gap-2">
          <Text className="text-sm font-semibold">Break Times</Text>
          {dailyBreakFields.map((item, index) => (
            <Flex key={item.id} gap="4" align="center" className="w-full">
              <Controller
                name={`dailyBreakTimes.${index}.start_date`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    popperPlacement="top-start"
                    selected={value}
                    onChange={onChange}
                    minDate={startDay}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="h:mm aa"
                    className="date-picker-event-calendar w-full"
                    placeholderText="Break Start Time"
                  />
                )}
              />
              <Controller
                name={`dailyBreakTimes.${index}.end_date`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    popperPlacement="top-start"
                    selected={value}
                    onChange={onChange}
                    startDate={watch(`dailyBreakTimes.${index}.end_date`)}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="h:mm aa"
                    className="w-full"
                    placeholderText="Break End Time"
                  />
                )}
              />
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => removeDailyBreakTime(index)}
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
          className="col-span-full @xl:w-auto dark:hover:border-gray-400"
          onClick={() =>
            appendDailyBreakField({
              start_date: startDay,
              end_date: startDay,
              day: 1,
              label: 'Monday',
            })
          }
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
            // isLoading={isPendingUpdateAppointment}
            className="hover:gray-700 w-full @xl:w-auto"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
