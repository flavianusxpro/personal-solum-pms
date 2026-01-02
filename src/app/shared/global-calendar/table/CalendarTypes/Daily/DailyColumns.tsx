'use client';

import { HeaderCell } from '@/app/shared/ui/table';
import cn from '@/core/utils/class-names';
import { Badge, Flex, Text } from 'rizzui';
import { useDrag, useDrop } from 'react-dnd';

import toast from 'react-hot-toast';
import { useUpdateAppointment } from '@/hooks/useAppointment';
import CSelect from '@/core/ui/select';
import { getPaymentStatusBadge } from '../../../modal/ModalAppointmentDetail';
import ShowConfirm from '@/app/shared/appointment/modal/confirm-modal';
import AppointmentDetailsCalendar from '../../AppointmentDetailsCalendar';
import BooingAppointmentCalendar from './BookingAppointmentCalendar';

interface Columns {
  data: any[];
  openModal: (props: any) => void;
  handleDrop?: any;
  closeModal?: (props: any) => void;
  selectedDate?: string;
  clinicId?: number;
  refetch: () => void
};

interface Row {
  time: string;
  type?: string;
  _nearestDoctor?: string;
  _scheduleStart?: string;
  _scheduleEnd?: string;
  _doctorId?: number;
  _doctorFirstName?: string;
  _doctorLastName?: string;
  [key: string]: any;
}

export const getColumns = ({
  data,
  openModal,
  handleDrop,
  closeModal,
  selectedDate,
  clinicId,
  refetch
}: Columns) => {
  const nearestDoctorName = data[0]?._nearestDoctor || '';

  const doctorNames = Object.keys(data[0]).filter(
    (key) => !key.startsWith('_') && key !== 'time' && key !== 'type'
  );

  const baseColumn = {
    title: <HeaderCell title="Time" className="justify-center" />,
    dataIndex: 'time',
    key: 'time',
    width: 70,
    render: (time: string) => {
      return <Text className="text-center font-normal text-sm">{time}</Text>;
    },
  };

  const doctorColumns = doctorNames.map((name) => {
    const isNearestDoctor = name === nearestDoctorName;

    return {
      title: (
        <HeaderCell
          title={`Dr. ${name}`}
        />
      ),
      dataIndex: name,
      key: name,
      onCell: (row: Row) => {
        const isWithinSchedule = isNearestDoctor &&
          row._scheduleStart &&
          row._scheduleEnd;

        if (isWithinSchedule) {
          const currentTime = row.time;
          const timeMatch = currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);

          if (timeMatch) {
            let hour = parseInt(timeMatch[1]);
            const minute = timeMatch[2];
            const period = timeMatch[3].toUpperCase();

            if (period === 'PM' && hour !== 12) hour += 12;
            if (period === 'AM' && hour === 12) hour = 0;

            const currentTime24 = `${hour.toString().padStart(2, '0')}:${minute}`;

            const isInRange = currentTime24 >= (row._scheduleStart ?? '') &&
              currentTime24 <= (row._scheduleEnd ?? '');

            if (isInRange) {
              return {
                style: {
                  backgroundColor: '#EBF1FE',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                },
                onClick: () => {
                  if (row._doctorFirstName && row._doctorLastName && row._doctorId) {
                    const appointmentData = {
                      clinicId: clinicId,
                      date: selectedDate, 
                      time: row.time,
                      doctor: {
                        id: row._doctorId,
                        first_name: row._doctorFirstName,
                        last_name: row._doctorLastName,
                      }
                    };

                    openModal({
                      view: <BooingAppointmentCalendar data={appointmentData} refetch={refetch} />,
                      customSize: '1100px',
                    });
                  }
                },
                onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.style.backgroundColor = '#D6E4FD';
                },
                onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
                  e.currentTarget.style.backgroundColor = '#EBF1FE';
                }
              };
            }
          }
        }
        return {};
      },
      render: (value: any, row: Row) =>
        getRowAppointment(value, row.type, openModal, row, name, handleDrop, closeModal),
    };
  });

  return [baseColumn, ...doctorColumns];
};

