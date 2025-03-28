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
import DoctorTable from '@/app/shared/tableDataDoctor/table';

const DoctorList: React.FC = () => {
  const { data: doctors, error, isLoading } = useQuery<ResponseAPI>({
    queryKey: ['doctors'],
    queryFn: async () => await apiList.doctors(),
  });

  console.log(doctors)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching patient data: {error.message}</div>;
  }

  return (
    <DoctorTable data={doctors?.data} />
  );
};

export default DoctorList;