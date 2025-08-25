'use client';

import { HeaderCell } from '@/app/shared/ui/table';
import cn from '@/core/utils/class-names';
import { Text } from 'rizzui';

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
    title: <HeaderCell title="Time" />,
    dataIndex: 'time',
    key: 'time',
    width: 1,
    render: (time: string) => <Text className="font-medium">{time}</Text>,
  };

  const doctorColumns = doctorNames.map((name) => ({
    title: <HeaderCell title={name} />,
    dataIndex: name,
    key: name,
    render: (value: string, data: Row) => getRowAppointment(value, data.type),
  }));

  return [baseColumn, ...doctorColumns];
};

function getRowAppointment(value: string, type: string) {
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

  return (
    <div className={cn('w-fit rounded-md p-2', bgColor)}>
      <Text className="font-medium text-white">{value ?? '-'}</Text>
    </div>
  );
}
