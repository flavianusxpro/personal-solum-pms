'use client';

import ControlledTable from '@/app/shared/ui/controlled-table/index';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getColumns } from './columns';
import { useModal } from '../../modal-views/use-modal';
import {
  useGetAppointments,
  usePostRescheduleAppointmentByDate,
} from '@/hooks/useAppointment';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import TableHeader from '../../ui/table-header';
import { Flex, Input, Loader, Text, Select, ActionIcon, MultiSelect, Button } from 'rizzui';
import { PiArrowLeft, PiArrowRight, PiCalendar, PiUser } from 'react-icons/pi';
import dayjs from '@/config/dayjs';
import ActionButton from '../../ui/action-tooltip-button';
import { useProfile } from '@/hooks/useProfile';
import { View } from 'react-big-calendar';
import { useGetAllDoctors } from '@/hooks/useDoctor';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import RescheduleAppointmentForm from '../reschedule';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import toast from 'react-hot-toast';
import ConfirmationView from '../reschedule/ConfirmationView';
import { LuCalendarX2 } from 'react-icons/lu';
import { MdOutlineInfo } from 'react-icons/md';
import WeeklyTable from './CalendarTypes/Weekly/WeeklyTable';
import WeeklyModalReschedule from './CalendarTypes/Weekly/WeeklyModalReschedule';
import MounthlyCalendar from './CalendarTypes/Mounthly/MounthlyCalendar';
import { IoNotificationsOutline } from 'react-icons/io5';

