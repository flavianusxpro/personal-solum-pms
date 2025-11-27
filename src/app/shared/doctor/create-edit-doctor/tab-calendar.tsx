'use client';

import cn from '@core/utils/class-names';
import {
  Calendar,
  dayjsLocalizer,
  NavigateAction,
  ToolbarProps,
  View,
} from 'react-big-calendar';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useModal } from '../../modal-views/use-modal';
import { useColorPresetName } from '@/layouts/settings/use-theme-color';
import { useParams } from 'next/navigation';
import ModalButton from '../../ui/modal/modal-button';
import CreateScheduleForm from '../../calendar/create-schedule-form';
import { Flex, Text } from 'rizzui';
import { DoctorSchedule, IGetDoctorByIdResponse } from '@/types/ApiResponse';
import DetailsSchedule from '../../calendar/details-schedule';
import {
  useGetListSchedule,
} from '@/hooks/useSchedule';
import { formatTime } from '@/core/utils/format-date';

const localizer = dayjsLocalizer(dayjs);

const calendarToolbarClassName =
  '[&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:flex-col [&_.rbc-toolbar]:items-center @[56rem]:[&_.rbc-toolbar]:flex-row [&_.rbc-btn-group_button:hover]:bg-gray-300 [&_.rbc-btn-group_button]:duration-200 [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900 [@media(max-width:375px)]:[&_.rbc-btn-group:last-child_button]:!px-2.5 [&_.rbc-toolbar_>_*:last-child_>_button:focus]:!bg-primary [&_.rbc-toolbar_>_*:last-child_>_button:focus]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button:focus]:!text-gray-900 [&_.rbc-toolbar_>_*:last-child_>_button:hover]:!text-gray-900 dark:[&_.rbc-toolbar_>_*:last-child_>_button:hover]:!bg-gray-300 [&_.rbc-toolbar_>_*:last-child_>_button:hover]:!bg-gray-300 [&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!bg-primary-dark [&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-900';

const rtcEventClassName =
  '[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:focus]:!text-gray-0';

export default function TabCalendar({
  className,
  isView,
  dataDoctor
}: {
  className?: string;
  isView?: boolean;
  dataDoctor?: any
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
    // enabled: process.env.NEXT_PUBLIC_CLINIC_TYPE === 'MAIN',
  });

  // const { data: dataScheduleSharingDoctor } =
  //   useGetScheduleSharingDoctorFromMainClinic({
  //     sharingDoctorId: dataDoctor?.sharing_doctor_id ?? undefined,
  //   });

  const data = useMemo(() => {
    return dataEvent;
    // if (process.env.NEXT_PUBLIC_CLINIC_TYPE === 'MAIN') {
    // } else {
    //   return dataScheduleSharingDoctor?.data ?? [];
    // }
  },
    [
      dataEvent,
      // dataScheduleSharingDoctor
    ]
  );

  // const events = useMemo(() => {
  //   if (!data) return [];
  //   return data.map((event) => ({
  //     title: event.title,
  //     id: Number(event.id),
  //     start_date: new Date(event.start_date),
  //     end_date: new Date(event.end_date),
  //     allDay: false,
  //     description: event.description,
  //     break_times: event.break_times,
  //     created_at: event.created_at,
  //     updated_at: event.updated_at,
  //     appointment: event.appointments,
  //     doctor: dataDoctor,
  //   }));
  // }, [data]);

  const events = useMemo(() => {
    if (!data) return [];

    return data.map((event) => ({
      title: event.title,
      id: Number(event.id),
      start_date: new Date(event.start_date),
      end_date: new Date(event.end_date),
      allDay: false,
      description: event.description,
      break_times: event.break_times,
      created_at: event.created_at,
      updated_at: event.updated_at,
      appointment: event.appointments?.map((appt: any) => ({
        ...appt,
        doctor: dataDoctor,
      })),
      doctor: dataDoctor,
    }));
  }, [data, dataDoctor]);

  const { views, scrollToTime, formats } = useMemo(
    () => ({
      views: {
        month: true,
        week: true,
        day: true,
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
        view: <DetailsSchedule isView={isView} doctorId={id} event={event} />,
        customSize: '900px',
      });
    },
    [id, isView, openModal]
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

  const CustomToolbar = useCallback(
    (props: ToolbarProps<DoctorSchedule, any>) => {
      const { label, views, onView, onNavigate } = props;
      return (
        <div className="rbc-toolbar flex w-full items-center justify-between">
          <div className="">
            <span className="rbc-btn-group">
              <button onClick={() => onNavigate('TODAY')} type="button">
                Today
              </button>
              <button onClick={() => onNavigate('PREV')} type="button">
                Back
              </button>
              <button onClick={() => onNavigate('NEXT')} type="button">
                Next
              </button>
            </span>
            <Text className="mt-2 text-xs text-gray-500">
              All schedules follow Australia/Sydney timezone
            </Text>
          </div>
          <div className="rbc-toolbar-label">
            <Text className="">{label}</Text>
          </div>
          <div className="rbc-btn-group">
            {(views as string[])?.map((view: string) => (
              <button
                type="button"
                className="capitalize"
                key={view}
                onClick={() => onView(view as View)}
              >
                {view}
              </button>
            ))}
          </div>
        </div>
      );
    },
    []
  );

  return (
    <div className="@container">
      <Flex className="flex w-full items-center justify-end">
        {!isView && (
          <ModalButton
            label="Create Schedule"
            view={<CreateScheduleForm doctorId={id} />}
            customSize="600px"
            className="mb-5 mt-0"
          />
        )}
      </Flex>

      <Calendar
        localizer={localizer}
        events={events}
        views={views}
        formats={formats}
        titleAccessor={(event) =>
          `${formatTime(event.start_date)} - ${formatTime(event.end_date)}`
        }
        startAccessor="start_date"
        endAccessor="end_date"
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={!isView ? handleSelectSlot : undefined}
        selectable
        scrollToTime={scrollToTime}
        className={cn(
          'h-[650px] md:h-[1000px]',
          calendarToolbarClassName, colorPresetName === 'black' && rtcEventClassName
        )}
        components={{
          toolbar: CustomToolbar,
        }}
        onNavigate={onNavigate}
      />
    </div>
  );
}
