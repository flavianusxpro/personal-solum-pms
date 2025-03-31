'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PatientTable from '@/app/shared/patient/table/table';
import { apiList } from '@/app/api/api_list';

const PatientList: React.FC = () => {
  const {
    data: patients,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => await apiList.patients(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching patient data: {error.message}</div>;
  }

  return <PatientTable data={patients?.data as any} />;
};

export default PatientList;
