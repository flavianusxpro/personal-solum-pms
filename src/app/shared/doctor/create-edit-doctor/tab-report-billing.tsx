'use client';

import { Flex } from 'rizzui';

import { billingHistoryData } from '@/data/billing-history';
import { exportToCSV } from '@core/utils/export-to-csv';
import BillingHistoryTable from './billing-history/table';
import FormGroup from '../../form-group';

export default function TabBillingAppointments({
  isView = false,
}: {
  isView?: boolean;
}) {
  function handleExportData() {
    exportToCSV(
      billingHistoryData,
      'Title,Amount,Date,Status,Shared',
      'billing_history'
    );
  }

  return (
    <Flex direction="col" gap="7">
      <FormGroup title="Report Billing" className="" />
      <BillingHistoryTable data={billingHistoryData} />
    </Flex>
  );
}
