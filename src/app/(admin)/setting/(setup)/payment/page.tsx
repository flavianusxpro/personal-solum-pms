'use client';

import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { AdvancedCheckbox, CheckboxGroup, Switch, Text } from 'rizzui';
import {
  settingPaymentFormSchema,
  SettingPaymentFormTypes,
} from '@/validators/setting-payment.schema';
import cn from '@/core/utils/class-names';
import CheckCircleIcon from '@/core/components/icons/check-circle';

const paymentMethodoptions = [
  {
    value: 'strip',
    title: 'Stripe',
    description: 'Setup Stripe payment method',
    isDisabled: false,
  },
  {
    value: 'tyro',
    title: 'Tyro ',
    description: '(Coming Soon)',
    isDisabled: true,
  },
];

export default function Payment() {
  const onSubmit: SubmitHandler<SettingPaymentFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  return (
    <Form<SettingPaymentFormTypes>
      validationSchema={settingPaymentFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({
        register,
        control,
        setValue,
        getValues,
        watch,
        formState: { errors },
      }) => {
        function setValueCardPaymentMethod(
          value: string[] | ((prevState: string[]) => string[])
        ) {
          if (Array.isArray(value)) {
            const lastValue = value[value.length - 1];
            setValue('payment_method', [lastValue]);
          }
        }

        return (
          <>
            <FormGroup
              title="Card Payment (not connected yet)"
              description="Configure your card payment settings here"
              className="mb-6 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            >
              <div className="flex w-full justify-end">
                <Switch
                  label="Enable Card Payment"
                  variant="flat"
                  labelClassName="font-medium text-sm text-gray-900"
                  checked={watch('card_payment_status')}
                  onChange={(e) => {
                    setValue('card_payment_status', e.target.checked);
                  }}
                />
              </div>
            </FormGroup>

            <div
              className={cn(
                'transition-all duration-300',
                watch('card_payment_status')
                  ? 'max-h-screen'
                  : 'max-h-0 overflow-hidden opacity-0'
              )}
            >
              <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                <div>
                  <CheckboxGroup
                    values={watch('payment_method') ?? []}
                    setValues={(values) => setValueCardPaymentMethod(values)}
                    className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
                  >
                    {paymentMethodoptions.map((item) => (
                      <AdvancedCheckbox
                        key={item.value}
                        name="payment"
                        value={item.value}
                        disabled={item.isDisabled}
                        inputClassName="[&:checked~span_.icon]:block"
                      >
                        <span className="flex justify-between">
                          <Text as="b">{item.title}</Text>
                          <CheckCircleIcon className="icon hidden h-5 w-5 text-secondary" />
                        </span>
                        <Text>{item.description}</Text>
                      </AdvancedCheckbox>
                    ))}
                  </CheckboxGroup>
                </div>
              </div>
            </div>

            <FormGroup
              title="Payment Options"
              description="Configure your payment options here"
              className="mb-6 mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <div className="flex items-center gap-4">
                <Switch
                  label="Counter"
                  variant="flat"
                  labelClassName="font-medium text-sm text-gray-900"
                />
                <Switch
                  label="Paypall"
                  variant="flat"
                  labelClassName="font-medium text-sm text-gray-900"
                />
                <Switch
                  label="Cash"
                  variant="flat"
                  labelClassName="font-medium text-sm text-gray-900"
                />
              </div>
            </div>

            <FormFooter
              // isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </>
        );
      }}
    </Form>
  );
}
