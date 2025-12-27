'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useModal } from '../../modal-views/use-modal';
import {
  useGetAppointments,
  usePostRescheduleAppointmentByDate,
} from '@/hooks/useAppointment';
import { Button } from 'rizzui';
import dayjs from '@/config/dayjs';
import { useProfile } from '@/hooks/useProfile';
import { View } from 'react-big-calendar';
import { useGetAllDoctors } from '@/hooks/useDoctor';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import RescheduleAppointmentForm from '../reschedule';
import toast from 'react-hot-toast';
import ConfirmationView from '../reschedule/ConfirmationView';
import WeeklyTable from './CalendarTypes/Weekly/WeeklyTable';
import WeeklyModalReschedule from './CalendarTypes/Weekly/WeeklyModalReschedule';
import MounthlyCalendar from './CalendarTypes/Mounthly/MounthlyCalendar';
import { IoNotificationsOutline } from 'react-icons/io5';
import CalendarHeader from './CalendarHeaders';
import DailyCalendar from './CalendarTypes/Daily/DailyCalendar';
import ModalNextAvailability from './ModalNextAvailability';

export default function GlobalCalendarTable({}: {}) {
  const { openModal, closeModal } = useModal();
  const [pageSize] = useState(100);
  const [viewType, setViewType] = useState<'daily' | 'weekly' | 'monthly'>(
    'monthly'
  );
  const [selectedDate, setSelectedDate] = useState(
    viewType === 'monthly'
      ? dayjs().locale('en').format('YYYY-MM')
      : dayjs().format('YYYY-MM-DD')
  );

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
    q:
      selectedDoctor.length > 0 && !selectedDoctor.includes('0')
        ? JSON.stringify({
            doctor_ids: selectedDoctor.map((id) => Number(id)),
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

  const rescheduleModal = useCallback(
    (row: any, newDate: string, newDoctorName?: string, newTime?: string) => {
      closeModal();
      if (viewType === 'daily' && newDoctorName && newTime) {
        const doctorId = optionDoctors.find((doc) => {
          const docNameWithoutTitle = doc.label
            .replace(/^Dr\.\s*/, '')
            .toLowerCase();
          return docNameWithoutTitle.startsWith(newDoctorName.toLowerCase());
        })?.value;

        const displayTime = dayjs(newTime, 'HH:mm').format('h:mm A');
        const confirmationText = `Are you sure you want to reschedule to Dr. ${newDoctorName} at ${displayTime}?`;

        const converted = dayjs(newTime, 'HH:mm').format('hh:mm A');
        const result = dayjs.utc(
          `${newDate} ${converted}`,
          'YYYY-MM-DD hh:mm A'
        );

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
        const doctorId = optionDoctors.find((doc) => {
          const docNameWithoutTitle = doc.label
            .replace(/^Dr\.\s*/, '')
            .toLowerCase();
          return docNameWithoutTitle.startsWith(newDoctorName.toLowerCase());
        })?.value;

        const converted = dayjs(newTime, 'HH:mm').format('hh:mm A');
        const result = dayjs.utc(
          `${newDate} ${converted}`,
          'YYYY-MM-DD hh:mm A'
        );

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
      isPendingReschedule,
    ]
  );

  const handleDropWeekly = useCallback(
    (appointment: any, newDayKey: string, newTime: string) => {
      const dayIndex = [
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT',
        'SUN',
      ].indexOf(newDayKey);
      const weekDates = getWeekDates(selectedDate);
      const newDate = weekDates[dayIndex];

      const doctorName =
        `${appointment.doctor?.first_name || ''} ${appointment.doctor?.last_name || ''}`.trim();

      rescheduleModal(appointment, newDate, doctorName, newTime);
    },
    [rescheduleModal, selectedDate]
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

  const isScheduleAvailable = useMemo(() => {
    if (!data?.nearest_doctor_schedule?.end_date) return false;

    const endDate = dayjs(
      data.nearest_doctor_schedule.end_date,
      'YYYY-MM-DD hh:mm A'
    );
    const now = dayjs();

    return endDate.isAfter(now);
  }, [data?.nearest_doctor_schedule?.end_date]);

  const formattedStartDate = useMemo(() => {
    if (!data?.nearest_doctor_schedule?.start_date) return '';

    const startDate = dayjs(
      data.nearest_doctor_schedule.start_date,
      'YYYY-MM-DD hh:mm A'
    );

    return startDate.format('dddd, D MMMM YYYY [at] hh:mm A');
  }, [data?.nearest_doctor_schedule?.start_date]);

  return (
    <div className="flex h-screen flex-col">
      {isScheduleAvailable && data?.nearest_doctor_schedule && (
        <div className="mb-2 flex items-center gap-4 rounded-lg border border-[#3872F959] bg-[#3872F91A] px-6 py-4">
          <div>
            <IoNotificationsOutline className="text-2xl text-[#3872F9]" />
          </div>

          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="font-inter text-sm font-semibold text-[#3872F9]">
                Next Availability for a New Patient!
              </h1>

              <p className="text-sm font-normal text-[#3872F9]">
                The next available appointment with Dr.{' '}
                {data.nearest_doctor_schedule.doctor.first_name}{' '}
                {data.nearest_doctor_schedule.doctor.last_name} is on{' '}
                {formattedStartDate}.
              </p>
            </div>

            <Button
              className="bg-[#3872F9] px-4 py-3"
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
                // openModal({
                //   view: <ModalNextAvailability data={data} />,
                //   customSize: '1100px',
                // });
              }}
            >
              Check Now
            </Button>
          </div>
        </div>
      )}

      <CalendarHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        viewType={viewType}
        setViewType={setViewType}
        selectedDoctor={selectedDoctor}
        setSelectedDoctor={setSelectedDoctor}
        optionDoctors={optionDoctors}
      />
      <div className="flex-1 min-h-0 overflow-hidden">
        {' '}
        {viewType == 'daily' ? (
          <DailyCalendar
            isLoadingGetAppointments={isLoadingGetAppointments}
            events={events}
            data={data}
            selectedDate={selectedDate}
            viewType={viewType}
            rescheduleModal={rescheduleModal}
          />
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
      </div>
    </div>
  );
}
