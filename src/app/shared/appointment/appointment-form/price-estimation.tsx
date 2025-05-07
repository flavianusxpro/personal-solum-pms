import { useModal } from '@/app/shared/modal-views/use-modal';
import CheckCircleIcon from '@core/components/icons/check-circle';
import React from 'react';
import { ActionIcon, Button, Flex, Input, Text, Title } from 'rizzui';
import cn from '@/core/utils/class-names';
import StripeCheckout from '@/app/shared/stripe-checkout/stripe-checkout';
import { usePostCreateAppointment } from '@/hooks/useAppointment';
import toast from 'react-hot-toast';
import { IPayloadPostAppoinment } from '@/types/paramTypes';
import { useAtom } from 'jotai';
import { formDataAtom } from '.';
import dayjs from 'dayjs';

const STEP = {
  ESTIMATE_COST: 'estimate-cost',
  PAYMENT: 'payment',
  CONFIRM: 'confirm',
};

const PriceEstimationCost = ({
  className,
  showCancelButton = true,
}: {
  className?: string;
  showCancelButton?: boolean;
}) => {
  const { closeModal } = useModal();

  const [formData] = useAtom(formDataAtom);
  const [step, setStep] = React.useState(STEP.ESTIMATE_COST);

  const appointmentType = formData?.patient_type;

  function getFee() {
    if (appointmentType.includes('follow up')) {
      return formData?.followup_fee;
    } else if (appointmentType.includes('script renewal')) {
      return formData?.script_renewal_fee;
    } else {
      return formData?.initial_fee;
    }
  }

  const { mutate } = usePostCreateAppointment();

  const successPayment = (paymentId: string) => {
    const payload: IPayloadPostAppoinment = {
      appointment_type: formData.appointment_type,
      clinicId: formData.clinicId as number,
      doctorId: formData.doctorId as number,
      date: `${dayjs(formData.date).format('YYYY-MM-DD')} ${formData.doctorTime}`,
      note: formData.note,
      patient_problem: formData.patient_problem,
      patient_type: formData.patient_type,
      payment_id: paymentId,
      meeting_preference: 'ZOOM',
      patientId: formData.patient_id as number,
    };

    mutate(payload, {
      onSuccess: () => {
        setStep(STEP.CONFIRM);
        toast.success('Booking successful!');
      },
      onError: (error: any) => {
        toast.error('Booking failed: ' + error.response.data.message);
      },
    });
  };

  return (
    <div className={cn(className)}>
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
              <Text>{getFee()}</Text>
            </Flex>
            <Flex justify="between" align="center">
              <Text>Sub Total:</Text>
              <Text>$-</Text>
            </Flex>
            <Flex justify="between" align="center">
              <Text>Coupon:</Text>
              <Text>-</Text>
            </Flex>
            <Flex justify="between" align="center">
              <Text>Merchant Fee:</Text>
              <Text>$-</Text>
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
            <StripeCheckout onSuccess={successPayment} />
            {showCancelButton && (
              <Button variant="text" onClick={closeModal}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}
      {step == STEP.CONFIRM && (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <CheckCircleIcon className="w-2h-28 h-28 text-green-600" />
          <div className="">
            <Title as="h4" className="">
              Appointment is confirmed
            </Title>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className="bg-green-600"
              onClick={() => {
                closeModal();
              }}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceEstimationCost;