export default function GlobalCalendarTable({ }: {}) {
  const { openModal, closeModal } = useModal();
  const [pageSize] = useState(100);
  const [viewType, setViewType] = useState<'daily' | 'weekly' | 'monthly'>(
    'daily'
  );

  const [selectedDate, setSelectedDate] = useState(
    viewType === 'monthly'
      ? dayjs().locale('en').format('YYYY-MM')
      : dayjs().format('YYYY-MM-DD')
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const startOfMonth = dayjs(selectedDate).startOf('month').format('D MMMM');
  const endOfMonth = dayjs(selectedDate).endOf('month').format('D MMMM');
  // const monthLabel = dayjs(selectedDate).locale('en').format('MMMM YYYY');
  const shortMonth = dayjs(selectedDate).format('MMM').toUpperCase();
  const year = dayjs(selectedDate).format('YYYY');

  const startOfWeek = dayjs(selectedDate).startOf('week').format('D MMMM');
  const endOfWeek = dayjs(selectedDate).endOf('week').format('D MMMM');

  const [selectedDoctor, setSelectedDoctor] = useState<string[]>([]);
  const { data: dataProfile } = useProfile(true);
  const { mutate: mutateRescheduleByDate, isPending: isPendingReschedule } =
    usePostRescheduleAppointmentByDate();

  const {
    data,
    isLoading: isLoadingGetAppointments,
    refetch,
  } = useGetAppointments({
    page: 1,
    perPage: pageSize,
    sort: 'DESC',
    from:
      viewType === 'monthly'
        ? dayjs(selectedDate).startOf('month').format('YYYY-MM-DD')
        : viewType === 'weekly'
          ? dayjs(selectedDate).startOf('week').format('YYYY-MM-DD')
          : selectedDate,
    to:
      viewType === 'monthly'
        ? dayjs(selectedDate).endOf('month').format('YYYY-MM-DD')
        : viewType === 'weekly'
          ? dayjs(selectedDate).endOf('week').format('YYYY-MM-DD')
          : selectedDate,
    clinicId: dataProfile?.clinics[0]?.id || 0,
    // doctorId: selectedDoctor ? Number(selectedDoctor) : undefined,
    q: selectedDoctor.length > 0 && !selectedDoctor.includes('0')
      ? JSON.stringify({
        doctor_ids: selectedDoctor.map(id => Number(id))
      })
      : undefined,
  });

  const { data: doctorDatas } = useGetAllDoctors({
    page: 1,
    perPage: 1000,
    clinicId: dataProfile?.clinics[0]?.id,
  });

  useEffect(() => {
    setSelectedDoctor([]);
  }, [viewType]);

  const optionDoctors = React.useMemo(() => {
    if (!doctorDatas?.data) return [];
    return doctorDatas?.data?.map((doctor) => {
      return {
        label: `Dr. ${doctor.first_name} ${doctor.last_name}`,
        value: doctor.id,
      };
    });
  }, [doctorDatas]);

  function previousDate() {
    setSelectedDate((prevDate) => {
      const prevDateObj = dayjs(prevDate);
      if (!prevDateObj.isValid()) {
        return viewType === 'monthly'
          ? dayjs().subtract(1, 'month').format('YYYY-MM')
          : dayjs().subtract(1, 'day').format('YYYY-MM-DD');
      }

      if (viewType === 'monthly') {
        return prevDateObj.subtract(1, 'month').format('YYYY-MM');
      } else if (viewType === 'weekly') {
        return prevDateObj.subtract(1, 'week').format('YYYY-MM-DD');
      } else {
        return prevDateObj.subtract(1, 'day').format('YYYY-MM-DD');
      }
    });
  }

  function nextDate() {
    setSelectedDate((prevDate) => {
      const prevDateObj = dayjs(prevDate);
      if (!prevDateObj.isValid()) {
        return viewType === 'monthly'
          ? dayjs().add(1, 'month').format('YYYY-MM')
          : dayjs().add(1, 'day').format('YYYY-MM-DD');
      }

      if (viewType === 'monthly') {
        return prevDateObj.add(1, 'month').format('YYYY-MM');
      } else if (viewType === 'weekly') {
        return prevDateObj.add(1, 'week').format('YYYY-MM-DD');
      } else {
        return prevDateObj.add(1, 'day').format('YYYY-MM-DD');
      }
    });
  }

  const getTimeSlots = () => {
    const slots = [];
    const startHour = 0;
    const endHour = 23;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        let displayHour = hour % 12;
        if (displayHour === 0) displayHour = 12;
        const period = hour < 12 ? 'AM' : 'PM';
        const time12 = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;

        slots.push({
          time24,
          time12
        });
      }
    }

    return slots;
  };

  // const formatAppointments = useCallback(
  //   (data: IGetAppointmentListResponse['data']) => {
  //     const timeSlots = getTimeSlots();
  //     const doctors = Array.from(
  //       new Set(
  //         data.map((item) =>
  //           `${item.doctor?.first_name || ''} ${item.doctor?.last_name || ''}`.trim()
  //         )
  //       )
  //     );

  //     type SlotRow = {
  //       time: string;
  //       _time24: string;
  //       [key: string]: any;
  //     };

  //     const result: SlotRow[] = timeSlots.map((slot) => {
  //       const row: SlotRow = {
  //         time: slot.time12,
  //         _time24: slot.time24
  //       };
  //       doctors.forEach((doc) => {
  //         row[doc] = '';
  //       });
  //       return row;
  //     });

  //     data.forEach((item) => {
  //       const doctorName =
  //         `${item.doctor?.first_name || ''} ${item.doctor?.last_name || ''}`.trim();

  //       let timeStr: string = '';

  //       const timeMatch = item.date.match(/T(\d{2}):(\d{2}):(\d{2})/);
  //       if (timeMatch) {
  //         const hour = timeMatch[1];
  //         const minute = timeMatch[2];
  //         timeStr = `${hour}:${minute}`;
  //       }

  //       const slot = result.find((r) => r._time24 === timeStr);

  //       if (slot && item.patient) {
  //         slot[doctorName] = item;
  //         slot['type'] = item.type || '';
  //       }
  //     });

  //     return result.map(({ _time24, ...rest }) => rest);
  //   },
  //   []
  // );

  const formatAppointments = useCallback(
    (data: IGetAppointmentListResponse['data'], nearestSchedule?: any, selectedDate?: string, viewType?: string) => {
      const timeSlots = getTimeSlots();

      const doctorsFromAppointments = Array.from(
        new Set(
          data.map((item) =>
            `${item.doctor?.first_name || ''} ${item.doctor?.last_name || ''}`.trim()
          )
        )
      );

      const doctors = [...doctorsFromAppointments];
      let nearestDoctorName = '';
      let scheduleStartTime = '';
      let scheduleEndTime = '';
      let shouldShowNearestDoctor = false;

      if (nearestSchedule?.doctor && selectedDate) {
        nearestDoctorName = `${nearestSchedule.doctor.first_name || ''} ${nearestSchedule.doctor.last_name || ''}`.trim();

        const scheduleDateMatch = nearestSchedule.start_date?.match(/(\d{4}-\d{2}-\d{2})/);
        const scheduleDate = scheduleDateMatch ? scheduleDateMatch[1] : '';

        if (scheduleDate) {
          if (viewType === 'daily') {
            shouldShowNearestDoctor = scheduleDate === selectedDate;
          } else if (viewType === 'weekly') {
            const weekStart = dayjs(selectedDate).startOf('week').format('YYYY-MM-DD');
            const weekEnd = dayjs(selectedDate).endOf('week').format('YYYY-MM-DD');
            shouldShowNearestDoctor = scheduleDate >= weekStart && scheduleDate <= weekEnd;
          } else if (viewType === 'monthly') {
            const monthStart = dayjs(selectedDate).startOf('month').format('YYYY-MM-DD');
            const monthEnd = dayjs(selectedDate).endOf('month').format('YYYY-MM-DD');
            shouldShowNearestDoctor = scheduleDate >= monthStart && scheduleDate <= monthEnd;
          }
        }

        if (shouldShowNearestDoctor && nearestDoctorName && !doctors.includes(nearestDoctorName)) {
          doctors.push(nearestDoctorName);

          if (nearestSchedule.start_date) {
            const startMatch = nearestSchedule.start_date.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
            if (startMatch) {
              let hour = parseInt(startMatch[1]);
              const minute = startMatch[2];
              const period = startMatch[3].toUpperCase();

              if (period === 'PM' && hour !== 12) hour += 12;
              if (period === 'AM' && hour === 12) hour = 0;

              scheduleStartTime = `${hour.toString().padStart(2, '0')}:${minute}`;
            }
          }

          if (nearestSchedule.end_date) {
            const endMatch = nearestSchedule.end_date.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
            if (endMatch) {
              let hour = parseInt(endMatch[1]);
              const minute = endMatch[2];
              const period = endMatch[3].toUpperCase();

              if (period === 'PM' && hour !== 12) hour += 12;
              if (period === 'AM' && hour === 12) hour = 0;

              scheduleEndTime = `${hour.toString().padStart(2, '0')}:${minute}`;
            }
          }
        } else {
          nearestDoctorName = '';
        }
      }

      type SlotRow = {
        time: string;
        _time24: string;
        _nearestDoctor?: string;
        _scheduleStart?: string;
        _scheduleEnd?: string;
        [key: string]: any;
      };

      const result: SlotRow[] = timeSlots.map((slot) => {
        const row: SlotRow = {
          time: slot.time12,
          _time24: slot.time24,
          _nearestDoctor: nearestDoctorName,
          _scheduleStart: scheduleStartTime,
          _scheduleEnd: scheduleEndTime
        };
        doctors.forEach((doc) => {
          row[doc] = '';
        });
        return row;
      });

      const roundToNearest10Min = (hour: number, minute: number): string => {
        const roundedMinute = Math.floor(minute / 10) * 10;
        return `${hour.toString().padStart(2, '0')}:${roundedMinute.toString().padStart(2, '0')}`;
      };

      data.forEach((item) => {
        const doctorName =
          `${item.doctor?.first_name || ''} ${item.doctor?.last_name || ''}`.trim();

        let timeStr: string = '';

        const timeMatch = item.date.match(/T(\d{2}):(\d{2}):(\d{2})/);
        if (timeMatch) {
          const hour = parseInt(timeMatch[1]);
          const minute = parseInt(timeMatch[2]);

          timeStr = roundToNearest10Min(hour, minute);
        }

        const slot = result.find((r) => r._time24 === timeStr);

        if (slot && item.patient) {
          if (!slot[doctorName]) {
            slot[doctorName] = item;
          } else {
            console.warn(`Multiple appointments at ${timeStr} for Dr. ${doctorName}`);
          }
          slot['type'] = item.type || '';
        }
      });

      return result.map(({ _time24, ...rest }) => rest);
    },
    []
  );

  const tableData = useMemo(() => {
    return formatAppointments(
      data?.data ?? [],
      data?.nearest_doctor_schedule,
      selectedDate,
      viewType
    );
  }, [data?.data, data?.nearest_doctor_schedule, formatAppointments, selectedDate, viewType]);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);
  const prevSelectedDateRef = useRef<string>('');

  useEffect(() => {
    if (prevSelectedDateRef.current !== selectedDate) {
      hasScrolledRef.current = false;
      prevSelectedDateRef.current = selectedDate;
    }
  }, [selectedDate]);

  useEffect(() => {
    if (viewType === 'daily' && tableData.length > 0 && tableContainerRef.current && !hasScrolledRef.current) {
      const firstAppointmentIndex = tableData.findIndex(row => {
        return Object.keys(row).some(key => {
          if (key === 'time' || key === 'type') return false;
          return row[key] && typeof row[key] === 'object' && row[key].patient;
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
  }, [tableData, viewType]);

  const rescheduleModal = useCallback(
    (row: any, newDate: string, newDoctorName?: string, newTime?: string) => {
      closeModal();
      if (viewType === 'daily' && newDoctorName && newTime) {
        const doctorId = optionDoctors.find(doc => {
          const docNameWithoutTitle = doc.label.replace(/^Dr\.\s*/, "").toLowerCase();
          return docNameWithoutTitle.startsWith(newDoctorName.toLowerCase());
        })?.value;

        const displayTime = dayjs(newTime, 'HH:mm').format('h:mm A');
        const confirmationText = `Are you sure you want to reschedule to Dr. ${newDoctorName} at ${displayTime}?`;

        const converted = dayjs(newTime, "HH:mm").format("hh:mm A");
        const result = dayjs.utc(`${newDate} ${converted}`, "YYYY-MM-DD hh:mm A")

        const handleConfirm = () => {
          const payload = {
            id: row.id as number,
            doctorId: doctorId,
            date: result,
            note: 'Rescheduled from calendar drag and drop',
            // date: `${dayjs(newDate).format('YYYY-MM-DD')} ${newTime}`,
          };

          mutateRescheduleByDate(payload, {
            onSuccess: () => {
              toast.success('Appointment rescheduled successfully');
              refetch();
              closeModal();
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message ||
                'Error rescheduling appointment'
              );
              console.error('Error rescheduling appointment:', error);
              closeModal();
            },
          });
        };

        openModal({
          view: (
            <ConfirmationView
              description={confirmationText}
              onConfirm={handleConfirm}
              onCancel={() => closeModal()}
            />
          ),
          customSize: '400px',
        });
      } else if (viewType === 'weekly' && newDoctorName && newTime) {
        const doctorId = optionDoctors.find(doc => {
          const docNameWithoutTitle = doc.label.replace(/^Dr\.\s*/, "").toLowerCase();
          return docNameWithoutTitle.startsWith(newDoctorName.toLowerCase());
        })?.value;

        const converted = dayjs(newTime, "HH:mm").format("hh:mm A");
        const result = dayjs.utc(`${newDate} ${converted}`, "YYYY-MM-DD hh:mm A")

        const handleConfirm = () => {
          const payload = {
            id: row.id as number,
            doctorId: doctorId,
            date: result,
            note: 'Rescheduled from calendar drag and drop',
          };

          mutateRescheduleByDate(payload, {
            onSuccess: () => {
              toast.success('Appointment rescheduled successfully');
              refetch();
              closeModal();
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || 'Error rescheduling appointment'
              );
              console.error('Error rescheduling appointment:', error);
              closeModal();
            },
          });
        };

        openModal({
          view: (
            <WeeklyModalReschedule
              data={row}
              newDate={newDate}
              newTime={newTime}
              newDoctorName={newDoctorName}
              onConfirm={handleConfirm}
              onCancel={() => closeModal()}
              isPendingReschedule={isPendingReschedule}
            />
          ),
          customSize: '600px',
        });
      } else {
        openModal({
          view: <RescheduleAppointmentForm data={row} newDate={newDate} />,
          customSize: '600px',
        });
      }
    },
    [
      closeModal,
      viewType,
      optionDoctors,
      mutateRescheduleByDate,
      refetch,
      openModal,
      isPendingReschedule
    ]
  );

  const handleDrop = useCallback(
    (appointment: any, newDoctor: string, newTime: string) => {
      rescheduleModal(appointment, selectedDate, newDoctor, newTime);
    },
    [rescheduleModal, selectedDate]
  );

  const handleDropWeekly = useCallback(
    (appointment: any, newDayKey: string, newTime: string) => {
      const dayIndex = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].indexOf(newDayKey);
      const weekDates = getWeekDates(selectedDate);
      const newDate = weekDates[dayIndex];

      const doctorName = `${appointment.doctor?.first_name || ''} ${appointment.doctor?.last_name || ''}`.trim();

      rescheduleModal(appointment, newDate, doctorName, newTime);
    },
    [rescheduleModal, selectedDate]
  );

  const columns = React.useMemo(
    () =>
      getColumns({
        data: tableData,
        openModal,
        handleDrop,
        closeModal
      }),

    [openModal, tableData, handleDrop, closeModal]
  );

  const events = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item) => {
      const dateUTC = new Date(item.date);

      const year = dateUTC.getUTCFullYear();
      const month = dateUTC.getUTCMonth();
      const day = dateUTC.getUTCDate();
      const hours = dateUTC.getUTCHours();
      const minutes = dateUTC.getUTCMinutes();

      const startDate = new Date(year, month, day, hours, minutes);
      const endDate = new Date(year, month, day, hours, minutes);

      return {
        title: `Dr. ${item.doctor?.first_name} ${item.doctor?.last_name}`,
        doctor: `${item.doctor?.first_name} ${item.doctor?.last_name}`,
        patient: `${item.patient?.first_name} ${item.patient?.last_name}`,
        time: `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`,
        start: startDate,
        end: endDate,
        resourceId: item.doctor?.id,
        raw: item,
        appointment: item,
      };
    });
  }, [data?.data]);

  useEffect(() => {
    refetch();
  }, [selectedDate, refetch]);

  useEffect(() => {
    setSelectedDate((prev) => {
      if (viewType === 'monthly') {
        if (prev.length === 7 && prev.match(/^\d{4}-\d{2}$/)) {
          return prev;
        }
        const prevDate = dayjs(prev);
        return prevDate.isValid()
          ? prevDate.format('YYYY-MM')
          : dayjs().format('YYYY-MM');
      } else {
        if (prev.length === 7 && prev.match(/^\d{4}-\d{2}$/)) {
          return dayjs().format('YYYY-MM-DD');
        }
        const prevDate = dayjs(prev);
        return prevDate.isValid()
          ? prevDate.format('YYYY-MM-DD')
          : dayjs().format('YYYY-MM-DD');
      }
    });
  }, [viewType]);

  const doctorName = optionDoctors.find((item: any) => {
    return item.value == selectedDoctor;
  });

  const isoWeekToDate = (isoWeek: string): string => {
    const [year, week] = isoWeek.split('-W').map(Number);
    const jan4 = dayjs().year(year).month(0).date(4);
    const monday = jan4.startOf('isoWeek');
    const targetDate = monday.add(week - 1, 'week');

    return targetDate.format('YYYY-MM-DD');
  };

  const dateToIsoWeek = (date: string): string => {
    let d = dayjs(date);
    if (date.length === 7 && date.match(/^\d{4}-\d{2}$/)) {
      d = dayjs();
    }
    if (!d.isValid()) {
      d = dayjs();
    }
    const year = d.isoWeekYear();
    const week = d.isoWeek();

    return `${year}-W${week.toString().padStart(2, '0')}`;
  };

  const handleNavigate = useCallback(
    (newDate: Date, view: View, action: string) => {
      if (action === 'DATE') {
        const clickedDate = dayjs(newDate).format('YYYY-MM-DD');
        setSelectedDate(clickedDate);
        setViewType('daily');
      }
    },
    []
  );

  const getWeekDates = (selectedDate: string) => {
    let d = dayjs(selectedDate);
    if (!d.isValid()) {
      d = dayjs();
    }

    const monday = d.startOf('isoWeek');

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(monday.add(i, 'day').format('YYYY-MM-DD'));
    }

    return weekDates;
  };

  const optionDoctorsForMultiSelect = useMemo(() => {
    return optionDoctors.map(doc => ({
      label: doc.label,
      value: String(doc.value),
    }));
  }, [optionDoctors]);

  const isScheduleAvailable = useMemo(() => {
    if (!data?.nearest_doctor_schedule?.end_date) return false;

    const endDate = dayjs(data.nearest_doctor_schedule.end_date, 'YYYY-MM-DD hh:mm A');
    const now = dayjs();

    return endDate.isAfter(now);
  }, [data?.nearest_doctor_schedule?.end_date]);

  const formattedStartDate = useMemo(() => {
    if (!data?.nearest_doctor_schedule?.start_date) return '';

    const startDate = dayjs(data.nearest_doctor_schedule.start_date, 'YYYY-MM-DD hh:mm A');

    return startDate.format('dddd, D MMMM YYYY [at] hh:mm A');
  }, [data?.nearest_doctor_schedule?.start_date]);

  const isScheduleOnSelectedDate = useMemo(() => {
    if (!data?.nearest_doctor_schedule?.start_date || !data?.nearest_doctor_schedule?.end_date) {
      return false;
    }

    const scheduleStartDate = dayjs(
      data.nearest_doctor_schedule.start_date,
      'YYYY-MM-DD hh:mm A'
    ).format('YYYY-MM-DD');

    const scheduleEndDate = dayjs(
      data.nearest_doctor_schedule.end_date,
      'YYYY-MM-DD hh:mm A'
    ).format('YYYY-MM-DD');

    return selectedDate === scheduleStartDate || selectedDate === scheduleEndDate;
  }, [data?.nearest_doctor_schedule, selectedDate]);

  const shouldShowEmptyState = useMemo(() => {
    const noEvents = !events || events.length === 0;
    const scheduleNotOnThisDate = !isScheduleOnSelectedDate;

    return noEvents && scheduleNotOnThisDate;
  }, [events, isScheduleOnSelectedDate]);

  return (
    <div>
      {tableData && columns && tableData?.length > 0 && columns.length > 0 ? (
        <>
          <div className="relative z-0">
            {isScheduleAvailable && data?.nearest_doctor_schedule && (
              <div className="mb-2 flex gap-4 rounded-lg px-6 py-4 border border-[#3872F959] bg-[#3872F91A] items-center">
                <div>
                  <IoNotificationsOutline className='text-2xl text-[#3872F9]' />
                </div>

                <div className='flex-1 flex justify-between items-center'>
                  <div className='flex flex-col gap-1'>
                    <h1 className='font-semibold text-sm text-[#3872F9] font-inter'>
                      Next Availability for a New Patient!
                    </h1>

                    <p className='text-[#3872F9] font-normal text-sm'>
                      The next available appointment with Dr. {data.nearest_doctor_schedule.doctor.first_name} {data.nearest_doctor_schedule.doctor.last_name} is on {formattedStartDate}.
                    </p>
                  </div>

                  <Button
                    className='bg-[#3872F9] py-3 px-4'
                    onClick={() => {
                      if (data?.nearest_doctor_schedule) {
                        const scheduleDate = dayjs(
                          data.nearest_doctor_schedule.start_date,
                          'YYYY-MM-DD hh:mm A'
                        );

                        setSelectedDate(scheduleDate.format('YYYY-MM-DD'));

                        setViewType('daily');

                        // setSelectedDoctor([String(data.nearest_doctor_schedule.doctor.id)]);
                      }
                    }}
                  >
                    Check Now
                  </Button>
                </div>
              </div>
            )}
            <TableHeader isCustomHeader checkedItems={[]}>
              <div
                className='flex justify-between items-center w-full gap-2'
              >
                <Flex align="center" gap="3">
                  <div className="flex w-12 flex-col items-center justify-center rounded-md border border-gray-300">
                    <div className="w-12 rounded-tl-md rounded-tr-md bg-muted">
                      <Text className="w-full text-center text-xs font-medium text-muted-foreground">
                        {year}
                      </Text>
                    </div>
                    <div className="py-2">
                      <Text className="text-md font-semibold">{shortMonth}</Text>
                    </div>
                  </div>

                  <div>
                    {/* <Text className="text-md font-semibold">{monthLabel}</Text> */}
                    <div className='flex items-center gap-2'>
                      <Text className="text-sm text-muted-foreground">
                        {viewType === 'weekly'
                          ? `${startOfWeek} - ${endOfWeek}`
                          : `${startOfMonth} - ${endOfMonth}`}
                      </Text>
                      <div className="relative">
                        <MdOutlineInfo
                          className='text-xl cursor-pointer'
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                        />

                        {showTooltip && (
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 animate-in fade-in duration-200">
                            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 whitespace-nowrap">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-[#3291B6]"></div>
                                  <span className="text-sm">Initial Consult</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-[#BB8ED0]"></div>
                                  <span className="text-sm">Follow Up</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-[#E0A8A8]"></div>
                                  <span className="text-sm">Transfer</span>
                                </div>
                                {/* <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-[#E84757]"></div>
                                  <span className="text-sm">Reschedule</span>
                                </div> */}
                              </div>
                            </div>
                            {/* Arrow */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Flex>
                {/* {doctorName && (
                  <Flex>
                    <Text className="text-md font-semibold">
                      {doctorName?.label || ''}
                    </Text>
                  </Flex>
                )} */}
                <Flex align="center" gap="3" justify='end' >
                  <Flex className="w-fit" align="center" gap='2'>
                    <ActionIcon
                      variant="outline"
                      onClick={previousDate}
                      size='sm'
                    >
                      <PiArrowLeft className="text-muted-foreground" size={20} />
                    </ActionIcon>
                    {viewType === 'monthly' ? (
                      <Input
                        type="month"
                        value={selectedDate}
                        min={dayjs().locale('en').format('YYYY-MM')}
                        onChange={(event) => setSelectedDate(event.target.value)}
                        size="sm"
                      />
                    ) : viewType === 'weekly' ? (
                      <Input
                        type="week"
                        value={dateToIsoWeek(selectedDate)}
                        onChange={(event) => {
                          const normalDate = isoWeekToDate(event.target.value);
                          setSelectedDate(normalDate);
                        }}
                        size="sm"
                      />
                    ) : (
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(event) => setSelectedDate(event.target.value)}
                        size="sm"
                      />
                    )}

                    <ActionIcon
                      onClick={nextDate}
                      variant="outline"
                      size='sm'
                    >
                      <PiArrowRight className="text-muted-foreground" size={20} />
                    </ActionIcon>
                  </Flex>
                  <Flex justify='end' className="w-auto">
                    <Select
                      size="sm"
                      className='w-[200px]'
                      value={viewType}
                      onChange={(e: any) => {
                        setViewType(e.value);
                      }}
                      options={[
                        { label: 'Daily', value: 'daily' },
                        { label: 'Weekly', value: 'weekly' },
                        { label: 'Monthly', value: 'monthly' },
                      ]}
                      prefix={<PiCalendar size={16} />}
                      displayValue={(value: string) =>
                        value
                          ? value.charAt(0).toUpperCase() + value.slice(1)
                          : ''
                      }
                    />
                    {/* <Select
                      size="sm"
                      value={selectedDoctor}
                      placeholder="Select doctor"
                      onChange={(e: any) => setSelectedDoctor(e.value)}
                      options={[
                        {
                          label: 'All Doctor',
                          value: 0,
                        },
                        ...optionDoctors,
                      ]}
                      searchable
                      className="[&_.rizzui-select-input]:items-center w-[200px]"
                      prefix={<PiUser size={16} />}
                      displayValue={(value: number) => {
                        const item = optionDoctors.find((item) => {
                          return item.value == value;
                        });
                        return item ? item.label : 'All Doctors';
                      }}
                    /> */}
                    {viewType === 'daily' ? (
                      <MultiSelect
                        size="sm"
                        value={selectedDoctor}
                        placeholder="Select doctors"
                        onChange={setSelectedDoctor}
                        options={optionDoctorsForMultiSelect}
                        searchable
                        prefix={<PiUser size={16} />}
                        className="[&_.rizzui-select-input]:items-center w-[200px]"
                        label=""
                        displayValue={(selected: string[]) => {
                          if (!selected || selected.length === 0) {
                            return 'All Doctors';
                          }
                          if (selected.length === 1) {
                            const item = optionDoctors.find((item) => String(item.value) === selected[0]);
                            return item ? item.label : 'All Doctors';
                          }
                          return `${selected.length} Doctors Selected`;
                        }}
                      />
                    ) : (
                      <Select
                        size="sm"
                        value={selectedDoctor.length > 0 ? Number(selectedDoctor[0]) : 0}
                        placeholder="Select doctor"
                        onChange={(e: any) => {
                          setSelectedDoctor(e.value === 0 ? [] : [String(e.value)]);
                        }}
                        options={[
                          {
                            label: 'All Doctor',
                            value: 0,
                          },
                          ...optionDoctors,
                        ]}
                        searchable
                        className="[&_.rizzui-select-input]:items-center w-[200px]"
                        prefix={<PiUser size={16} />}
                        displayValue={(value: number) => {
                          if (!value || value === 0) {
                            return 'All Doctors';
                          }
                          const item = optionDoctors.find((item) => {
                            return item.value == value;
                          });
                          return item ? item.label : 'All Doctors';
                        }}
                      />
                    )}
                  </Flex>
                </Flex>
              </div>
            </TableHeader>
          </div>
          {viewType == 'daily' ? (
            <div ref={tableContainerRef}>
              <DndProvider backend={HTML5Backend}>
                {/* {isLoadingGetAppointments ? (
                  <div className="flex h-[500px] items-center justify-center">
                    <Loader />
                  </div>
                ) : events && events.length > 0 ? (
                  <ControlledTable
                    isLoading={isLoadingGetAppointments}
                    showLoadingText={true}
                    data={tableData ?? []}
                    // @ts-ignore
                    columns={columns}
                    variant="bordered"
                    className="[&_td.rc-table-cell]:h-[10px] [&_td.rc-table-cell]:max-h-[10px] [&_td.rc-table-cell]:overflow-hidden [&_td.rc-table-cell]:p-0"
                    scroll={{ y: 600 }}
                  />
                ) : (
                  <div className="flex h-[500px] flex-col items-center justify-center rounded-lg">
                    <LuCalendarX2 className="mb-4 text-6xl text-[#A6A6A6]" />
                    <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
                      <h1 className="text-2xl font-semibold">
                        No Scheduled Appointments
                      </h1>
                      <p className="max-w-md text-lg text-[#787878]">
                        There are no appointments on this day. View your weekly or
                        monthly calendar to check upcoming schedules.
                      </p>
                    </div>
                  </div>
                )} */}
                {isLoadingGetAppointments ? (
                  <div className="flex h-[500px] items-center justify-center">
                    <Loader />
                  </div>
                ) : shouldShowEmptyState ? (
                  <div className="flex h-[500px] flex-col items-center justify-center rounded-lg">
                    <LuCalendarX2 className="mb-4 text-6xl text-[#A6A6A6]" />
                    <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
                      <h1 className="text-2xl font-semibold">
                        No Scheduled Appointments
                      </h1>
                      <p className="max-w-md text-lg text-[#787878]">
                        There are no appointments on this day. View your weekly or
                        monthly calendar to check upcoming schedules.
                      </p>
                    </div>
                  </div>
                ) : (
                  <ControlledTable
                    isLoading={isLoadingGetAppointments}
                    showLoadingText={true}
                    data={tableData ?? []}
                    // @ts-ignore
                    columns={columns}
                    variant="bordered"
                    className="[&_td.rc-table-cell]:overflow-hidden [&_td.rc-table-cell]:p-0 [&_td.rc-table-cell]:align-middle [&_td.rc-table-cell]:leading-none"
                    scroll={{ y: 600 }}
                  />
                )}
              </DndProvider>
            </div>
          ) : viewType === 'weekly' ? (
            <WeeklyTable
              data={data?.data}
              doctorSchedule={data}
              handleDrop={handleDropWeekly}
              isLoadingGetAppointments={isLoadingGetAppointments}
              weekDates={getWeekDates(selectedDate)}
              events={events}
              selectedDoctor={selectedDoctor}
            />
          ) : (
            <MounthlyCalendar
              data={data}
              events={events}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              handleNavigate={handleNavigate}
              setViewType={setViewType}
              rescheduleModal={rescheduleModal}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
