'use client';

import ControlledTable from '@/app/shared/ui/controlled-table/index';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getColumns } from './columns';
import { useModal } from '../../modal-views/use-modal';
import {
  useGetAppointments,
  usePostRescheduleAppointmentByDate,
} from '@/hooks/useAppointment';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import TableHeader from '../../ui/table-header';
import { Flex, Input, Loader, Text, Select } from 'rizzui';
import { PiArrowLeft, PiArrowRight, PiCalendar, PiUser } from 'react-icons/pi';
import dayjs from '@/config/dayjs';
import ActionButton from '../../ui/action-tooltip-button';
import { useProfile } from '@/hooks/useProfile';
import { Calendar, dayjsLocalizer, View } from 'react-big-calendar';
import cn from '@/core/utils/class-names';
import { useGetAllDoctors } from '@/hooks/useDoctor';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import RescheduleAppointmentForm, {
  formRescheduleDataAtom,
} from '../reschedule';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import toast from 'react-hot-toast';
import ConfirmationView from '../reschedule/ConfirmationView';
import AppointmentDetails from '../../appointment/appointment-list/list/appointment-details';
import { LuCalendarX2 } from 'react-icons/lu';

const DnDCalendar = withDragAndDrop<any, any>(Calendar);

const localizer = dayjsLocalizer(dayjs);

