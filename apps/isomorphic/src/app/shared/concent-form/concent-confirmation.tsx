'use client';

import CheckCircleIcon from '@core/components/icons/check-circle';
import React from 'react';
import { Text, Title } from 'rizzui';

export function ConsentFormConfirmation() {
  return (
    <div className="flex h-screen flex-col justify-center bg-gray-100">
      <div className="mx-auto my-10 grid w-full max-w-4xl gap-4 border bg-white p-10 text-center">
        <Title className="">Thank you</Title>

        <CheckCircleIcon className="mx-auto h-20 w-20 text-green-500" />
        <Text>Your Client Consent form has been completed</Text>
      </div>
    </div>
  );
}
