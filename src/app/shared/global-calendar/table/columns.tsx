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
const localizer = dayjsLocalizer(dayjs);

const calendarToolbarClassName =
  '[&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:flex-col [&_.rbc-toolbar]:items-center @[56rem]:[&_.rbc-toolbar]:flex-row [&_.rbc-btn-group_button:hover]:bg-gray-300 [&_.rbc-btn-group_button]:duration-200 [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900 [@media(max-width:375px)]:[&_.rbc-btn-group:last-child_button]:!px-2.5 [&_.rbc-toolbar_>_*:last-child_>_button:focus]:!bg-primary [&_.rbc-toolbar_>_*:last-child_>_button:focus]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button:focus]:!text-gray-900 [&_.rbc-toolbar_>_*:last-child_>_button:hover]:!text-gray-900 dark:[&_.rbc-toolbar_>_*:last-child_>_button:hover]:!bg-gray-300 [&_.rbc-toolbar_>_*:last-child_>_button:hover]:!bg-gray-300 [&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!bg-primary-dark [&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-900';

const rtcEventClassName =
  '[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-event]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:hover]:!text-gray-0 dark:[&_.rbc-toolbar_>_*:last-child_>_button.rbc-active:focus]:!text-gray-0';

type Columns = {
  data: any[];
  openModal: (props: any) => void;
};

type Row = {
  time: string;
  [key: string]: string;
  type: string;
};

export const getColumns = ({ data, openModal }: Columns) => {
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
    title: <HeaderCell title={name} />,
    dataIndex: name,
    key: name,
    render: (value: any, row: Row) =>
      getRowAppointment(value, row.type, openModal),
  }));

  return [baseColumn, ...doctorColumns];
};

function getRowAppointment(
  value: any,
  type: string,
  openModal: (props: any) => void
) {
  let bgColor = '';
  if (type?.toLowerCase().includes('initial')) {
    bgColor = 'bg-green-600';
  } else if (type?.toLowerCase().includes('follow')) {
    bgColor = 'bg-blue-600';
  } else if (type?.toLowerCase().includes('script')) {
    bgColor = 'bg-yellow-600';
  } else if (type?.toLowerCase().includes('rescheduled')) {
    bgColor = 'bg-pink-600';
  } else {
    bgColor = 'bg-gray-600';
  }

  if (!value) return null;
  const patientName =
    `${value.patient?.first_name ?? ''} ${value.patient?.last_name ?? ''}`.trim();

  const handleOpenModal = () => {
    openModal({
      view: <ModalAppointmentDetails data={value} />,
      customSize: '700px',
    });
  };

  return (
    <div
      onClick={handleOpenModal}
      className={cn('w-fit cursor-pointer rounded-md p-2', bgColor)}
    >
      <Text className="font-medium text-white">{patientName || '-'}</Text>
    </div>
  );
}
