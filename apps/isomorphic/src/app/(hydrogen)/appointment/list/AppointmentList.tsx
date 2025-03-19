"use client"

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiList } from '@/app/api/api_list';
import { ResponseAPI } from '@/types';
import DoctorTable from '@/app/shared/tableDataDoctor/table';
import AppointmentListTable from '@/app/shared/appointment/appointment-list/list';

const AppointmentList: React.FC = () => {
  const { data: appointments, error, isLoading } = useQuery<ResponseAPI>({
    queryKey: ['appointments'],
    queryFn: async () => await apiList.appointments(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching appointment data: {error.message}</div>;
  }

  return (
    <AppointmentListTable data={appointments?.data as any} />
  );
};

export default AppointmentList;