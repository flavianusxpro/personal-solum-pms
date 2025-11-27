'use client';

import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Switch, Text, Button } from 'rizzui';
import cn from '@/core/utils/class-names';
import CheckCircleIcon from '@/core/components/icons/check-circle';
import {
  settingPaymentFormSchema,
  SettingPaymentFormTypes,
} from '@/validators/setting-payment.schema';
import { GoPencil } from 'react-icons/go';

// Data list seperti gambar
const gatewayPaymentOptions = [
  { name: 'Stripe Payment' },
  { name: 'Paypal Payment' },
  { name: 'Apple Payment' },
  { name: 'Google Payment' },
];

const otherPaymentOptions = [
  { name: 'Cash Payment' },
  { name: 'Bank Transfer' },
];

export default function Payment() {
  const onSubmit: SubmitHandler<SettingPaymentFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully saved!</Text>);
    console.log('Payment settings ->', data);
  };

  return (
    <Form<SettingPaymentFormTypes>
      validationSchema={settingPaymentFormSchema}
      onSubmit={onSubmit}
      className="space-y-10 my-10"
    >
      {({ watch, setValue }) => {
        return (
          <>
            {/* Currency Section */}
            <FormGroup
              title="Currency"
              description="Currency information"
              className="border-b pb-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Default Currency</label>
                  <select className="form-input mt-1 w-full">
                    <option>Select default currency</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Supported Currency</label>
                  <select className="form-input mt-1 w-full">
                    <option>Select supported currency</option>
                  </select>
                </div>
              </div>
            </FormGroup>

            {/* Payment Gateway Section */}
            <FormGroup
              title="Payment Gateway"
              description="Payment gateway settings"
              className="border-b pb-6"
            >
              <div className="grid grid-cols-1 gap-6">
                {gatewayPaymentOptions.map((item:any) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center border rounded-md p-4"
                  >
                    <div>
                      <Text className="font-semibold">{item.name}</Text>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button size="sm" variant="text">
                        <GoPencil className='mr-[8px]' /> Edit
                      </Button>
                      <Switch
                        checked={watch(item.name)}
                        onChange={(e) => setValue(item.name, e.target.checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FormGroup>

            {/* Other Payment Section */}
            <FormGroup
              title="Other Payment"
              description="Other payment"
              className="border-b pb-6"
            >
              <div className="grid grid-cols-1 gap-6">
                {otherPaymentOptions.map((item:any) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center border rounded-md p-4"
                  >
                    <Text className="font-semibold">{item.name}</Text>

                    <div className="flex items-center gap-3">
                      <Button size="sm" variant="text">
                        <GoPencil className='mr-[8px]' /> Edit
                      </Button>
                      <Switch
                        checked={watch(item.name)}
                        onChange={(e) => setValue(item.name, e.target.checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FormGroup>

            <div className="flex justify-end">
              <FormFooter submitBtnText="Save Changes" />
            </div>
          </>
        );
      }}
    </Form>
  );
}
