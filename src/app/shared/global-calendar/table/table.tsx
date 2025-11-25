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
import { useColorPresetName } from '@/layouts/settings/use-theme-color';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import cn from '@/core/utils/class-names';
import ModalAppointmentDetails from '../modal/ModalAppointmentDetail';
import { useGetAllDoctors } from '@/hooks/useDoctor';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import RescheduleAppointmentForm, {
  formRescheduleDataAtom,
} from '../reschedule';
import { useAtom } from 'jotai';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import toast from 'react-hot-toast';
import ConfirmationView from '../reschedule/ConfirmationView';

const DnDCalendar = withDragAndDrop<any, any>(Calendar);

const localizer = dayjsLocalizer(dayjs);

const EventCard = ({ event, selectedDoctor }: any) => {
  const doctorColors: Record<string, string> = {
    emily: 'red',
    benjamin: 'blue',
    isabella: 'green',
    daniel: 'purple',
    sophie: 'amber',
    olivia: 'pink',
  };

  const doctorName = event.doctor?.toLowerCase() || '';
  const matchedKey = Object.keys(doctorColors).find((key) =>
    doctorName.includes(key)
  );
  const color = matchedKey ? doctorColors[matchedKey] : 'gray';

  const colorClasses: Record<string, string> = {
    red: 'bg-red-50 text-green-600',
    blue: 'bg-blue-50 text-green-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-green-600',
    amber: 'bg-amber-50 text-green-600',
    gray: 'bg-gray-50 text-green-600',
    pink: 'bg-pink-50 text-green-600',
  };

  return (
    <div
      className={`rounded-md border-none px-3 py-1 shadow-sm ${colorClasses[color]} w-full min-w-0 whitespace-normal break-words`}
    >
      {!selectedDoctor && (
        <div className="whitespace-normal break-words text-xs font-semibold leading-snug">
          {event.time} - Dr. {event.doctor}
        </div>
      )}

      <div className="whitespace-normal break-words text-xs leading-snug text-gray-500">
        {event.patient}
      </div>
    </div>
  );
};

