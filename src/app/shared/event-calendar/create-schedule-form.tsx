'use client';

import { PiClipboardBold, PiCoffee, PiPlusBold, PiXBold } from 'react-icons/pi';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { ActionIcon, Button, Flex, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import { CalendarEvent } from '@/types';
import { useGetListSchedule, usePostCreateSchedule } from '@/hooks/useSchedule';
import dayjs from 'dayjs';
import CSelect from '../ui/select';
import { DatePicker } from '@/core/ui/datepicker';
import ActionTooltipButton from '../ui/action-tooltip-button';
import { weekIntervalOption } from '@/config/constants';

import { IPayloadPostCreateSchedule } from '@/types/paramTypes';
import { useEffect, useMemo, useState } from 'react';
import { DoctorScheduleFormType } from '@/validators/create-doctor-schedule.schema';

interface CreateEventProps {
  startDate?: Date;
  endDate?: Date;
  event?: CalendarEvent;
  doctorId?: string;
}

interface CreateScheduleProps {
  isEdit?: boolean;
  doctorId: string;
  start?: Date;
}

export default function CreateScheduleForm({
  doctorId,
  isEdit,
  start,
}: CreateScheduleProps) {
  const { closeModal } = useModal();
  const startDay = dayjs(start).hour(9).minute(0).toDate();
  const endDay = dayjs(start).hour(17).minute(0).toDate();

  const weekInitialValue = [
    {
      label: 'Monday',
      day: 1,
      start_date: startDay,
      end_date: endDay,
    },
    {
      label: 'Tuesday',
      day: 2,
      start_date: startDay,
      end_date: endDay,
    },
    {
      label: 'Wednesday',
      day: 3,
      start_date: startDay,
      end_date: endDay,
    },
    {
      label: 'Thursday',
      day: 4,
      start_date: startDay,
      end_date: endDay,
    },
    {
      label: 'Friday',
      day: 5,
      start_date: startDay,
      end_date: endDay,
    },
    {
      label: 'Saturday',
      day: 6,
    },
    {
      label: 'Sunday',
      day: 7,
    },
  ];

  const { mutate, isPending } = usePostCreateSchedule();
  const { refetch } = useGetListSchedule({
    doctorId,
    page: 1,
    perPage: 100,
  });

  const [selectedDays, setSelectedDays] = useState<{
    label: string;
    day: number;
  }>({
    label: '',
    day: 0,
  });

  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<DoctorScheduleFormType>({
    defaultValues: {
      interval: 'one-week',
      dates: weekInitialValue,
    },
  });

  const {
    fields: weekFields,
    update: updateWeekField,
    replace: replaceWeekField,
  } = useFieldArray({
    control,
    name: 'dates',
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

  const onSubmit: SubmitHandler<DoctorScheduleFormType> = (data) => {
    const interval = data.interval; // one-week, two-weeks, three-weeks, four-weeks, custom
    const intervalMapping: Record<string, number> = {
      'one-week': 1,
      'two-weeks': 2,
      'three-weeks': 3,
      'four-weeks': 4,
    };

    const weeksToRepeat = intervalMapping[interval] || 1; // Default to 1 week if custom or undefined

    function dateRange() {
      const startDate = dayjs(data.dates[0].start_date);
      let endDate: dayjs.Dayjs;

      if (interval === 'one-week') {
        endDate = startDate.add(1, 'week');
      } else if (interval === 'two-weeks') {
        endDate = startDate.add(2, 'week');
      } else if (interval === 'three-weeks') {
        endDate = startDate.add(3, 'week');
      } else if (interval === 'four-weeks') {
        endDate = startDate.add(4, 'week');
      } else {
        endDate = startDate.add(weeksToRepeat, 'week');
      }

      return {
        start_range: startDate.format('YYYY-MM-DD'),
        end_range: endDate.format('YYYY-MM-DD'),
      };
    }

    const { start_range, end_range } = dateRange();

    const payloadDates: {
      start_date: string;
      end_date: string;
      break_times: { start_date: string; end_date: string }[];
    }[] = [];

    // Filter template dates with valid start_date
    const validTemplateDates = data.dates.filter((d) => !!d.start_date);

    // Start iterating through the date range
    let current = dayjs(start_range).clone();

    while (current.isBefore(end_range) || current.isSame(end_range, 'day')) {
      const adjustedDay = current.day() === 0 ? 7 : current.day(); // Convert Sunday (0) to 7

      validTemplateDates.forEach((templateDate) => {
        if (templateDate.day === adjustedDay) {
          const baseStartTime = dayjs(templateDate.start_date);
          const baseEndTime = dayjs(templateDate.end_date);

          const startDate = current
            .hour(baseStartTime.hour())
            .minute(baseStartTime.minute())
            .format('YYYY-MM-DD HH:mm');

          const endDate = current
            .hour(baseEndTime.hour())
            .minute(baseEndTime.minute())
            .format('YYYY-MM-DD HH:mm');

          const breakTimes = (data.dailyBreakTimes ?? [])
            .filter((bt) => bt.day === adjustedDay)
            .map((bt) => {
              const baseBreakStart = dayjs(bt.start_date);
              const baseBreakEnd = dayjs(bt.end_date);

              return {
                start_date: current
                  .hour(baseBreakStart.hour())
                  .minute(baseBreakStart.minute())
                  .format('YYYY-MM-DD HH:mm'),
                end_date: current
                  .hour(baseBreakEnd.hour())
                  .minute(baseBreakEnd.minute())
                  .format('YYYY-MM-DD HH:mm'),
              };
            });

          payloadDates.push({
            start_date: startDate,
            end_date: endDate,
            break_times: breakTimes,
          });
        }
      });

      current = current.add(1, 'day');
    }

    const payloadSettingAppointment: IPayloadPostCreateSchedule = {
      doctorId: Number(doctorId),
      description: data.description || '',
      dates: payloadDates,
    };

    mutate(payloadSettingAppointment, {
      onSuccess: () => {
        refetch();
        toast.success('Schedule created successfully');
        closeModal();
      },
      onError: (error: any) => {
        toast.error(
          'Failed to create Schedule: ' + error.response.data.message
        );
      },
    });
  };

  const deleteday = (index: number) => {
    updateWeekField(index, {
      ...weekFields[index],
      start_date: undefined,
      end_date: undefined,
    });
  };

  const handleCopyTimeToAllDays = (index: number) => {
    const startTime = weekFields[index].start_date;
    const endTime = weekFields[index].end_date;
    if (!startTime || !endTime) return;
    const newFields = weekFields.map((item, i) => {
      if (i === index || !item.start_date) return item;
      return {
        ...item,
        start_date: startTime,
        end_date: endTime,
      };
    });
    replaceWeekField(newFields);
  };

  const handleAddDay = (index: number) => {
    updateWeekField(index, {
      ...weekFields[index],
      start_date: startDay,
      end_date: endDay,
    });
  };

  const handleUpdateStartTime = (index: number, value: Date | null) => {
    if (!value) return;
    updateWeekField(index, {
      ...weekFields[index],
      start_date: value,
    });
  };

  const handleUpdateEndTime = (index: number, value: Date | null) => {
    if (!value) return;
    updateWeekField(index, {
      ...weekFields[index],
      end_date: value,
    });
  };

  function handleSelectBreakTimeDay(
    label: string,
    day: number,
    value: Date | undefined,
    index: number
  ) {
    updateDailyBreakField(index, {
      ...dailyBreakFields[index],
      start_date: value,
      end_date: value,
      label: label,
      day: day,
    });
  }

  function onChangeBreakTime(id: string, value: Date | null) {
    const findIndex = dailyBreakFields.findIndex((item) => item.id === id);
    if (findIndex === -1) return;
    updateDailyBreakField(findIndex, {
      ...dailyBreakFields[findIndex],
      start_date: value as Date,
      end_date: value as Date,
    });
  }

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          {isEdit ? 'Update Schedule' : 'Create a New Schedule'}
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
          <>
            <Flex key={index} align="center" gap="2">
              <Flex className="w-1/3">
                <Text className="font-medium">{item.label}</Text>
              </Flex>
              {item.end_date && item.start_date ? (
                <Flex className="w-full">
                  <DatePicker
                    popperPlacement="top-start"
                    selected={item.start_date}
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
                    selected={item.end_date}
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
                {item.start_date && (
                  <ActionTooltipButton
                    onClick={() => deleteday(index)}
                    tooltipContent="Unavailable all day"
                    variant="outline"
                    buttonSize="sm"
                  >
                    <PiXBold className="h-[18px] w-[18px]" />
                  </ActionTooltipButton>
                )}
                {!item.start_date && (
                  <ActionTooltipButton
                    tooltipContent="Unavailable all day"
                    variant="outline"
                    buttonSize="sm"
                    onClick={() => handleAddDay(index)}
                  >
                    <PiPlusBold className="h-[18px] w-[18px]" />
                  </ActionTooltipButton>
                )}
                {item.start_date && (
                  <ActionTooltipButton
                    onClick={() => handleCopyTimeToAllDays(index)}
                    tooltipContent="Copy time to all days"
                    variant="outline"
                    buttonSize="sm"
                  >
                    <PiClipboardBold className="h-[18px] w-[18px]" />
                  </ActionTooltipButton>
                )}
                {item.start_date && (
                  <ActionTooltipButton
                    onClick={() =>
                      handleSelectBreakTimeDay(
                        item.label,
                        item.day,
                        item.start_date,
                        index
                      )
                    }
                    tooltipContent="Add Break Time"
                    variant="outline"
                    buttonSize="sm"
                  >
                    <PiCoffee className="h-[18px] w-[18px]" />
                  </ActionTooltipButton>
                )}
              </Flex>
            </Flex>

            {dailyBreakFields.some(
              (dailyBreak) => dailyBreak.day === item.day
            ) && (
              <>
                <div className="col-span-full grid grid-cols-1 gap-2">
                  <Text className="text-sm font-semibold">Break Times</Text>

                  {dailyBreakFields
                    ?.filter((dailyBreak) => dailyBreak.day === item.day)
                    .map((data) => (
                      <Flex
                        key={data.id}
                        gap="4"
                        align="center"
                        className="w-full"
                      >
                        <Controller
                          name={`dailyBreakTimes.${index}.start_date`}
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <DatePicker
                              popperPlacement="top-start"
                              selected={value}
                              onChange={(value) =>
                                onChangeBreakTime(data.id, value)
                              }
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
                              startDate={watch(
                                `dailyBreakTimes.${index}.end_date`
                              )}
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

                {item?.label && (
                  <Button
                    type="button"
                    variant="outline"
                    className="col-span-full @xl:w-auto dark:hover:border-gray-400"
                    onClick={() =>
                      appendDailyBreakField({
                        start_date: item.start_date,
                        end_date: item.end_date,
                        label: item?.label,
                        day: item?.day,
                      })
                    }
                  >
                    Add Break Time
                  </Button>
                )}
              </>
            )}
          </>
        ))}

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
            isLoading={isPending}
            className="hover:gray-700 w-full @xl:w-auto"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
