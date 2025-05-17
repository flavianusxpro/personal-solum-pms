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
    width: 25,
    render: (time: string) => <Text className="font-medium">{time}</Text>,
  };

  const doctorColumns = doctorNames.map((name) => ({
    title: <HeaderCell title={name} />,
    dataIndex: name,
    key: name,
    width: 200,
    render: (value: string, data: Row) => getRowAppointment(value, data),
  }));

  return [baseColumn, ...doctorColumns];
};

function getRowAppointment(value: string, data: Row) {
  let bgColor = '';
  switch (data.type) {
    case 'INITIAL':
      bgColor = 'bg-green-300';
      break;
    case 'FOLLOWUP':
      bgColor = 'bg-blue-300';
      break;
    case 'SCRIPT_RENEWAL':
      bgColor = 'bg-yellow-300';
      break;
    default:
      bgColor = '';
      break;
  }

  return (
    <div className={cn('w-fit rounded-md p-2', bgColor)}>
      <Text className="font-medium">{value ?? '-'}</Text>
    </div>
  );
}