const EventCardByPatient = ({ event }: any) => {
  const doctorColors: Record<string, string> = {
    emily: 'red',
    benjamin: 'blue',
    isabella: 'green',
    daniel: 'purple',
    sophie: 'amber',
    olivia: 'pink',
  };

  const doctorName = event.doctor?.toLowerCase() || '';
  const matchedKey = Object.keys(doctorColors).find((key) =>
    doctorName.includes(key)
  );
  const color = matchedKey ? doctorColors[matchedKey] : 'gray';

  const colorClasses: Record<string, string> = {
    red: 'bg-red-50 text-green-600',
    blue: 'bg-blue-50 text-green-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-green-600',
    amber: 'bg-amber-50 text-green-600',
    gray: 'bg-gray-50 text-green-600',
    pink: 'bg-pink-50 text-green-600',
  };

  return (
    <div
      className={`rounded-md border-none px-3 py-1 shadow-sm ${colorClasses[color]} w-full min-w-0 whitespace-normal break-words`}
    >
      <div className="whitespace-normal break-words text-xs leading-snug text-gray-500">
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

  const [selectedDoctor, setSelectedDoctor] = useState<string | number>(0);
  const { colorPresetName } = useColorPresetName();
  const [formData, setFormData] = useAtom(formRescheduleDataAtom);
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
      if (!prevDateObj.isValid())
        return viewType === 'monthly'
          ? dayjs().subtract(1, 'month').format('YYYY-MM')
          : dayjs().subtract(1, 'day').format('YYYY-MM-DD');

      return viewType === 'monthly'
        ? prevDateObj.subtract(1, 'month').format('YYYY-MM')
        : prevDateObj.subtract(1, 'day').format('YYYY-MM-DD');
    });
  }

  function nextDate() {
    setSelectedDate((prevDate) => {
      const prevDateObj = dayjs(prevDate);
      if (!prevDateObj.isValid())
        return viewType === 'monthly'
          ? dayjs().add(1, 'month').format('YYYY-MM')
          : dayjs().add(1, 'day').format('YYYY-MM-DD');

      return viewType === 'monthly'
        ? prevDateObj.add(1, 'month').format('YYYY-MM')
        : prevDateObj.add(1, 'day').format('YYYY-MM-DD');
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
      const timeStr = current.toTimeString().slice(0, 5); // HH:MM
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
          slot[doc] = ''; // initialize doctor field with empty string
        });
        return slot;
      });

      data.forEach((item) => {
        const doctorName =
          `${item.doctor?.first_name || ''} ${item.doctor?.last_name || ''}`.trim();

        // Extract time directly from the date string to avoid timezone conversion
        let timeStr: string;

        // Parse time directly from the ISO string format: "2025-09-10T09:00:00.000Z"
        const timeMatch = item.date.match(/T(\d{2}):(\d{2}):(\d{2})/);
        if (timeMatch) {
          const hour = timeMatch[1];
          const minute = timeMatch[2];
          timeStr = `${hour}:${minute}`;
        } else {
          // Fallback to local_date if direct extraction fails
          if (item.local_date) {
            const localTimeMatch = item.local_date.match(
              /(\d{1,2}):(\d{2})\s*(AM|PM)/
            );
            if (localTimeMatch) {
              let hour = parseInt(localTimeMatch[1]);
              const minute = localTimeMatch[2];
              const period = localTimeMatch[3];

              // Convert 12-hour format to 24-hour format
              if (period === 'PM' && hour !== 12) {
                hour += 12;
              } else if (period === 'AM' && hour === 12) {
                hour = 0;
              }

              timeStr = `${hour.toString().padStart(2, '0')}:${minute}`;
            } else {
              // Fallback to parsing the date string directly
              const localDate = new Date(item.local_date);
              timeStr = localDate.toTimeString().slice(0, 5);
            }
          } else {
            // Last resort: use UTC time
            const appointmentTime = dayjs.utc(item.date);
            timeStr = appointmentTime.format('HH:mm');
          }
        }

        const slot = result.find((r) => r.time === timeStr);

        if (slot && item.patient) {
          // slot[doctorName] =
          //   `${item.patient.first_name} ${item.patient.last_name}`;
          slot[doctorName] = item;
          slot['type'] = item.type || ''; // additional sibling field
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
    (
      row: any,
      newDate: string,
      newDoctorName?: string,
      newTime?: string
    ) => {
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

  const events =
    data &&
    data.data?.map((item) => ({
      title: `Dr. ${item.doctor?.first_name} ${item.doctor?.last_name}`,
      doctor: `${item.doctor?.first_name} ${item.doctor?.last_name}`,
      patient: `${item.patient?.first_name} ${item.patient?.last_name}`,
      time: new Date(item.date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      start: new Date(item.date),
      end: new Date(new Date(item.date).getTime() + 60 * 60 * 1000),
      resourceId: item.doctor?.id,
      raw: item,
    }));

  console.log(events);

  const openModalDetail = (data: any) => {
    openModal({
      view: <ModalAppointmentDetails data={data} />,
      customSize: '700px',
    });
  };

  useEffect(() => {
    refetch();
  }, [selectedDate, refetch]);

  useEffect(() => {
    setSelectedDate((prev) =>
      viewType === 'monthly'
        ? dayjs(prev).locale('en').format('YYYY-MM')
        : dayjs(prev).format('YYYY-MM-DD')
    );
  }, [viewType]);

  const doctorName = optionDoctors.find((item: any) => {
    return item.value == selectedDoctor;
  });

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
                    {`${startOfMonth} - ${endOfMonth}`}
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
              <ControlledTable
                isLoading={isLoadingGetAppointments}
                showLoadingText={true}
                data={tableData ?? []}
                // @ts-ignore
                columns={columns}
                variant="bordered"
              />
            </DndProvider>
          ) : (
            // <Calendar
            //   localizer={localizer}
            //   startAccessor="start"
            //   endAccessor="end"
            //   events={events}
            //   defaultView="day"
            //   views={['day']}
            //   resources={tableData || []} // array of doctors
            //   resourceIdAccessor="id"
            //   resourceTitleAccessor="name"
            //   step={15} // interval per 15 menit
            //   timeslots={1}
            //   style={{ height: 800 }}
            //   components={{
            //     event: EventCard,
            //   }}
            //   toolbar={false}
            //   draggableAccessor={() => true}
            //   onEventDrop={({ event, start, end, resourceId }: any) => {
            //     console.log('Dipindah ke:', start, 'dokter:', resourceId);
            //     rescheduleModal(event, dayjs(start).format('YYYY-MM-DD'));
            //   }}
            // />
            <DnDCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              className={cn('h-[650px] md:h-[1000px]')}
              toolbar={false}
              components={{
                event: (props) => (
                  <EventCard {...props} selectedDoctor={selectedDoctor} />
                ),
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
                // event = data asli
                // start & end = tanggal baru setelah di-drag
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
