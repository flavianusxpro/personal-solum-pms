'use client';

import cn from '@core/utils/class-names';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { CalendarEvent } from '@/core/types';
import { useModal } from '../../modal-views/use-modal';
import DetailsEvents from '../../event-calendar/details-event';
import EventForm from '../../event-calendar/event-form';
import { useColorPresetName } from '@/layouts/settings/use-theme-color';
import { useGetListSchedule } from '@/hooks/useSchedule';
import { useParams } from 'next/navigation';
import ModalButton from '../../ui/modal-button/modal-button';
import ScheduleForm from '../../event-calendar/schedule-form';
import { Flex } from 'rizzui';

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

  const { data: dataSchedule } = useGetListSchedule({
    doctorId: id,
    page: 1,
    perPage: 100,
  });

  const events: CalendarEvent[] = useMemo(() => {
    if (!dataSchedule) return [];
    return dataSchedule.map((schedule) => ({
      id: schedule.id.toString(),
      title: schedule.title,
      start: new Date(schedule.start_date),
      end: new Date(schedule.end_date),
      allDay: false,
      description: schedule.description,
      doctor: schedule.doctorId.toString(),
    }));
  }, [dataSchedule]);

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
        view: <DetailsEvents event={event} />,
        customSize: '500px',
      });
    },
    [openModal]
  );

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      openModal({
        view: <EventForm doctorId={id} startDate={start} endDate={end} />,
        customSize: '650px',
      });
    },
    [id, openModal]
  );

  return (
    <div className="@container">
      <Flex className="flex w-full items-center justify-end">
        <ModalButton
          label="Create Schedule"
          view={<ScheduleForm />}
          customSize="600px"
          className="mb-5 mt-0"
        />
      </Flex>
      <Calendar
        localizer={localizer}
        events={events}
        views={views}
        formats={formats}
        startAccessor="start"
        endAccessor="end"
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        className={cn(
          'h-[650px] md:h-[1000px]',
          calendarToolbarClassName,
          colorPresetName === 'black' && rtcEventClassName
        )}
      />
    </div>
  );
}
