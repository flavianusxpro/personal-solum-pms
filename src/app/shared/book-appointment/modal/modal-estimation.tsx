import { useModal } from '@/app/shared/modal-views/use-modal';
import CheckCircleIcon from '@core/components/icons/check-circle';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import {
  ActionIcon,
  Button,
  Flex,
  Input,
  NumberInput,
  NumberInputProps,
  Text,
  Title,
  usePatternFormat,
} from 'rizzui';
import StripeCheckout from '../../stripe-checkout/stripe-checkout';
import { routes } from '@/config/routes';

const STEP = {
  ESTIMATE_COST: 'estimate-cost',
  PAYMENT: 'payment',
  CONFIRM: 'confirm',
};

const ModalEstimationCost = () => {
  const { closeModal } = useModal();
  const router = useRouter();
  const intervalRef = React.useRef(0);

  const [step, setStep] = React.useState(STEP.ESTIMATE_COST);
  const [second, setSecond] = React.useState(5);

  useEffect(() => {
    if (step == STEP.CONFIRM) {
      startCountDown();
      setTimeout(() => {
        router.push(routes.consentForm);
      }, 5000);
    }

    return () => clearInterval(intervalRef.current);
  }, [closeModal, router, step]);

  const startCountDown = () => {
    intervalRef.current = window.setInterval(() => {
      setSecond((prev) => (prev ? prev - 1 : 0));
    }, 1000);
  };

  return (
    <div className="w-full rounded-md p-6">
      {step == STEP.ESTIMATE_COST && (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="">
            <Title as="h4" className="">
              Estimate Cost
            </Title>
          </div>
          <div className="grid w-full grid-cols-1 gap-2">
            <Flex justify="between" align="center">
              <Text>Total Cost:</Text>
              <Text>$100</Text>
            </Flex>
            <Flex justify="between" align="center">
              <Text>Sub Total:</Text>
              <Text>$10</Text>
            </Flex>
            <Flex justify="between" align="center">
              <Text>Coupon:</Text>
              <Text>-</Text>
            </Flex>
            <Flex justify="between" align="center">
              <Text>Merchant Fee:</Text>
              <Text>$10</Text>
            </Flex>
            <Flex justify="between" align="center">
              <Text>Coupon:</Text>
              <Input
                placeholder="Enter coupon code"
                inputClassName="text-sm"
                size="sm"
                suffix={
                  <ActionIcon
                    variant="text"
                    className="flex items-center gap-1 text-xs"
                    onClick={() => {}}
                  >
                    Apply
                  </ActionIcon>
                }
              />
            </Flex>
          </div>
          <Text>
            We require a payment method before this appointment may be
            confirmed.
          </Text>
          <Text>
            Your card will not be charged until after your appointment.
          </Text>
          <div className="rounded-lg bg-green-100 p-4">
            <Text>
              The estimated cost listed above does not include Medicare rebates.
              Your card will not be charged if you are eligible for bulk
              billing. Please ensure Medicare has your up-to-date bank account
              details.
            </Text>
          </div>
          <div className="flex w-full flex-col gap-2">
            <StripeCheckout onSuccess={() => setStep(STEP.CONFIRM)} />
            <Button variant="text" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* {step == STEP.PAYMENT && (
        <div className="grid grid-cols-1 items-center gap-4">
          <StripeCheckout onSuccess={() => setStep(STEP.CONFIRM)} />
          <div className="flex flex-col gap-2">
            <Button variant="text" onClick={() => setStep(STEP.ESTIMATE_COST)}>
              Cancel
            </Button>
          </div>
        </div>
      )} */}
      {step == STEP.CONFIRM && (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <CheckCircleIcon className="w-2h-28 h-28 text-green-600" />
          <div className="">
            <Title as="h4" className="">
              Appointment is confirmed
            </Title>
          </div>

          <Text>
            You will redirect to the consent form in {second} second...
          </Text>

          <div className="flex flex-col gap-2">
            <Button
              className="bg-green-600"
              onClick={() => router.push(routes.consentForm)}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalEstimationCost;
