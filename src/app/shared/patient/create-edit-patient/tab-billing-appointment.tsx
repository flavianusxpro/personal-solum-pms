'use client';

import { Button, Flex } from 'rizzui';
import { PiFire, PiLightning, PiPlusBold, PiStackSimple } from 'react-icons/pi';
import MasterCardIcon from '@core/components/icons/mastercard';
import VisaIcon from '@core/components/icons/visa';
import ApplePayIcon from '@core/components/icons/apple-pay';
import { billingHistoryData } from '@/data/billing-history';
import { exportToCSV } from '@core/utils/export-to-csv';
import BillingHistoryTable from './billing-history/table';
import FormGroup from '../../ui/form-group';
import AppointmentHistoryTable from './appointment-history/table';

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
      <FormGroup title="Billing" className="flex w-full justify-between">
        <Button>
          <PiPlusBold className="mr-2 h-4 w-4" />
          Create Invoice{' '}
        </Button>
      </FormGroup>
      <BillingHistoryTable />

      <FormGroup title="Appointment" className="flex w-full justify-between">
        <Button>
          <PiPlusBold className="mr-2 h-4 w-4" />
          Create Appointment{' '}
        </Button>
      </FormGroup>
      <AppointmentHistoryTable />
    </Flex>
  );
}
