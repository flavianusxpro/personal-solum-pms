'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CalendarEvent } from '@/types';
import dayjs from 'dayjs';
import {
  Calendar,
  dayjsLocalizer,
  NavigateAction,
  View,
} from 'react-big-calendar';
import DetailsEvents from '@/app/shared/calendar/details-event';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@core/utils/class-names';
import CSelect from '../ui/select';
import { useGetAllDoctors } from '@/hooks/useDoctor';
import { useGetAppointments } from '@/hooks/useAppointment';
import CreateUpdateAppointmentForm from '../appointment/modal/appointment-form';
import { PiInfo } from 'react-icons/pi';
import ActionTooltipButton from '../ui/action-button';
import { Text } from 'rizzui';
import dynamic from 'next/dynamic';

const localizer = dayjsLocalizer(dayjs);
const MultiSelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  { ssr: false }
);

const rtcEventClassName =
  '[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:focus]:!text-gray-0';

export default function EventCalendarView() {
  const { openModal, isOpen } = useModal();

  const [selectDoctor, setSelectDoctor] = useState<string[]>();
  const [view, setView] = useState<View>('month');

  const isAgendaView = useMemo(() => {
    return view === 'agenda';
  }, [view]);

  const { data: dataDoctor } = useGetAllDoctors({
    page: 1,
    perPage: 100,
  });

  const { data: dataAppointment, refetch } = useGetAppointments({
    page: 1,
    perPage: 100,
    q: JSON.stringify({
      doctor_ids: selectDoctor,
    }),
  });

  const events: CalendarEvent[] = useMemo(() => {
    if (!dataAppointment) return [];

    return dataAppointment.data.map((appointment) => {
      const type = appointment?.type as string;

      let bgColor = '';
      switch (type) {
        case 'INITIAL':
          bgColor = 'bg-green-600';
          break;
        case 'FOLLOWUP':
          bgColor = 'bg-blue-600';
          break;
        case 'SCRIPT_RENEWAL':
          bgColor = 'bg-yellow-600';
          break;
        default:
          bgColor = 'bg-pink-600';
          break;
      }

      return {
        title:
          appointment?.patient?.first_name +
          ' ' +
          appointment?.patient?.last_name,
        id: appointment.id.toString(),
        start: new Date(appointment.date),
        end: new Date(appointment.date),
        allDay: false,
        patient:
          appointment?.patient?.first_name +
          ' ' +
          appointment?.patient?.last_name,
        description: appointment.note || '-',
        doctor:
          appointment.doctor.first_name + ' ' + appointment.doctor.last_name,
        data: appointment,
        color: bgColor,
      };
    });
  }, [dataAppointment]);

  const doctorOptions = useMemo(() => {
    if (!dataDoctor) return [];
    return dataDoctor.data.map((doctor) => ({
      label: doctor.first_name + ' ' + doctor.last_name,
      value: doctor.id.toString(),
    }));
  }, [dataDoctor]);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      openModal({
        view: <CreateUpdateAppointmentForm />,
        customSize: '650px',
      });
    },
    [openModal]
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

  const onNavigate = useCallback(
    (newDate: Date, view: View, action: NavigateAction) => {
      const fromDate = dayjs(newDate).startOf('month').toDate();
      const toDate = dayjs(newDate).endOf('month').toDate();
    },
    []
  );

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

  const eventComponent = useCallback(({ event, style, className }: any) => {
    const type = event?.data?.type as string;

    let bgColor = '';
    switch (type) {
      case 'INITIAL':
        bgColor = 'bg-green-600';
        break;
      case 'FOLLOWUP':
        bgColor = 'bg-blue-600';
        break;
      case 'SCRIPT_RENEWAL':
        bgColor = 'bg-yellow-600';
        break;
      default:
        bgColor = 'bg-pink-600';
        break;
    }

    return (
      <div
        className={cn('w-full rounded-md border px-1', bgColor, className)}
        style={style}
      >
        <Text className="overflow-hidden text-ellipsis text-sm text-white">
          {event.title ?? '-'}
        </Text>
      </div>
    );
  }, []);

  useEffect(() => {
    if (selectDoctor || selectDoctor === undefined) {
      refetch();
    }
  }, [selectDoctor, refetch, isOpen]);

  return (
    <div className="@container">
      <div className="mb-4 flex w-1/4 items-center gap-4">
        <MultiSelect
          searchable
          label="Select Doctor"
          options={doctorOptions}
          value={selectDoctor}
          placeholder="All Doctors"
          onClear={() => setSelectDoctor(undefined)}
          onChange={(e: string[]) => setSelectDoctor(e)}
        />
        <ActionTooltipButton
          tooltipContent={`
            🟢: Initial,
            🔵: Follow Up,
            🟡: Script Renewal,
            👛: Reschedule,
            `}
          variant="text"
        >
          <PiInfo className="mt-8 h-8 w-8 text-gray-500" />
        </ActionTooltipButton>
      </div>

      <Calendar
        components={{
          //   month: { event: eventComponent },
          //   week: { event: eventComponent },
          //   day: { event: eventComponent },
          agenda: { event: eventComponent },
        }}
        timeslots={4}
        titleAccessor={'title'}
        step={15}
        localizer={localizer}
        events={events}
        eventPropGetter={(event) => ({
          className: cn('text-sm', !isAgendaView && event.color),
          style: {
            color: isAgendaView ? 'black' : 'white',
            borderRadius: '5px',
            display: 'block',
          },
        })}
        views={views}
        onView={(view: View) => {
          setView(view);
        }}
        formats={formats}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        className={cn(
          'h-[650px] md:h-[1000px]'
          // calendarToolbarClassName,
          // colorPresetName === 'black' && rtcEventClassName
        )}
        onNavigate={onNavigate}
      />
    </div>
  );
}