function getRowAppointment(
  value: any,
  type: string | undefined,
  openModal: any,
  row?: any,
  doctor?: string,
  onDrop?: any,
  closeModal?: any,
) {
  if (value) {
    return (
      <AppointmentCell
        value={value}
        type={type}
        openModal={openModal}
        row={row}
        doctor={doctor}
        onDrop={onDrop}
        closeModal={closeModal}
      />
    );
  }
  return <DropCell row={row} doctor={doctor} onDrop={onDrop} />;
}

export function AppointmentCell({
  value,
  type,
  openModal,
  row,
  doctor,
  onDrop,
  closeModal,
}: any) {
  const ITEM_TYPE = 'APPOINTMENT';
  let bgColor = '';
  const appointmentType = value?.type?.toLowerCase() || '';

  if (appointmentType.includes('initial')) {
    bgColor = '#1FA551';
  } else if (appointmentType.includes('follow')) {
    bgColor = '#0078D7';
  } else if (appointmentType.includes('transfer')) {
    bgColor = '#F4A523';
  } else if (appointmentType.includes('reschedule')) {
    bgColor = '#E84757';
  } else {
    bgColor = '#6B7280';
  }

  if (!value) return null;

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { appointment: value },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: any) => {
      if (item.appointment.id === value.id) return;
      onDrop?.(item.appointment, doctor, row.time);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleOpenModal = () => {
    openModal({
      view: <AppointmentDetailsCalendar data={value} />,
      customSize: '1100px',
    });
  };

  const aptStatusOptions = [
    { label: 'Draft', value: 1 },
    { label: 'Scheduled', value: 2 },
    { label: 'Checked In', value: 3 },
    { label: 'Finished', value: 4 },
    { label: 'Cancelled', value: 5 },
    { label: 'On Going', value: 6 },
    { label: 'No Show', value: 7 },
  ]

  const getAptType = (type: string) => {
    const colorMap: Record<string, string> = {
      "Initial Consult": "#1FA551",
      "Follow Up": "#0078D7",
      "Transfer": "#F4A523",
      "Reschedule": "#E84757",
    };

    const text = type || "Unknown";
    const dotColor = colorMap[type] || "#999999";

    return (
      <Flex gap="1" align="center">
        <Badge style={{ backgroundColor: dotColor }} renderAsDot />
        <Text className="font-medium" style={{ color: dotColor }}>
          {text}
        </Text>
      </Flex>
    );
  };

  const { mutate } = useUpdateAppointment();
  const id = value?.id
  const handleSubmitStatus = (value: number) => {
    mutate(
      { id, status: value },
      {
        onSuccess: () => {
          toast.success('Status updated successfully');
          closeModal();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Error updating status'
          );
          closeModal();
        },
      }
    );
  };

  const showConfirmModal = (
    id: number,
    onClick: (value: number) => void,
    status: string,
  ) => {
    closeModal(),
      openModal({
        view: <ShowConfirm onClick={onClick} status={status} id={id} />,
        customSize: '550px',
      });
  };

  const handleChange = (value: number) => {
    if (value == 1) {
      showConfirmModal(value, handleSubmitStatus, 'Draft');
    } else if (value == 2) {
      showConfirmModal(value, handleSubmitStatus, 'Scheduled');
    } else if (value == 3) {
      showConfirmModal(value, handleSubmitStatus, 'Check In');
    } else if (value == 4) {
      showConfirmModal(value, handleSubmitStatus, 'Finished');
    } else if (value == 5) {
      showConfirmModal(value, handleSubmitStatus, 'Cancelled');
    } else if (value == 6) {
      showConfirmModal(value, handleSubmitStatus, 'On Going');
    } else if (value == 7) {
      showConfirmModal(value, handleSubmitStatus, 'No Show');
    } else {
      handleSubmitStatus(value);
    }
  };
  const getAptStatusBadge = (status: number | string) => {
    switch (status) {
      case 7:
        return (
          <Flex gap="1" align="center">
            <Badge color="warning" renderAsDot />
            <p className="font-medium text-sm text-green-dark">No Show</p>
          </Flex>
        );
      case 6:
        return (
          <Flex gap="1" align="center">
            <Badge color="info" renderAsDot />
            <p className="font-medium text-sm text-green-500">On Going</p>
          </Flex>
        );
      case 5:
        return (
          <Flex gap="1" align="center">
            <Badge color="danger" renderAsDot />
            <p className="font-medium text-sm text-red">Cancelled</p>
          </Flex>
        );
      case 4:
        return (
          <Flex gap="1" align="center">
            <Badge color="success" renderAsDot />
            <p className="font-medium text-sm text-green-dark">Completed</p>
          </Flex>
        );
      case 3:
        return (
          <Flex gap="1" align="center">
            <Badge color="info" renderAsDot />
            <p className="font-medium text-sm text-blue-500">Checked In</p>
          </Flex>
        );
      case 2:
        return (
          <Flex gap="1" align="center">
            <Badge color="warning" renderAsDot />
            <p className="font-medium text-sm text-yellow-600">Scheduled</p>
          </Flex>
        );
      case 1:
        return (
          <Flex gap="1" align="center">
            <Badge color="info" renderAsDot />
            <p className="font-medium text-sm text-red-dark">Draft</p>
          </Flex>
        );
      default:
        return (
          <div className="flex items-center">
            <Badge renderAsDot className="bg-gray-600" />
            <p className="font-medium text-sm text-blue-600">
              N/A
            </p>
          </div>
        );
    }
  }

  return (
    <div
      ref={(instance) => {
        dragRef(instance);
        dropRef(instance);
      }}
      onClick={handleOpenModal}
      className={cn(
        'relative px-2 py-6 cursor-pointer w-full h-7 transition-opacity flex items-center gap-2 leading-none',
        bgColor,
        isDragging && 'opacity-50',
        value.type === 'Initial Consult' && 'bg-[#3291B6]',
        value.type === 'Follow Up Appointment' && 'bg-[#BB8ED0]',
        value.type === 'Transfer' && 'bg-[#E0A8A8]',
        value.type === 'Reschedule' && 'bg-[#E84757]',
      )}
    >
      {isOver && <div className="absolute inset-0 rounded-md bg-black/60" />}
      <div className='flex items-center gap-4'>
        <div>
          <Text className="font-medium text-white">
            {`${value.patient?.first_name ?? ''} ${value.patient?.last_name ?? ''}`.trim() || '-'}
          </Text>
        </div>

        <div className="h-4 w-px bg-gray-300" />

        <div onClick={(e) => e.stopPropagation()} className="h-[33px]">
          <CSelect
            className="min-w-[140px] bg-white rounded-lg h-[33px]"
            dropdownClassName="h-auto"
            placeholder="Select Status"
            size='sm'
            options={aptStatusOptions}
            onChange={handleChange}
            value={value?.status}
            displayClassName='text-sm'
            displayValue={(option: { value: number }) =>
              getAptStatusBadge(option.value)
            }
          />
        </div>

        <div className="h-4 w-px bg-gray-300" />

        <div className='bg-white h-[33px] items-center px-4 flex justify-center rounded-lg'>
          {getPaymentStatusBadge(value?.payment?.status ?? 0)}
        </div>

      </div>
      {value?.type === 'Initial Consult' && (
        <>
          <div className="h-4 w-px bg-gray-300" />

          <div className="flex-1 flex items-center gap-2">
            <p className="text-sm font-medium text-white">Notes:</p>
            <p className="text-sm font-normal text-white">
              {value?.note ?? ''}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export function DropCell({ row, doctor, onDrop }: any) {
  const ITEM_TYPE = 'APPOINTMENT';

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: any) => {
      console.log(
        `✅ Dropped ${item.appointment.id} to ${doctor} at ${row.time}`
      );
      onDrop?.(item.appointment, doctor, row.time);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={(instance) => {
        dropRef(instance);
      }}
      className={cn(
        'h-7 w-full',
        isOver ? 'bg-blue-100' : 'bg-transparent'
      )}
    />
  );
}