const EventCard = ({ event, selectedDoctor }: any) => {
  const getColorByType = (type: string) => {
    const appointmentType = type?.toLowerCase() || '';

    if (appointmentType.includes('initial')) {
      return {
        bg: '#E8F5E9',
        border: '#1FA551',
        text: '#1FA551',
      };
    } else if (appointmentType.includes('follow')) {
      return {
        bg: '#E3F2FD',
        border: '#0078D7',
        text: '#0078D7',
      };
    } else if (appointmentType.includes('transfer')) {
      return {
        bg: '#FFF3E0',
        border: '#F4A523',
        text: '#F4A523',
      };
    } else if (appointmentType.includes('reschedule')) {
      return {
        bg: '#FFEBEE',
        border: '#E84757',
        text: '#E84757',
      };
    } else {
      return {
        bg: '#F5F5F5',
        border: '#6B7280',
        text: '#6B7280',
      };
    }
  };

  const appointmentType = event?.appointment?.type || '';
  const colors = getColorByType(appointmentType);

  return (
    <div
      className="cursor-pointer rounded px-2 py-1.5 transition-opacity hover:opacity-80"
      style={{
        backgroundColor: colors.bg,
        borderLeft: `4px solid ${colors.border}`,
      }}
      title={`${event.time} - Dr. ${event.doctor}\n${event.patient}\nType: ${appointmentType}`}
    >
      <div
        className="truncate text-[11px] font-semibold leading-tight"
        style={{ color: colors.text }}
      >
        {event.time} - Dr. {event.doctor}
      </div>
      <div className="mt-0.5 truncate text-[11px] leading-tight text-gray-700">
        {event.patient}
      </div>
    </div>
  );
};

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

  const startOfMonth = dayjs(selectedDate).startOf('month').format('D MMMM');
  const endOfMonth = dayjs(selectedDate).endOf('month').format('D MMMM');
  const monthLabel = dayjs(selectedDate).locale('en').format('MMMM YYYY');
  const shortMonth = dayjs(selectedDate).format('MMM').toUpperCase();
  const year = dayjs(selectedDate).format('YYYY');

  const startOfWeek = dayjs(selectedDate).startOf('week').format('D MMMM');
  const endOfWeek = dayjs(selectedDate).endOf('week').format('D MMMM');

  const [selectedDoctor, setSelectedDoctor] = useState<string | number>(0);
  const { data: dataProfile } = useProfile(true);
  const { mutate: mutateRescheduleByDate } =
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
    doctorId: selectedDoctor ? Number(selectedDoctor) : undefined,
  });

  const { data: doctorDatas } = useGetAllDoctors({
    page: 1,
    perPage: 1000,
    clinicId: dataProfile?.clinics[0]?.id,
  });

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

  function getTimeSlots(
    startTime: string,
    endTime: string,
    intervalMinutes: number
  ) {
    const slots = [];
    let current = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    while (current <= end) {
      const timeStr = current.toTimeString().slice(0, 5);
      slots.push(timeStr);
      current.setMinutes(current.getMinutes() + intervalMinutes);
    }

    return slots;
  }

  const formatAppointments = useCallback(
    (data: IGetAppointmentListResponse['data']) => {
      const appointmentTimes = data
        .map((item) => {
          const match = item.date.match(/T(\d{2}):(\d{2}):/);
          if (match) return `${match[1]}:${match[2]}`;
          return null;
        })
        .filter(Boolean) as string[];

      const startTime =
        appointmentTimes.length > 0 ? appointmentTimes.sort()[0] : '00:00';
      const timeSlots = getTimeSlots(startTime, '23:59', 15);

      const doctors = Array.from(
        new Set(
          data.map((item) =>
            `${item.doctor?.first_name || ''} ${item.doctor?.last_name || ''}`.trim()
          )
        )
      );

      const result = timeSlots.map((time) => {
        const slot: Record<string, any> = { time };
        doctors.forEach((doc) => {
          slot[doc] = '';
        });
        return slot;
      });

      data.forEach((item) => {
        const doctorName =
          `${item.doctor?.first_name || ''} ${item.doctor?.last_name || ''}`.trim();

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

        const slot = result.find((r) => r.time === timeStr);

        if (slot && item.patient) {
          slot[doctorName] = item;
          slot['type'] = item.type || '';
        }
      });

      return result;
    },
    []
  );

  const tableData = useMemo(() => {
    return formatAppointments(data?.data ?? []);
  }, [data?.data, formatAppointments]);

  const rescheduleModal = useCallback(
    (row: any, newDate: string, newDoctorName?: string, newTime?: string) => {
      closeModal();

      if (viewType === 'daily' && newDoctorName && newTime) {
        const doctorId = optionDoctors.find(
          (doc) => doc.label === `Dr. ${newDoctorName}`
        )?.value;

        const displayTime = dayjs(newTime, 'HH:mm').format('h:mm A');
        const confirmationText = `Are you sure you want to reschedule to Dr. ${newDoctorName} at ${displayTime}?`;

        const handleConfirm = () => {
          const payload = {
            id: row.id as number,
            doctorId: doctorId,
            date: `${dayjs(newDate).format('YYYY-MM-DD')} ${newTime}`,
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
            <ConfirmationView
              description={confirmationText}
              onConfirm={handleConfirm}
              onCancel={() => closeModal()}
            />
          ),
          customSize: '400px',
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
    ]
  );

  const handleDrop = useCallback(
    (appointment: any, newDoctor: string, newTime: string) => {
      rescheduleModal(appointment, selectedDate, newDoctor, newTime);
    },
    [rescheduleModal, selectedDate]
  );

  const columns = React.useMemo(
    () =>
      getColumns({
        data: tableData,
        openModal,
        handleDrop,
      }),

    [openModal, tableData, handleDrop]
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
      const endDate = new Date(year, month, day, hours + 1, minutes);

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

  const openModalDetail = (data: any) => {
    openModal({
      view: <AppointmentDetails data={data?.appointment} />,
      customSize: '1100px',
    });
  };

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

  const CustomDateCell = ({ value, children }: any) => {
    const dateStr = dayjs(value).format('YYYY-MM-DD');
    const hasEvents = events.some(
      (event) => dayjs(event.start).format('YYYY-MM-DD') === dateStr
    );

    return (
      <div className="rbc-day-bg">
        {children}
        {!hasEvents && (
          <div className="flex flex-col items-center justify-center pt-8 text-[#A6A6A6]">
            <svg
              className="mb-2 h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs text-[#787878]">No Appointment</span>
          </div>
        )}
      </div>
    );
  };

  <DnDCalendar
    localizer={localizer}
    events={events}
    selectable
    startAccessor="start"
    endAccessor="end"
    className={cn('h-[650px] md:h-[1000px]')}
    toolbar={false}
    components={{
      event: (props) => (
        <EventCard {...props} selectedDoctor={selectedDoctor} />
      ),
      dateCellWrapper: (props) => <CustomDateCell {...props} />,
    }}
    date={new Date(selectedDate)}
    onNavigate={handleNavigate}
    onSelectSlot={(slotInfo: any) => {
      const clickedDate = dayjs(slotInfo.start).format('YYYY-MM-DD');
      setSelectedDate(clickedDate);
      setViewType('daily');
    }}
    eventPropGetter={() => ({
      style: {
        backgroundColor: 'transparent',
        padding: 0,
        marginBottom: '4px',
        border: 'none',
        boxShadow: 'none',
      },
    })}
    onSelectEvent={openModalDetail}
    onEventDrop={({ event, start, end, allDay }: any) => {
      rescheduleModal(event.raw, dayjs(start).format('YYYY-MM-DD'));
    }}
    draggableAccessor={(event) => true}
  />;

  return (
    <div>
      {tableData && columns && tableData?.length > 0 && columns.length > 0 ? (
        <>
          <TableHeader isCustomHeader checkedItems={[]}>
            <div
              className={` ${selectedDoctor ? 'grid grid-cols-[repeat(2,1fr)_1.5fr]' : 'flex w-full justify-between'} items-center`}
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
                  <Text className="text-md font-semibold">{monthLabel}</Text>
                  <Text className="text-sm text-muted-foreground">
                    {viewType === 'weekly'
                      ? `${startOfWeek} - ${endOfWeek}`
                      : `${startOfMonth} - ${endOfMonth}`}
                  </Text>
                </div>
              </Flex>
              {doctorName && (
                <Text className="text-md font-semibold">
                  {doctorName?.label || ''}
                </Text>
              )}
              <Flex align="center" gap="3">
                <Flex className="w-fit" align="center">
                  <ActionButton
                    variant="outline"
                    tooltipContent=""
                    onClick={previousDate}
                  >
                    <PiArrowLeft className="text-muted-foreground" size={20} />
                  </ActionButton>
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

                  <ActionButton
                    onClick={nextDate}
                    variant="outline"
                    tooltipContent=""
                  >
                    <PiArrowRight className="text-muted-foreground" size={20} />
                  </ActionButton>
                </Flex>
                <Flex className="w-full">
                  <Select
                    size="sm"
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
                  <Select
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
                    className="[&_.rizzui-select-input]:items-center"
                    prefix={<PiUser size={16} />}
                    displayValue={(value: number) => {
                      const item = optionDoctors.find((item) => {
                        return item.value == value;
                      });
                      return item ? item.label : 'All Doctors';
                    }}
                  />
                </Flex>
              </Flex>
            </div>
          </TableHeader>
          {viewType == 'daily' ? (
            <DndProvider backend={HTML5Backend}>
              {isLoadingGetAppointments ? (
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
              )}
            </DndProvider>
          ) : viewType === 'weekly' ? (
            <DnDCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              toolbar={false}
              view="week"
              views={['week']}
              min={new Date(0, 0, 0, 0, 0, 0)}
              max={new Date(0, 0, 0, 23, 59, 59)}
              step={15}
              timeslots={1}
              date={new Date(selectedDate)}
              onNavigate={handleNavigate}
              className={cn(
                'h-[650px] md:h-[1000px]',
                '[&_.rbc-time-content]:overflow-y-auto',
                '[&_.rbc-time-content]:scrollbar-width-none',
                '[&_.rbc-time-content::-webkit-scrollbar]:hidden'
              )}
              components={{
                event: (props) => (
                  <EventCard {...props} selectedDoctor={selectedDoctor} />
                ),
              }}
              popup={true}
              eventPropGetter={() => ({
                style: {
                  backgroundColor: 'transparent',
                  padding: 0,
                  marginBottom: '4px',
                  border: 'none',
                  height: '42px',
                  boxShadow: 'none',
                },
              })}
              formats={{
                eventTimeRangeFormat: () => '',
                timeGutterFormat: 'h:mm A',
              }}
              onSelectEvent={openModalDetail}
              draggableAccessor={(event) => true}
              onEventDrop={({ event, start, end, allDay }: any) => {
                rescheduleModal(event.raw, dayjs(start).format('YYYY-MM-DD'));
              }}
            />
          ) : (
            <DnDCalendar
              localizer={localizer}
              events={events}
              selectable
              startAccessor="start"
              endAccessor="end"
              className={cn('h-[650px] md:h-[1000px]')}
              toolbar={false}
              components={{
                event: (props) => (
                  <EventCard {...props} selectedDoctor={selectedDoctor} />
                ),
                dateCellWrapper: (props) => <CustomDateCell {...props} />,
              }}
              date={new Date(selectedDate)}
              onNavigate={handleNavigate}
              onSelectSlot={(slotInfo: any) => {
                const clickedDate = dayjs(slotInfo.start).format('YYYY-MM-DD');
                setSelectedDate(clickedDate);
                setViewType('daily');
              }}
              popup
              eventPropGetter={() => ({
                style: {
                  backgroundColor: 'transparent',
                  padding: 0,
                  marginBottom: '4px',
                  border: 'none',
                  boxShadow: 'none',
                },
              })}
              onSelectEvent={openModalDetail}
              onEventDrop={({ event, start, end, allDay }: any) => {
                rescheduleModal(event.raw, dayjs(start).format('YYYY-MM-DD'));
              }}
              draggableAccessor={(event) => true}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
