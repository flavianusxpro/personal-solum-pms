'use client';

import CheckCircleIcon from '@core/components/icons/check-circle';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Button, Text, Title } from 'rizzui';

export function ConsentFormConfirmation() {
  const router = useRouter();
  const intervalRef = React.useRef(0);
  const [second, setSecond] = React.useState(5);

  useEffect(() => {
    startCountDown();
    setTimeout(() => {
      router.replace('https://solumclinic.au/');
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [router]);

  const startCountDown = () => {
    intervalRef.current = window.setInterval(() => {
      setSecond((prev) => (prev ? prev - 1 : 0));
    }, 1000);
  };

  return (
    <div className="flex h-screen flex-col justify-center bg-gray-100">
      <div className="mx-auto my-10 grid w-full max-w-4xl gap-4 border bg-white p-10 text-center">
        <Title className="">Thank you</Title>

        <CheckCircleIcon className="mx-auto h-20 w-20 text-green-500" />
        <Text>Your Client Consent form has been completed</Text>

        <Text>You will redirect to the consent form in {second} second...</Text>

        <div className="flex flex-col justify-center gap-2">
          <Button
            className="w-fit"
            onClick={() => router.replace('https://solumclinic.au/')}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
