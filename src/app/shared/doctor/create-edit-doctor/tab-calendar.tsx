'use client';

import cn from '@core/utils/class-names';
import {
  Calendar,
  dayjsLocalizer,
  NavigateAction,
  View,
} from 'react-big-calendar';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { CalendarEvent } from '@/core/types';
import { useModal } from '../../modal-views/use-modal';
import { useColorPresetName } from '@/layouts/settings/use-theme-color';
import { useParams } from 'next/navigation';
import ModalButton from '../../ui/modal-button/modal-button';
import ScheduleForm from '../../event-calendar/schedule-form';
import { Flex } from 'rizzui';
import { useGetDoctorById } from '@/hooks/useDoctor';
import { Appointmentschedule } from '@/types/ApiResponse';
import DetailsSchedule from '../../event-calendar/details-schedule';

const localizer = dayjsLocalizer(dayjs);

const calendarToolbarClassName =
  '[&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:flex-col [&_.rbc-toolbar]:items-center @[56rem]:[&_.rbc-toolbar]:flex-row [&_.rbc-btn-group_button:hover]:bg-gray-300 [&_.rbc-btn-group_button]:duration-200 [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900 [@media(max-width:375px)]:[&_.rbc-btn-group:last-child_button]:!px-2.5 [&_.rbc-toolbar_>_*:last-child_>_button:focus]:!bg-primary [&_.rbc-toolbar_>_*:last-child_>_button:focus]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button:focus]:!text-gray-900 [&_.rbc-toolbar_>_*:last-child_>_button:hover]:!text-gray-900 dark:[&_.rbc-toolbar_>_*:last-child_>_button:hover]:!bg-gray-300 [&_.rbc-toolbar_>_*:last-child_>_button:hover]:!bg-gray-300 [&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!bg-primary-dark [&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-900';

const rtcEventClassName =
  '[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:focus]:!text-gray-0';

export default function TabCalendar({
  className,
  isView,
}: {
  className?: string;
  isView?: boolean;
}) {
  const id = useParams<{ id: string }>().id;
  const { openModal } = useModal();
  const { colorPresetName } = useColorPresetName();
  const [dateRange, setDateRange] = useState({
    from: dayjs().startOf('month').toDate(),
    to: dayjs().endOf('month').toDate(),
  });

  const { data: dataDoctor } = useGetDoctorById(id);

  const schedule = useMemo(() => {
    try {
      return dataDoctor?.setting?.schedule
        ? (JSON.parse(dataDoctor.setting.schedule) as Appointmentschedule)
        : undefined;
    } catch (error) {
      return undefined;
    }
  }, [dataDoctor?.setting?.schedule]);

  const calendarEvent: CalendarEvent[] = useMemo(() => {
    if (!schedule) return [];

    const events: CalendarEvent[] = [];
    const startOfRange = dayjs(dateRange.from);
    const endOfRange = dayjs(dateRange.to);

    for (const scheduleItem of schedule?.week || []) {
      let currentDate = startOfRange.clone();

      while (currentDate.isBefore(endOfRange, 'day')) {
        if (currentDate.day() === scheduleItem.day) {
          const startTime = currentDate
            .set('hour', parseInt(scheduleItem.startTime.split(':')[0], 10))
            .set('minute', parseInt(scheduleItem.startTime.split(':')[1], 10))
            .toDate();

          const endTime = currentDate
            .set('hour', parseInt(scheduleItem.endTime.split(':')[0], 10))
            .set('minute', parseInt(scheduleItem.endTime.split(':')[1], 10))
            .toDate();

          events.push({
            id: `${scheduleItem.day}-${currentDate.toISOString()}`,
            title: `Schedule for Day ${scheduleItem.day}`,
            start: startTime,
            end: endTime,
            allDay: false,
            description: '',
            doctor: id,
          });
        }

        currentDate = currentDate.add(1, 'day');
      }
    }

    return events;
  }, [id, schedule, dateRange]);

  const { views, scrollToTime, formats } = useMemo(
    () => ({
      views: {
        month: true,
        week: true,
        day: true,
        agenda: true,
      },
      scrollToTime: new Date(),
      formats: {
        dateFormat: 'D',
        weekdayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'ddd', culture),
        dayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'ddd M/D', culture),
        timeGutterFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'hh A', culture),
      },
    }),
    []
  );

  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => {
      openModal({
        view: <DetailsSchedule schedule={schedule} event={event} />,
        customSize: '500px',
      });
    },
    [openModal]
  );

  const onNavigate = useCallback(
    (newDate: Date, view: View, action: NavigateAction) => {
      const fromDate = dayjs(newDate).startOf('month').toDate();
      const toDate = dayjs(newDate).endOf('month').toDate();
      setDateRange({
        from: fromDate,
        to: toDate,
      });
    },
    []
  );

  return (
    <div className="@container">
      <Flex className="flex w-full items-center justify-end">
        <ModalButton
          label="Create Schedule"
          view={<ScheduleForm doctorId={id} />}
          customSize="600px"
          className="mb-5 mt-0"
        />
      </Flex>
      <Calendar
        localizer={localizer}
        events={calendarEvent}
        views={views}
        formats={formats}
        startAccessor="start"
        endAccessor="end"
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={handleSelectEvent}
        selectable
        scrollToTime={scrollToTime}
        className={cn(
          'h-[650px] md:h-[1000px]',
          calendarToolbarClassName,
          colorPresetName === 'black' && rtcEventClassName
        )}
        onNavigate={onNavigate}
      />
    </div>
  );
}
