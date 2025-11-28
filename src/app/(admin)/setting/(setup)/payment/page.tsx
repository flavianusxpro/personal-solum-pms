'use client';
import { z } from 'zod';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Switch, Text, Button, Input, Modal, Title, Select } from 'rizzui';
import { GoPencil } from 'react-icons/go';
import { useEffect, useState } from 'react';
import {
  settingPaymentFormSchema,
  SettingPaymentFormTypes,
} from '@/validators/setting-payment.schema';
import { useGetAllPaymentConfigurations } from '@/hooks/usePayment';

// Data currency dari gambar Figma
const defaultCurrencyOptions = [
  { value: 'indonesia', label: 'Indonesia' },
  { value: 'america', label: 'America' },
  { value: 'australia', label: 'Australia' },
  { value: 'hongkong', label: 'Hongkong' },
  { value: 'china', label: 'China' },
];

const supportedCurrencyOptions = [
  { value: 'rupiah', label: 'Rupiah (Rp)' },
  { value: 'usd', label: 'US Dollar (USD)' },
  { value: 'aud', label: 'Australian Dollar (AUD)' },
  { value: 'nzd', label: 'New Zealand Dollar (ZND)' },
  { value: 'cny', label: 'China Yuan (CNY)' },
];

// Schema untuk Currency Settings
const currencySettingsSchema = z.object({
  default_currency: z.string().min(1, 'Default currency is required'),
  supported_currencies: z.string().min(1, 'Supported currencies are required'),
});

// Schema untuk Other Payment Settings
const otherPaymentSettingsSchema = z.object({
  auto_capture: z.boolean().default(false),
  refund_period: z.number().min(1).max(365),
  payment_timeout: z.number().min(1).max(180),
});

type CurrencySettingsTypes = z.infer<typeof currencySettingsSchema>;
type OtherPaymentSettingsTypes = z.infer<typeof otherPaymentSettingsSchema>;

/* -------------------------------------------------------------------------- */
/*                          DYNAMIC PAYMENT MODAL                             */
/* -------------------------------------------------------------------------- */

