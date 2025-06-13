'use client';

import cn from '@core/utils/class-names';
import {
  Calendar,
  dayjsLocalizer,
  NavigateAction,
  View,
} from 'react-big-calendar';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useModal } from '../../modal-views/use-modal';
import { useColorPresetName } from '@/layouts/settings/use-theme-color';
import { useParams } from 'next/navigation';
import ModalButton from '../../ui/modal/modal-button';
import CreateScheduleForm from '../../calendar/create-schedule-form';
import { Flex, Loader } from 'rizzui';
import { DoctorSchedule } from '@/types/ApiResponse';
import DetailsSchedule from '../../calendar/details-schedule';
import { useGetListSchedule } from '@/hooks/useSchedule';

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

  const { data: dataEvent } = useGetListSchedule({
    doctorId: id,
    page: 1,
    perPage: 100,
  });

  const events = useMemo(() => {
    if (!dataEvent) return [];
    return dataEvent.map((event) => ({
      title: event.title,
      id: Number(event.id),
      start_date: new Date(event.start_date),
      end_date: new Date(event.end_date),
      allDay: false,
      description: event.description,
      break_times: event.break_times,
      created_at: event.created_at,
      updated_at: event.updated_at,
    }));
  }, [dataEvent]);

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
    (event: DoctorSchedule) => {
      openModal({
        view: <DetailsSchedule doctorId={id} event={event} />,
        customSize: '500px',
      });
    },
    [id, openModal]
  );

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      openModal({
        view: <CreateScheduleForm doctorId={id} start={start} end={end} />,
        customSize: '650px',
      });
    },
    [id, openModal]
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
          view={<CreateScheduleForm doctorId={id} />}
          customSize="600px"
          className="mb-5 mt-0"
        />
      </Flex>

      <Calendar
        localizer={localizer}
        events={events}
        views={views}
        formats={formats}
        startAccessor="start_date"
        endAccessor="end_date"
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
        onNavigate={onNavigate}
      />
    </div>
  );
}
