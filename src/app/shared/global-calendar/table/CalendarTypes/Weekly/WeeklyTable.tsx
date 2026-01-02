import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ControlledTable from '@/app/shared/ui/controlled-table';
import { getColumns } from './weeklyColumns';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import dayjs from '@/config/dayjs';
import { PiUser } from 'react-icons/pi';
// import { Loader } from 'rizzui';
// import { LuCalendarX2 } from 'react-icons/lu';

interface PropTypes {
  data: any
  handleDrop: (appointment: any, newDoctor: string, newTime: string) => void
  weekDates: string[]
  isLoadingGetAppointments: boolean;
  events: any;
  selectedDoctor?: string[];
  doctorSchedule?: any;
  refetch: () => void; 
}

const WeeklyTable = (props: PropTypes) => {
  const {
    data,
    handleDrop,
    weekDates,
    // isLoadingGetAppointments,
    // events,
    selectedDoctor,
    doctorSchedule,
    refetch,
  } = props

  const { openModal, closeModal } = useModal();

  const isWithinSchedule = useCallback((date: string, time: string) => {
    if (!doctorSchedule?.nearest_doctor_schedule?.start_date ||
      !doctorSchedule?.nearest_doctor_schedule?.end_date) {
      return false;
    }

    const scheduleStart = dayjs(
      doctorSchedule.nearest_doctor_schedule.start_date,
      'YYYY-MM-DD hh:mm A'
    );
    const scheduleEnd = dayjs(
      doctorSchedule.nearest_doctor_schedule.end_date,
      'YYYY-MM-DD hh:mm A'
    );
    const now = dayjs();

    if (scheduleEnd.isBefore(now)) {
      return false;
    }

    const [hour, minute] = time.split(':').map(Number);
    const slotDateTime = dayjs(date).hour(hour).minute(minute);

    const isInRange = slotDateTime.isSameOrAfter(scheduleStart) &&
      slotDateTime.isSameOrBefore(scheduleEnd);

    return isInRange;
  }, [doctorSchedule]);

  const columns = React.useMemo(
    () =>
      getColumns({
        openModal,
        handleDrop,
        closeModal,
        weekDates,
        isWithinSchedule,
        doctorSchedule,
        refetch,
      }),
    [
      openModal, 
      handleDrop, 
      closeModal, 
      weekDates, 
      isWithinSchedule, 
      doctorSchedule, 
      refetch
    ]
  );

  const formatAppointments = useCallback(
    (data: IGetAppointmentListResponse['data'], weekDates: string[]) => {
      const appointmentsByDateTime: Record<string, Record<string, any[]>> = {};

      weekDates.forEach(date => {
        appointmentsByDateTime[date] = {};
      });

      const roundToNearest10Min = (hour: number, minute: number): string => {
        const roundedMinute = Math.floor(minute / 10) * 10;
        return `${hour.toString().padStart(2, '0')}:${roundedMinute.toString().padStart(2, '0')}`;
      };

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
          const hour = parseInt(timeMatch[1]);
          const minute = parseInt(timeMatch[2]);

          timeStr = roundToNearest10Min(hour, minute);
        } else {
          if (item.local_date) {
            const localTimeMatch = item.local_date.match(
              /(\d{1,2}):(\d{2})\s*(AM|PM)/
            );
            if (localTimeMatch) {
              let hour = parseInt(localTimeMatch[1]);
              const minute = parseInt(localTimeMatch[2]);
              const period = localTimeMatch[3];

              if (period === 'PM' && hour !== 12) {
                hour += 12;
              } else if (period === 'AM' && hour === 12) {
                hour = 0;
              }

              timeStr = roundToNearest10Min(hour, minute);
            } else {
              const localDate = new Date(item.local_date);
              const hour = localDate.getHours();
              const minute = localDate.getMinutes();
              timeStr = roundToNearest10Min(hour, minute);
            }
          } else {
            const appointmentTime = dayjs.utc(item.date);
            const hour = appointmentTime.hour();
            const minute = appointmentTime.minute();
            timeStr = roundToNearest10Min(hour, minute);
          }
        }

        if (appointmentsByDateTime[appointmentDate]) {
          if (!appointmentsByDateTime[appointmentDate][timeStr]) {
            appointmentsByDateTime[appointmentDate][timeStr] = [];
          }
          appointmentsByDateTime[appointmentDate][timeStr].push(item);
        }
      });

      const standardSlots = [];
      const startHour = 0;
      const endHour = 23;

      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 10) {
          const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          standardSlots.push(timeStr);
        }
      }

      const result = standardSlots.map((time) => {
        const row: Record<string, any> = { time };

        weekDates.forEach(date => {
          const dayKey = dayjs(date).format('ddd').toUpperCase();
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

  // const hasAppointments = useMemo(() => {
  //   return tableData.some(row => {
  //     return weekDates.some(date => {
  //       const dayKey = dayjs(date).format('ddd').toUpperCase();
  //       return row[dayKey] && Array.isArray(row[dayKey]) && row[dayKey].length > 0;
  //     });
  //   });
  // }, [tableData, weekDates]);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);
  const prevWeekDatesRef = useRef<string>('');

  useEffect(() => {
    const currentWeekDatesStr = weekDates.join(',');
    // const selectedDoctorStr = selectedDoctor?.join(',');

    if (prevWeekDatesRef.current !== currentWeekDatesStr) {
      hasScrolledRef.current = false;
      prevWeekDatesRef.current = currentWeekDatesStr;
    }
  }, [weekDates, selectedDoctor]);

  useEffect(() => {
    if (tableData.length > 0 && tableContainerRef.current && !hasScrolledRef.current) {
      const firstAppointmentIndex = tableData.findIndex(row => {
        return weekDates.some(date => {
          const dayKey = dayjs(date).format('ddd').toUpperCase();
          return row[dayKey] && row[dayKey].length > 0;
        });
      });

      if (firstAppointmentIndex !== -1) {
        setTimeout(() => {
          const scrollBody = tableContainerRef.current?.querySelector('.rc-table-body');

          if (scrollBody) {
            const rows = scrollBody.querySelectorAll('tr');
            const targetRow = rows[firstAppointmentIndex];

            if (targetRow) {
              const rowOffsetTop = targetRow.offsetTop;

              scrollBody.scrollTo({
                top: rowOffsetTop,
                behavior: 'smooth'
              });

              hasScrolledRef.current = true;
            }
          }
        }, 100);
      }
    }
  }, [tableData, weekDates, selectedDoctor]);

  // if (!selectedDoctor || selectedDoctor.length === 0) {
  //   return (
  //     <div className="flex items-center justify-center h-[50vh]">
  //       <div className="text-center">
  //         <PiUser className="mx-auto text-6xl text-gray-300 mb-4" />
  //         <p className="text-gray-500 text-lg">Please select a doctor to view appointments</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div ref={tableContainerRef}>
      <DndProvider backend={HTML5Backend}>
        {/* {isLoadingGetAppointments ? (
            <div className="flex h-[500px] items-center justify-center">
              <Loader />
            </div>
          ) : !hasAppointments ? (
            <div className="flex h-[500px] flex-col items-center justify-center rounded-lg">
              <LuCalendarX2 className="mb-4 text-6xl text-[#A6A6A6]" />
              <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
                <h1 className="text-2xl font-semibold">
                  No Scheduled Appointments
                </h1>
                <p className="max-w-md text-lg text-[#787878]">
                  There are no appointments this week. View your daily or
                  monthly calendar to check other schedules.
                </p>
              </div>
            </div>
          ) : (
            <ControlledTable
              showLoadingText={true}
              data={tableData}
              // @ts-ignore
              columns={columns}
              variant="bordered"
              className="[&_td.rc-table-cell]:h-[5px] [&_td.rc-table-cell]:max-h-[5px] [&_td.rc-table-cell]:overflow-hidden [&_td.rc-table-cell]:p-0"
              scroll={{ y: 580 }}
            />
          )} */}
        <ControlledTable
          showLoadingText={true}
          data={tableData}
          // @ts-ignore
          columns={columns}
          variant="bordered"
          scroll={{ y: 'calc(100vh - 250px)' }}
          className="
    [&_td.rc-table-cell]:overflow-hidden 
    [&_td.rc-table-cell]:p-0 
    [&_td.rc-table-cell]:align-middle 
    [&_td.rc-table-cell]:leading-none 
    [&_.rc-table-body]:scrollbar-hide 
    [&_.rc-table-body]:overflow-y-scroll
    [&_.rc-table-header]:overflow-hidden
    [&_table]:!rounded-none
    [&_th]:!rounded-none
    [&_td]:!rounded-none
  "
        />
      </DndProvider>
    </div>
  )
}

export default WeeklyTable