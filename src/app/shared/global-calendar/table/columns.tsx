'use client';

import { HeaderCell } from '@/app/shared/ui/table';
import cn from '@/core/utils/class-names';
import { Text } from 'rizzui';
import ModalAppointmentDetails from '../modal/ModalAppointmentDetail';
import {
  Calendar,
  dayjsLocalizer,
  NavigateAction,
  ToolbarProps,
  View,
} from 'react-big-calendar';
import dayjs from 'dayjs';
import { useColorPresetName } from '@/layouts/settings/use-theme-color';
import { useDrag, useDrop } from 'react-dnd';

// tipe unik untuk item yang di-drag
const localizer = dayjsLocalizer(dayjs);

const calendarToolbarClassName =
  '[&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:flex-col [&_.rbc-toolbar]:items-center @[56rem]:[&_.rbc-toolbar]:flex-row [&_.rbc-btn-group_button:hover]:bg-gray-300 [&_.rbc-btn-group_button]:duration-200 [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900 [@media(max-width:375px)]:[&_.rbc-btn-group:last-child_button]:!px-2.5 [&_.rbc-toolbar_>_*:last-child_>_button:focus]:!bg-primary [&_.rbc-toolbar_>_*:last-child_>_button:focus]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button:focus]:!text-gray-900 [&_.rbc-toolbar_>_*:last-child_>_button:hover]:!text-gray-900 dark:[&_.rbc-toolbar_>_*:last-child_>_button:hover]:!bg-gray-300 [&_.rbc-toolbar_>_*:last-child_>_button:hover]:!bg-gray-300 [&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!bg-primary-dark [&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-900';

const rtcEventClassName =
  '[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:focus]:!text-gray-0';

type Columns = {
  data: any[];
  openModal: (props: any) => void;
  handleDrop?: any;
};

type Row = {
  time: string;
  [key: string]: string;
  type: string;
};

export const getColumns = ({ data, openModal, handleDrop }: Columns) => {
  const doctorNames = Object.keys(data[0]).filter(
    (key) => key !== 'time' && key !== 'type'
  );
  const baseColumn = {
    title: <HeaderCell title="Time" className="justify-center" />,
    dataIndex: 'time',
    key: 'time',
    width: 100,
    render: (time: string) => {
      return <Text className="text-center font-medium">{time}</Text>;
    },
  };

  const doctorColumns = doctorNames.map((name) => ({
    title: <HeaderCell title={`Dr. ${name}`} />,
    dataIndex: name,
    key: name,
    render: (value: any, row: Row) =>
      // getRowAppointment(value, row.type, openModal),
      getRowAppointment(value, row.type, openModal, row, name, handleDrop),
  }));

  return [baseColumn, ...doctorColumns];
};

// function getRowAppointment(
//   value: any,
//   type: string,
//   openModal: (props: any) => void
// ) {
//   const ITEM_TYPE = 'APPOINTMENT';
//   let bgColor = '';
//   if (type?.toLowerCase().includes('initial')) {
//     bgColor = 'bg-green-600';
//   } else if (type?.toLowerCase().includes('follow')) {
//     bgColor = 'bg-blue-600';
//   } else if (type?.toLowerCase().includes('script')) {
//     bgColor = 'bg-yellow-600';
//   } else if (type?.toLowerCase().includes('rescheduled')) {
//     bgColor = 'bg-pink-600';
//   } else {
//     bgColor = 'bg-gray-600';
//   }

//   if (!value) return null;
//   const patientName =
//     `${value.patient?.first_name ?? ''} ${value.patient?.last_name ?? ''}`.trim();

//   // 🎯 Setup drag
//   const [{ isDragging }, dragRef] = useDrag({
//     type: ITEM_TYPE,
//     item: { appointment: value },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   // 🎯 Setup drop
//   const [, dropRef] = useDrop({
//     accept: ITEM_TYPE,
//     drop: (item: any) => {
//       console.log('📦 Dipindah ke:', value, '➡️ dari:', item.appointment);
//       // TODO: update state atau panggil API untuk ubah dokter/jam
//     },
//   });

//   const handleOpenModal = () => {
//     openModal({
//       view: <ModalAppointmentDetails data={value} />,
//       customSize: '700px',
//     });
//   };

//   return (
//     <div
//       ref={(node) => {
//         dragRef(dropRef(node));
//       }}
//       onClick={handleOpenModal}
//       className={cn('w-fit cursor-pointer rounded-md p-2', bgColor)}
//     >
//       <Text className="font-medium text-white">{patientName || '-'}</Text>
//     </div>
//   );
// }

function getRowAppointment(
  value: any,
  type: string,
  openModal: any,
  row?: any,
  doctor?: string,
  onDrop?: any
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
}: any) {
  const ITEM_TYPE = 'APPOINTMENT';

  let bgColor = '';
  if (type?.toLowerCase().includes('initial')) bgColor = 'bg-green-600';
  else if (type?.toLowerCase().includes('follow')) bgColor = 'bg-blue-600';
  else if (type?.toLowerCase().includes('script')) bgColor = 'bg-yellow-600';
  else if (type?.toLowerCase().includes('rescheduled'))
    bgColor = 'bg-pink-600';
  else bgColor = 'bg-gray-600';

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
      // Prevent dropping on itself
      if (item.appointment.id === value.id) return;
      console.log(
        `✅ Dropped ${item.appointment.id} to ${doctor} at ${row.time}`
      );
      onDrop?.(item.appointment, doctor, row.time);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleOpenModal = () => {
    openModal({
      view: <ModalAppointmentDetails data={value} />,
      customSize: '700px',
    });
  };

  return (
    <div
      ref={(instance) => {
        dragRef(instance);
        dropRef(instance);
      }}
      onClick={handleOpenModal}
      className={cn(
        'relative w-fit cursor-pointer rounded-md p-2 transition-opacity',
        bgColor,
        isDragging && 'opacity-50'
      )}
    >
      {isOver && <div className="absolute inset-0 rounded-md bg-black/60" />}
      <Text className="font-medium text-white">
        {`${value.patient?.first_name ?? ''} ${
          value.patient?.last_name ?? ''
        }`.trim() || '-'}
      </Text>
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
        'h-12 w-full', // Important: give it a size
        isOver ? 'bg-blue-100' : 'bg-transparent'
      )}
    />
  );
}
