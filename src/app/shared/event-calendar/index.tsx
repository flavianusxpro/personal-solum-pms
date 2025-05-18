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
import DetailsEvents from '@/app/shared/event-calendar/details-event';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@core/utils/class-names';
import { useColorPresetName } from '@/layouts/settings/use-theme-color';
import CSelect from '../ui/select';
import { useGetAllDoctors } from '@/hooks/useDoctor';
import { useGetAppointments } from '@/hooks/useAppointment';
import CreateUpdateAppointmentForm from '../appointment/modal/appointment-form';
import { PiInfo } from 'react-icons/pi';
import ActionTooltipButton from '../ui/action-button';
import { Text } from 'rizzui';

const localizer = dayjsLocalizer(dayjs);

const rtcEventClassName =
  '[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:focus]:!text-gray-0';

export default function EventCalendarView() {
  const { openModal } = useModal();
  const { colorPresetName } = useColorPresetName();

  const [selectDoctor, setSelectDoctor] = useState<number | null>(null);

  const { data: dataDoctor } = useGetAllDoctors({
    page: 1,
    perPage: 100,
  });

  const { data: dataAppointment, refetch } = useGetAppointments({
    page: 1,
    perPage: 100,
    doctorId: selectDoctor as number,
  });

  const events: CalendarEvent[] = useMemo(() => {
    if (!dataAppointment) return [];
    return dataAppointment.data.map((appointment) => ({
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
    }));
  }, [dataAppointment]);

  const doctorOptions = useMemo(() => {
    if (!dataDoctor) return [];
    return dataDoctor.data.map((doctor) => ({
      label: doctor.first_name + ' ' + doctor.last_name,
      value: doctor.id,
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

  useEffect(() => {
    if (selectDoctor || selectDoctor === null) {
      refetch();
    }
  }, [selectDoctor, refetch]);

  function getRowAppointment(value: string, type: string) {
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
      <div className={cn('w-full rounded-md border px-1', bgColor)}>
        <Text className="text-sm text-white">{value ?? '-'}</Text>
      </div>
    );
  }

  return (
    <div className="@container">
      <div className="mb-4 flex w-1/4 items-center gap-4">
        <CSelect
          searchable
          label="Select Doctor"
          options={doctorOptions}
          value={selectDoctor}
          clearable
          placeholder="All Doctors"
          onClear={() => setSelectDoctor(null)}
          onChange={(e: number) => setSelectDoctor(e)}
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
          eventWrapper: ({ event }) =>
            getRowAppointment(event.title, event?.data?.type as string),
        }}
        timeslots={4}
        step={15}
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
          // calendarToolbarClassName,
          colorPresetName === 'black' && rtcEventClassName
        )}
        onNavigate={onNavigate}
      />
    </div>
  );
}
