'use client';

import { PiClipboardBold, PiPlus, PiPlusBold, PiXBold } from 'react-icons/pi';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { ActionIcon, Button, Flex, Grid, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { CalendarEvent } from '@/types';
import {
  useGetListSchedule,
  usePostCreateSchedule,
  usePutUpdateSchedule,
} from '@/hooks/useSchedule';
import dayjs from 'dayjs';
import CSelect from '../ui/select';
import { ScheduleFormType } from '@/validators/create-schedule.schema';
import { DatePicker } from '@/core/ui/datepicker';
import ActionTooltipButton from '../ui/action-tooltip-button';
import { weekIntervalOption } from '@/config/constants';

interface CreateEventProps {
  startDate?: Date;
  endDate?: Date;
  event?: CalendarEvent;
  doctorId?: string;
}

const startDay = dayjs().hour(9).minute(0).toDate();
const endDay = dayjs().hour(17).minute(0).toDate();

const weekInitialValue = [
  {
    day: 'Monday',
    startTime: startDay,
    endTime: endDay,
  },
  {
    day: 'Tuesday',
    startTime: startDay,
    endTime: endDay,
  },
  {
    day: 'Wednesday',
    startTime: startDay,
    endTime: endDay,
  },
  {
    day: 'Thursday',
    startTime: startDay,
    endTime: endDay,
  },
  {
    day: 'Friday',
    startTime: startDay,
    endTime: endDay,
  },
  {
    day: 'Saturday',
  },
  {
    day: 'Sunday',
  },
];

interface CreateScheduleProps {
  event?: CalendarEvent;
  doctorId?: string;
}

export default function ScheduleForm({ event, doctorId }: CreateScheduleProps) {
  const { closeModal } = useModal();
  const isNewSchedule = true;

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
  } = useForm<ScheduleFormType>({
    defaultValues: {
      interval: 'every-week',
      week: weekInitialValue,
    },
  });

  const {
    fields: weekFields,
    update: updateWeekField,
    replace: replaceWeekField,
  } = useFieldArray({
    control,
    name: 'week',
  });

  const {
    fields: dailyBreakFields,
    append: appendDailyBreakField,
    update: updateDailyBreakField,
    remove: removeDailyBreakTime,
  } = useFieldArray({
    control,
    name: 'dailyBreakTimes',
  });

  const onSubmit: SubmitHandler<ScheduleFormType> = (data) => {
    console.log('🚀 ~ ScheduleForm ~ data:', data);
    toast.success(
      <Text as="b">
        Event {isNewSchedule ? 'Created' : 'Updated'} Successfully
      </Text>
    );

    // if (isNewSchedule) {
    //   mutateCreateSchedule(
    //     {
    //       title: data.title,
    //       description: data.description ?? '',
    //       start_date: dayjs(data.startDate).format('YYYY-MM-DD HH:mm'),
    //       end_date: dayjs(data.endDate).format('YYYY-MM-DD HH:mm'),
    //       doctorId: Number(data.doctor),
    //       break_times: data.breakTimes?.map((date) => ({
    //         start_date: dayjs(date.start).format('YYYY-MM-DD HH:mm'),
    //         end_date: dayjs(date.end).format('YYYY-MM-DD HH:mm'),
    //       })),
    //     },
    //     {
    //       onSuccess: () => {
    //         toast.success('Event Created Successfully');
    //         refetch();
    //         closeModal();
    //       },
    //       onError: (error: any) => {
    //         toast.error(
    //           error?.response?.data?.message ?? 'Something went wrong'
    //         );
    //       },
    //     }
    //   );
    // } else {
    //   mutateUpdateSchedule(
    //     {
    //       id: event?.id,
    //       title: data.title,
    //       description: data.description ?? '',
    //       start_date: dayjs(data.startDate).format('YYYY-MM-DD HH:mm'),
    //       end_date: dayjs(data.endDate).format('YYYY-MM-DD HH:mm'),
    //       doctorId: Number(data.doctor),
    //       break_times: data.breakTimes?.map((date) => ({
    //         start_date: dayjs(date.start).format('YYYY-MM-DD HH:mm'),
    //         end_date: dayjs(date.end).format('YYYY-MM-DD HH:mm'),
    //       })),
    //     },
    //     {
    //       onSuccess: () => {
    //         toast.success('Event Updated Successfully');
    //         refetch();
    //         closeModal();
    //       },
    //       onError: (error: any) => {
    //         toast.error(
    //           error?.response?.data?.message ?? 'Something went wrong'
    //         );
    //       },
    //     }
    //   );
    // }
  };

  const deleteday = (index: number) => {
    updateWeekField(index, {
      ...weekFields[index],
      startTime: undefined,
      endTime: undefined,
    });
  };
  const handleCopyTimeToAllDays = (index: number) => {
    const startTime = weekFields[index].startTime;
    const endTime = weekFields[index].endTime;
    if (!startTime || !endTime) return;
    const newFields = weekFields.map((item, i) => {
      if (i === index || !item.startTime) return item;
      return {
        ...item,
        startTime: startTime,
        endTime: endTime,
      };
    });
    replaceWeekField(newFields);
  };
  const handleAddDay = (index: number) => {
    updateWeekField(index, {
      ...weekFields[index],
      startTime: startDay,
      endTime: endDay,
    });
  };
  const handleUpdateStartTime = (index: number, value: Date | null) => {
    if (!value) return;
    updateWeekField(index, {
      ...weekFields[index],
      startTime: value,
    });
  };
  const handleUpdateEndTime = (index: number, value: Date | null) => {
    if (!value) return;
    updateWeekField(index, {
      ...weekFields[index],
      endTime: value,
    });
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          {isNewSchedule ? 'Create a New Schedule' : 'Update Schedule'}
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
        <Controller
          control={control}
          name="interval"
          render={({ field }) => (
            <CSelect
              {...field}
              label="Repeat Schedule"
              options={weekIntervalOption}
              className={'w-fit'}
              labelClassName="font-semibold"
            />
          )}
        />

        {weekFields.map((item, index) => (
          <Flex key={index} align="center" gap="2">
            <Flex className="w-1/3">
              <Text className="font-medium">{item.day}</Text>
            </Flex>
            {item.endTime && item.startTime ? (
              <Flex className="w-full">
                <DatePicker
                  popperPlacement="top-start"
                  selected={item.startTime}
                  onChange={(value) => handleUpdateStartTime(index, value)}
                  selectsStart
                  // startDate={value}
                  // endDate={endDateValue}
                  minDate={new Date()}
                  showTimeSelect
                  showTimeSelectOnly
                  dateFormat="h:mm aa"
                  // className="date-picker-event-calendar"
                  placeholderText="Start Time"
                />

                <DatePicker
                  popperPlacement="top-start"
                  selected={item.endTime}
                  onChange={(value) => handleUpdateEndTime(index, value)}
                  selectsEnd
                  // minDate={startDate}
                  // startDate={startDateValue}
                  // endDate={value}
                  showTimeSelect
                  showTimeSelectOnly
                  dateFormat="h:mm aa"
                  placeholderText="End Time"
                />
              </Flex>
            ) : (
              <Flex justify="center" className="w-full">
                <Text>Unavailable</Text>
              </Flex>
            )}

            <Flex gap="1" className="className='w-1/3' w-fit">
              {item.startTime && (
                <ActionTooltipButton
                  onClick={() => deleteday(index)}
                  tooltipContent="Unavailable all day"
                  variant="outline"
                  size="sm"
                >
                  <PiXBold className="h-[18px] w-[18px]" />
                </ActionTooltipButton>
              )}
              {!item.startTime && (
                <ActionTooltipButton
                  tooltipContent="Unavailable all day"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddDay(index)}
                >
                  <PiPlusBold className="h-[18px] w-[18px]" />
                </ActionTooltipButton>
              )}
              {item.startTime && (
                <ActionTooltipButton
                  onClick={() => handleCopyTimeToAllDays(index)}
                  tooltipContent="Copy time to all days"
                  variant="outline"
                  size="sm"
                >
                  <PiClipboardBold className="h-[18px] w-[18px]" />
                </ActionTooltipButton>
              )}
            </Flex>
          </Flex>
        ))}

        <div className="col-span-full mt-4 grid grid-cols-1 gap-2">
          <Text className="mb-2 text-sm font-semibold">Daily Break Times</Text>
          {dailyBreakFields.map((item, index) => (
            <Flex key={item.id} gap="4" align="center" className="w-full">
              <Controller
                name={`dailyBreakTimes.${index}.startTime`}
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
                name={`dailyBreakTimes.${index}.endTime`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    popperPlacement="top-start"
                    selected={value}
                    onChange={onChange}
                    startDate={watch(`dailyBreakTimes.${index}.startTime`)}
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
          className="col-span-full mt-2 @xl:w-auto dark:hover:border-gray-400"
          onClick={() =>
            appendDailyBreakField({
              startTime: startDay,
              endTime: startDay,
            })
          }
        >
          Add Daily Break Time
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