function PaymentModal({
  isOpen,
  onClose,
  paymentData,
}: {
  isOpen: boolean;
  onClose: () => void;
  paymentData?: any;
}) {
  const [formData, setFormData] = useState<any>({});
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (paymentData) {
      setFormData({
        production_mode: paymentData.production_mode || false,
        public_key: paymentData.public_key || '',
        secret_key: paymentData.secret_key || '',
        client_id: paymentData.client_id || '',
        client_secret: paymentData.client_secret || '',
        merchant_id: paymentData.merchant_id || '',
        api_key: paymentData.api_key || '',
        environment: paymentData.environment || 'sandbox',
      });
      setIsActive(paymentData.is_active || false);
    }
  }, [paymentData]);

  const handleSave = () => {
    console.log(`Saving ${paymentData?.paymentMethod?.name} data:`, {
      ...formData,
      is_active: isActive
    });
    toast.success(<Text as="b">{paymentData?.paymentMethod?.name} settings updated!</Text>);
    onClose();
  };

  const renderFormFields = () => {
    const paymentName = paymentData?.paymentMethod?.name?.toLowerCase() || '';

    switch (paymentName) {
      case 'stripe':
        return (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Mode</label>
              <select
                className="form-input mt-1 w-full rounded-lg"
                value={formData.production_mode ? 'live' : 'test'}
                onChange={(e) => setFormData({
                  ...formData,
                  production_mode: e.target.value === 'live'
                })}
              >
                <option value="test">Test Mode</option>
                <option value="live">Live Mode</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Public Key</label>
              <Input
                placeholder="Enter public key"
                value={formData.public_key || ''}
                onChange={(e) => setFormData({ ...formData, public_key: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Secret Key</label>
              <Input
                placeholder="Enter secret key"
                value={formData.secret_key || ''}
                onChange={(e) => setFormData({ ...formData, secret_key: e.target.value })}
                type="text"
              />
            </div>
          </div>
        );

      case 'paypal':
      case 'paypal payment':
        return (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Environment</label>
              <select
                className="form-input mt-1 w-full rounded-lg"
                value={formData.environment || 'sandbox'}
                onChange={(e) => setFormData({
                  ...formData,
                  environment: e.target.value
                })}
              >
                <option value="sandbox">Sandbox</option>
                <option value="live">Live</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Client ID</label>
              <Input
                placeholder="Enter client ID"
                value={formData.client_id || ''}
                onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Client Secret</label>
              <Input
                placeholder="Enter client secret"
                value={formData.client_secret || ''}
                onChange={(e) => setFormData({ ...formData, client_secret: e.target.value })}
                type="text"
              />
            </div>
          </div>
        );

      case 'apple payment':
        return (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Merchant ID</label>
              <Input
                placeholder="Enter merchant ID"
                value={formData.merchant_id || ''}
                onChange={(e) => setFormData({ ...formData, merchant_id: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">API Key</label>
              <Input
                placeholder="Enter API key"
                value={formData.api_key || ''}
                onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
                type="text"
              />
            </div>
          </div>
        );

      case 'google payment':
        return (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Environment</label>
              <select
                className="form-input mt-1 w-full rounded-lg"
                value={formData.environment || 'test'}
                onChange={(e) => setFormData({
                  ...formData,
                  environment: e.target.value
                })}
              >
                <option value="test">Test Environment</option>
                <option value="production">Production</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Merchant ID</label>
              <Input
                placeholder="Enter merchant ID"
                value={formData.merchant_id || ''}
                onChange={(e) => setFormData({ ...formData, merchant_id: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">API Key</label>
              <Input
                placeholder="Enter API key"
                value={formData.api_key || ''}
                onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
                type="text"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Configuration</label>
              <Input
                placeholder={`Enter ${paymentData?.paymentMethod?.name} configuration`}
                value={formData.api_key || ''}
                onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Secret Key</label>
              <Input
                placeholder="Enter secret key"
                value={formData.secret_key || ''}
                onChange={(e) => setFormData({ ...formData, secret_key: e.target.value })}
                type="text"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="m-auto px-7 pt-6 pb-8">
        <div className="mb-7 flex items-center justify-between">
          <Title as="h4" className="flex items-center">
            {paymentData?.paymentMethod?.name || 'Payment Configuration'}
          </Title>
        </div>

        {renderFormFields()}

        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            id="is_active"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="is_active" className="text-sm font-medium">
            Activate {paymentData?.paymentMethod?.name}
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </Modal>
  );
}

/* -------------------------------------------------------------------------- */
/*                          PAYMENT GATEWAY FORM                              */
/* -------------------------------------------------------------------------- */

function PaymentGatewayForm({ listPayment, openModal, handleTogglePayment }: {
  listPayment: any[];
  openModal: (item: any) => void;
  handleTogglePayment: (item: any, checked: boolean) => void;
}) {
  const onSubmit: SubmitHandler<SettingPaymentFormTypes> = (data) => {
    toast.success(<b>Payment gateway settings saved!</b>);
    console.log('Payment gateway settings:', data);
  };

  return (
    <Form<SettingPaymentFormTypes>
      validationSchema={settingPaymentFormSchema}
      onSubmit={onSubmit}
    >
      {({ register, formState: { errors } }) => (
        <FormGroup
          title="Payment Gateway"
          description="Payment gateway settings"
          className="border-b pb-6"
        >
          <div className="grid grid-cols-1 gap-6">
            {listPayment.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center border rounded-md p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex-1">
                  <Text className="font-semibold text-gray-900">
                    {item.paymentMethod?.name}
                  </Text>

                  {item.public_key && (
                    <Text className="text-xs text-gray-500 mt-1">
                      {item.production_mode ? 'Live Mode' : 'Test Mode'}
                      {item.public_key && ` • Key: ${item.public_key.substring(0, 8)}...`}
                    </Text>
                  )}

                  {item.client_id && (
                    <Text className="text-xs text-gray-500 mt-1">
                      {item.environment === 'live' ? 'Production' : 'Sandbox'}
                      {` • Client: ${item.client_id.substring(0, 8)}...`}
                    </Text>
                  )}

                  <Text className={`text-xs mt-1 ${item.is_active ? 'text-green-600' : 'text-red-600'}`}>
                    {item.is_active ? 'Active' : 'Inactive'}
                  </Text>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="text"
                    onClick={() => openModal(item)}
                    className="flex items-center rounded-3xl gap-2 text-white hover:text-white bg-[#0A3353]"
                  >
                    <GoPencil className="w-4 h-4" />
                    Edit
                  </Button>

                  <Switch
                    label={item.is_active ? "enabled" : "disabled"} 
                    checked={item.is_active || false}
                    onChange={(e) => handleTogglePayment(item, e.target.checked)}
                    labelPlacement="right"
                    size='lg'
                  />
                </div>
              </div>
            ))}

            {listPayment.length === 0 && (
              <div className="text-center py-8">
                <Text className="text-gray-500">No payment configurations found</Text>
              </div>
            )}
          </div>
        </FormGroup>
      )}
    </Form>
  );
}

/* -------------------------------------------------------------------------- */
/*                          CURRENCY SETTINGS FORM                            */
/* -------------------------------------------------------------------------- */

function CurrencySettingsForm() {
  const onSubmit: SubmitHandler<CurrencySettingsTypes> = (data) => {
    toast.success(<b>Currency settings saved!</b>);
    console.log('Currency settings:', data);
  };

  return (
    <Form<CurrencySettingsTypes>
      validationSchema={currencySettingsSchema}
      onSubmit={onSubmit}
    >
      {({ register, formState: { errors }, setValue, watch }) => {
        const defaultCurrency = watch('default_currency');
        const supportedCurrencies = watch('supported_currencies');

        return (
          <FormGroup
            title="Currency Settings"
            description="Configure your default and supported currencies"
            className="border-b pb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Default Currency
                </label>
                <Select
                  options={defaultCurrencyOptions}
                  value={defaultCurrency}
                  onChange={(value:any) => setValue('default_currency', value)}
                  placeholder="Select default currency"
                />
                {errors.default_currency && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.default_currency.message}
                  </Text>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Supported Currencies
                </label>
                <Select
                  options={supportedCurrencyOptions}
                  value={supportedCurrencies}
                  onChange={(value) => setValue('supported_currencies', value)}
                  placeholder="Select supported currencies"
                />
                {errors.supported_currencies && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.supported_currencies.message}
                  </Text>
                )}
              </div>
            </div>
          </FormGroup>
        );
      }}
    </Form>
  );
}

/* -------------------------------------------------------------------------- */
/*                          MAIN PAYMENT COMPONENT                            */
/* -------------------------------------------------------------------------- */

export default function Payment() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const { data, isLoading, error } = useGetAllPaymentConfigurations({});
  const [listPayment, setListPayment] = useState<any[]>([]);

  // Load API data
  useEffect(() => {
    if (data?.success && Array.isArray(data.data)) {

      console.log("paymentData =====>", data?.data)
      console.log("paymentData =====>", JSON.stringify(data?.data))
      setListPayment(data.data);
    }
  }, [data]);

  const openModal = (item: any) => {
    setSelectedPayment(item);
    setActiveModal(item.paymentMethod?.name || item.id);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedPayment(null);
  };

  const handleTogglePayment = (item: any, checked: boolean) => {
    console.log(`Toggle ${item.paymentMethod?.name}:`, checked);
    toast.success(<Text as="b">{item.paymentMethod?.name} {checked ? 'activated' : 'deactivated'}!</Text>);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Text>Loading payment configurations...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <Text className="text-red-500">Error loading payment configurations</Text>
      </div>
    );
  }

  return (
    <div className="space-y-10 my-10">
      {/* Currency Settings Form */}
      <CurrencySettingsForm />

      {/* Payment Gateway Form */}
      <PaymentGatewayForm
        listPayment={listPayment}
        openModal={openModal}
        handleTogglePayment={handleTogglePayment}
      />

      {/* Dynamic Modal */}
      <PaymentModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        paymentData={selectedPayment}
      />

      <Button
        size="sm"
        variant="text"
        className="flex items-center gap-2 text-white bg-[#0A3353] "
      >
        Save Changes
      </Button>
    </div>
  );
}