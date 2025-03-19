"use client"

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiList } from '@/app/api/api_list';
import { ResponseAPI } from '@/types';
import DoctorTable from '@/app/shared/tableDataDoctor/table';
import AppointmentListTable from '@/app/shared/appointment/appointment-list/list';
import InvoiceTable from '@/app/shared/invoice/invoice-list/table';

const InvoiceList: React.FC = () => {
  const { data: invoices, error, isLoading } = useQuery<ResponseAPI>({
    queryKey: ['invoices'],
    queryFn: async () => await apiList.invoices(),
  });

  console.log(invoices)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching appointment data: {error.message}</div>;
  }

  return (
    <InvoiceTable data={invoices?.data as any} />

  );
};

export default InvoiceList;