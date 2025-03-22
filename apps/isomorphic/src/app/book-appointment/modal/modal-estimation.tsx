import { useModal } from '@/app/shared/modal-views/use-modal';
import { PaymentMethodFormInput } from '@/validators/payment-method.schema';
import CheckCircleIcon from '@core/components/icons/check-circle';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActionIcon,
  Button,
  FieldError,
  Flex,
  Input,
  NumberInput,
  NumberInputProps,
  Text,
  Title,
  usePatternFormat,
} from 'rizzui';

const STEP = {
  ESTIMATE_COST: 'estimate-cost',
  PAYMENT: 'payment',
  CONFIRM: 'confirm',
};

const ModalEstimationCost = () => {
  const { closeModal } = useModal();
  const router = useRouter();

  const [step, setStep] = React.useState(STEP.ESTIMATE_COST);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentMethodFormInput>({});

  const onSubmit = (data: PaymentMethodFormInput) => {
    console.log('data', data);
    setStep(STEP.CONFIRM);
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
          <div className="flex flex-col gap-2">
            <Button
              className="bg-green-600"
              onClick={() => setStep(STEP.PAYMENT)}
            >
              Add Payment Method
            </Button>
            <Button variant="text" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {step == STEP.PAYMENT && (
        <div className="grid grid-cols-1 items-center gap-4">
          <Title as="h4" className="font-semibold">
            Add Payment Method
          </Title>
          <Input
            label="Card Holder Name"
            placeholder="John Doe"
            {...register('name', {
              required: { value: true, message: 'Name is required' },
            })}
            error={errors.name?.message}
          />

          <Controller
            name="cardNumber"
            control={control}
            rules={{
              required: { value: true, message: 'Card Number is required' },
              pattern: {
                value: /^\d{4} \d{4} \d{4} \d{4}$/,
                message: 'Invalid card number',
              },
            }}
            render={({ field }) => (
              <NumberInput
                {...field}
                formatType="pattern"
                format="#### #### #### ####"
                placeholder="1234 1234 1234 1234"
                mask="_"
                customInput={Input as React.ComponentType<unknown>}
                {...{
                  label: 'Card Number',
                  variant: 'outline',
                  error: errors.cardNumber?.message,
                }}
              />
            )}
          />

          <div className="grid grid-cols-2 gap-2">
            <Controller
              name="expiryDate"
              control={control}
              rules={{
                required: { value: true, message: 'Card Number is required' },
                pattern: {
                  value: /^\d{2}\/\d{2}$/,
                  message: 'Invalid expiry date',
                },
              }}
              render={({ field }) => (
                <CardExpiry
                  {...field}
                  isMask
                  formatType="custom"
                  placeholder="MM/YY"
                  mask={['M', 'M', 'Y', 'Y']}
                  allowEmptyFormatting
                  customInput={Input as React.ComponentType<unknown>}
                  {...{
                    label: 'Expiry Date',
                    variant: 'outline',
                    error: errors.expiryDate?.message,
                  }}
                />
              )}
            />
            <Controller
              name="cvv"
              control={control}
              rules={{
                required: { value: true, message: 'CVV is required' },
                pattern: {
                  value: /^\d{3}$/,
                  message: 'Invalid CVV',
                },
              }}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  formatType="pattern"
                  format="###"
                  mask={['C', 'V', 'V']}
                  allowEmptyFormatting
                  customInput={Input as React.ComponentType<unknown>}
                  {...{
                    label: 'Security Code (CVV)',
                    variant: 'outline',
                    error: errors.cvv?.message,
                  }}
                />
              )}
            />
          </div>
          <div className="rounded-lg bg-green-100 p-4">
            <Text>
              To verify your card details, a AU$1 temporary authorisation charge
              will be placed on your card. This is temporary and will be removed
              from your statement.
            </Text>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="bg-green-600" onClick={handleSubmit(onSubmit)}>
              Add Payment Method
            </Button>
            <Button variant="text" onClick={() => setStep(STEP.ESTIMATE_COST)}>
              Cancel
            </Button>
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
              onClick={() => router.push('/form/consent-form')}
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

type CardExpiryType = NumberInputProps & {
  isMask?: boolean;
};
function CardExpiry({ isMask = false, ...props }: CardExpiryType) {
  const { format } = usePatternFormat({
    ...props,
    format: '##/##',
  });
  const _format = (val: string) => {
    let month = val.substring(0, 2);
    const year = val.substring(2, 4);

    if (month.length === 1 && parseInt(month[0]) > 1) {
      month = `0${month[0]}`;
    } else if (month.length === 2) {
      if (Number(month) === 0) {
        month = '01';
      } else if (Number(month) > 12) {
        month = '12';
      }
    }
    return isMask ? format?.(`${month}${year}`) : `${month}/${year}`;
  };
  return <NumberInput {...props} format={_format as any} />;
}
