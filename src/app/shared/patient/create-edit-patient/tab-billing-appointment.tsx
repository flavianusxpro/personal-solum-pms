'use client';

import { useState } from 'react';
import { Button, Title, Text, RadioGroup, AdvancedRadio, Flex } from 'rizzui';
import cn from '@core/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
  PiCheckCircleFill,
  PiFire,
  PiLightning,
  PiPlusBold,
  PiStackSimple,
} from 'react-icons/pi';
import AddBillingCardModalView from '@/app/shared/account-settings/modal/add-billing-card';
import MasterCardIcon from '@core/components/icons/mastercard';
import VisaIcon from '@core/components/icons/visa';
import ApplePayIcon from '@core/components/icons/apple-pay';
import { billingHistoryData } from '@/data/billing-history';
import { exportToCSV } from '@core/utils/export-to-csv';
import BillingHistoryTable from './billing-history/table';
import FormGroup from '../../form-group';
import AppointmentHistoryTable from './appointment-history/table';

const plansOptions = [
  {
    icon: <PiStackSimple className="h-4 w-4 text-gray-900" />,
    title: 'Basic plan $10/month',
    description:
      'Includes up to 10 users, 20GB individual data and access to all features.',
    value: 'basic',
  },
  {
    icon: <PiFire className="h-4 w-4 text-gray-900" />,
    title: 'Premium plan $20/month',
    description:
      'Includes up to 20 users, 40GB individual data and access to all features.',
    value: 'premium',
  },
  {
    icon: <PiLightning className="h-4 w-4 text-gray-900" />,
    title: 'Enterprise plan $40/month',
    description:
      'Unlimited users, unlimited individual data and access to all features.',
    value: 'enterprise',
  },
];

const cardsOptions = [
  {
    icon: <MasterCardIcon className="" />,
    title: 'Mastercard ending in 2321',
    expiry: '06/24',
    default: true,
    value: 'mastercard',
  },
  {
    icon: <VisaIcon className="" />,
    title: 'Visa ending in 22021',
    expiry: '06/23',
    default: false,
    value: 'visa',
  },
  {
    icon: <ApplePayIcon className="dark:invert" />,
    title: 'ApplePay ending in 2029',
    expiry: '06/24',
    default: false,
    value: 'applepay',
  },
];

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
      <FormGroup title="Billing" className="" />
      <BillingHistoryTable data={billingHistoryData} />
      <FormGroup title="Appointment" className="" />
      <AppointmentHistoryTable data={billingHistoryData} />
    </Flex>
  );
}
