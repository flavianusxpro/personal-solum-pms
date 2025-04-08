'use client';

import { Flex } from 'rizzui';

import FormGroup from '../../ui/form-group';
import ReportBillingListStats from './stats';

export default function TabBillingAppointments({
  isView = false,
}: {
  isView?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 @container">
      <FormGroup title="Report Billing" className="" />
      <ReportBillingListStats />
    </div>
  );
}
