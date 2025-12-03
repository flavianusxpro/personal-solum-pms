import React, { useCallback, useMemo } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ControlledTable from '@/app/shared/ui/controlled-table';
import { getColumns } from './weeklyColumns';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import dayjs from 'dayjs';

interface PropTypes {
  data: any
  handleDrop: (appointment: any, newDoctor: string, newTime: string) => void
  weekDates: string[]
}

const WeeklyTable = (props: PropTypes) => {
  const {
    data,
    handleDrop,
    weekDates
  } = props

  const { openModal, closeModal } = useModal();
  const columns = React.useMemo(
    () =>
      getColumns({
        openModal,
        handleDrop,
        closeModal,
        weekDates
      }),
    [openModal, handleDrop, closeModal, weekDates]
  );

  const getTimeSlots = () => {
    const slots = [];
    const startHour = 0;
    const endHour = 23;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeStr);
      }
    }

    return slots;
  };

  const formatAppointments = useCallback(
    (data: IGetAppointmentListResponse['data'], weekDates: string[]) => {
      const timeSlots = getTimeSlots();

      const appointmentsByDateTime: Record<string, Record<string, any>> = {};

      weekDates.forEach(date => {
        appointmentsByDateTime[date] = {};
      });

      data.forEach((item) => {
        let appointmentDate: string;
        const dateMatch = item.date.match(/^(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
          appointmentDate = dateMatch[1];
        } else {
          appointmentDate = dayjs(item.date).format('YYYY-MM-DD');
        }

        let timeStr: string;
        const timeMatch = item.date.match(/T(\d{2}):(\d{2}):(\d{2})/);
        if (timeMatch) {
          const hour = timeMatch[1];
          const minute = timeMatch[2];
          timeStr = `${hour}:${minute}`;
        } else {
          if (item.local_date) {
            const localTimeMatch = item.local_date.match(
              /(\d{1,2}):(\d{2})\s*(AM|PM)/
            );
            if (localTimeMatch) {
              let hour = parseInt(localTimeMatch[1]);
              const minute = localTimeMatch[2];
              const period = localTimeMatch[3];

              if (period === 'PM' && hour !== 12) {
                hour += 12;
              } else if (period === 'AM' && hour === 12) {
                hour = 0;
              }

              timeStr = `${hour.toString().padStart(2, '0')}:${minute}`;
            } else {
              const localDate = new Date(item.local_date);
              timeStr = localDate.toTimeString().slice(0, 5);
            }
          } else {
            const appointmentTime = dayjs.utc(item.date);
            timeStr = appointmentTime.format('HH:mm');
          }
        }

        if (appointmentsByDateTime[appointmentDate]) {
          if (!appointmentsByDateTime[appointmentDate][timeStr]) {
            appointmentsByDateTime[appointmentDate][timeStr] = [];
          }
          appointmentsByDateTime[appointmentDate][timeStr].push(item);
        }
      });

      const result = timeSlots.map((time) => {
        const row: Record<string, any> = { time };

        weekDates.forEach(date => {
          const dayKey = dayjs(date).format('ddd').toUpperCase(); // MON, TUE, etc.
          row[dayKey] = appointmentsByDateTime[date][time] || [];
        });

        return row;
      });

      return result;
    },
    []
  );

  const tableData = useMemo(() => {
    return formatAppointments(data ?? [], weekDates);
  }, [data, weekDates, formatAppointments]);

  return (
    <DndProvider backend={HTML5Backend}>
      <ControlledTable
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={columns}
        variant="bordered"
      />
    </DndProvider>
  )
}

export default WeeklyTable