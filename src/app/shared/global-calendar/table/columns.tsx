'use client';

import { HeaderCell } from '@/app/shared/ui/table';
import cn from '@/core/utils/class-names';
import { Badge, Flex, Text } from 'rizzui';
import ModalAppointmentDetails, { getPaymentStatusBadge } from '../modal/ModalAppointmentDetail';
import dayjs from 'dayjs';
import { useColorPresetName } from '@/layouts/settings/use-theme-color';
import { useDrag, useDrop } from 'react-dnd';
import AppointmentDetails from '../../appointment/appointment-list/list/appointment-details';
import CSelect from '../../ui/select';
import { getAptStatusBadge } from '../../appointment/appointment-list/list/columns';
import ShowConfirm from '../../appointment/modal/confirm-modal';
import toast from 'react-hot-toast';
import { useUpdateAppointment } from '@/hooks/useAppointment';
import AppointmentDetailsCalendar from './AppointmentDetailsCalendar';

const calendarToolbarClassName =
  '[&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:flex-col [&_.rbc-toolbar]:items-center @[56rem]:[&_.rbc-toolbar]:flex-row [&_.rbc-btn-group_button:hover]:bg-gray-300 [&_.rbc-btn-group_button]:duration-200 [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900 [@media(max-width:375px)]:[&_.rbc-btn-group:last-child_button]:!px-2.5 [&_.rbc-toolbar_>_*:last-child_>_button:focus]:!bg-primary [&_.rbc-toolbar_>_*:last-child_>_button:focus]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button:focus]:!text-gray-900 [&_.rbc-toolbar_>_*:last-child_>_button:hover]:!text-gray-900 dark:[&_.rbc-toolbar_>_*:last-child_>_button:hover]:!bg-gray-300 [&_.rbc-toolbar_>_*:last-child_>_button:hover]:!bg-gray-300 [&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!bg-primary-dark [&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-900';

const rtcEventClassName =
  '[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:focus]:!text-gray-0';

type Columns = {
  data: any[];
  openModal: (props: any) => void;
  handleDrop?: any;
  closeModal?: (props: any) => void;
};

type Row = {
  time: string;
  [key: string]: string;
  type: string;
};

export const getColumns = ({ data, openModal, handleDrop, closeModal }: Columns) => {
  const nearestDoctorName = data[0]?._nearestDoctor || '';
  
  const doctorNames = Object.keys(data[0]).filter(
    (key) => key !== 'time' && key !== 'type' && key !== '_nearestDoctor' && 
            key !== '_scheduleStart' && key !== '_scheduleEnd'
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
        // Only apply background if it's the nearest doctor AND within schedule time
        if (isNearestDoctor && row._scheduleStart && row._scheduleEnd) {
          // Get current row time in 24h format
          const currentTime = row.time;
          const timeMatch = currentTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
          
          if (timeMatch) {
            let hour = parseInt(timeMatch[1]);
            const minute = timeMatch[2];
            const period = timeMatch[3].toUpperCase();
            
            if (period === 'PM' && hour !== 12) hour += 12;
            if (period === 'AM' && hour === 12) hour = 0;
            
            const currentTime24 = `${hour.toString().padStart(2, '0')}:${minute}`;
            
            // Check if current time is within schedule range
            if (currentTime24 >= row._scheduleStart && currentTime24 <= row._scheduleEnd) {
              return {
                style: { backgroundColor: '#EBF1FE' }
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
  type: string,
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

  return (
    <div
      ref={(instance) => {
        dragRef(instance);
        dropRef(instance);
      }}
      onClick={handleOpenModal}
      className={cn(
        // 'relative px-3 py-1.5 cursor-pointer w-full h-10 transition-opacity flex items-center flex-wrap gap-3',
        'relative px-2 cursor-pointer w-full h-7 transition-opacity flex items-center gap-2 leading-none',
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

        <div onClick={(e) => e.stopPropagation()}>
          <CSelect
            className="min-w-[140px] bg-white rounded-lg"
            dropdownClassName="h-auto"
            placeholder="Select Status"
            options={aptStatusOptions}
            size="sm"
            onChange={handleChange}
            value={value?.status}
            displayValue={(option: { value: number }) =>
              getAptStatusBadge(option.value)
            }
          />
        </div>

        <div className="h-4 w-px bg-gray-300" />

        <div className='bg-white py-[6px] px-4 rounded-lg'>
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
