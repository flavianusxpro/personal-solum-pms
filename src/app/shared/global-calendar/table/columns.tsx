'use client';

import { HeaderCell } from '@/app/shared/ui/table';
import { IGetRolesResponse } from '@/types/ApiResponse';
import { Text } from 'rizzui';

type Columns = {
  data: any[];
  openModal: (props: any) => void;
};

type Row = IGetRolesResponse['data'][number];

export const getColumns = ({ data, openModal }: Columns) => {
  // Get all doctor names from the first object (excluding "time")
  const doctorNames = Object.keys(data[0]).filter((key) => key !== 'time');

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
    render: (value: string) => <Text className="font-medium">{value}</Text>,
  }));

  return [baseColumn, ...doctorColumns];
};
