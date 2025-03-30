"use client"

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';
import ExportButton from '@/app/shared/export-button';
import PatientTable from '@/app/shared/tableDataPatient/table';
import { apiList } from '@/app/api/api_list';
import { Patient, ResponseAPI } from '@/types';

const PatientList: React.FC = () => {
  const { data: patients, error, isLoading } = useQuery<ResponseAPI>({
    queryKey: ['patients'],
    queryFn: async () => await apiList.patients(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching patient data: {error.message}</div>;
  }

  return (
    <PatientTable data={patients?.data as any} />
  );
};

export default PatientList;