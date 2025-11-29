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
import { useGetAllPaymentConfigurations, useUpdatePaymentConfiguration } from '@/hooks/usePayment';
import { IPayloadPostPaymentConfiguration } from '@/types/paramTypes';
import CustomSwitch from '@/core/components/switch';

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
  onSave,
  isSaving = false
}: {
  isOpen: boolean;
  onClose: () => void;
  paymentData?: IPayloadPostPaymentConfiguration;
  onSave: (data: IPayloadPostPaymentConfiguration) => void;
  isSaving?: boolean;
}) {
  const [formData, setFormData] = useState<any>({});
  const [isActive, setIsActive] = useState(false);
  const [productionMode, setProductionMode] = useState(false);

  useEffect(() => {
    if (paymentData) {
      setFormData({
        production_mode: paymentData.production_mode || false,
        public_key: paymentData.public_key || '',
        secret_key: paymentData.secret_key || '',
      });
      setIsActive(paymentData.is_active || false);
      setProductionMode(paymentData.production_mode || false);
    }
  }, [paymentData]);

  const handleSave = () => {
    if (!paymentData) return;

    const updatedData: IPayloadPostPaymentConfiguration = {
      name: paymentData.name,
      payment_method_id: paymentData.payment_method_id,
      clinic_id: paymentData.clinic_id,
      production_mode: productionMode,
      public_key: formData.public_key || '',
      secret_key: formData.secret_key || '',
      is_active: isActive,
    };

    onSave(updatedData);
  };

  const handleProductionModeToggle = (checked: boolean) => {
    setProductionMode(checked);
    setFormData((prev: any) => ({ ...prev, production_mode: checked }));
  };

  const handleActiveToggle = (checked: boolean) => {
    setIsActive(checked);
  };

  const renderFormFields = () => {
    const paymentName = paymentData?.name?.toLowerCase() || '';

    switch (paymentName) {
      case 'stripe':
        return (
          <div className="space-y-6">
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

      default:
        return (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">public Key</label>
              <Input
                placeholder="Enter secret key"
                value={formData.secret_key || ''}
                onChange={(e) => setFormData({ ...formData, secret_key: e.target.value })}
                type="text"
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
            {paymentData?.name || 'Payment Configuration'}
          </Title>

          <div className="flex items-center gap-4">
            <CustomSwitch
              label={productionMode ? "Live" : "Sandbox"}
              checked={productionMode}
              onChange={handleProductionModeToggle}
              onColor="#0A3353" // red
              offColor="#6b7280" // gray
              labelPlacement='left'
            />
          </div>
        </div>

        {renderFormFields()}

        <div className="flex justify-end gap-3 mt-8">
          <Button variant="outline" className='hover:border-[#0A3353] border-[#0A3353] rounded-3xl' onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            isLoading={isSaving}
            className='bg-[#0A3353] hover:bg-[#0A3353] rounded-3xl'
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

/* -------------------------------------------------------------------------- */
/*                          PAYMENT GATEWAY FORM                              */
/* -------------------------------------------------------------------------- */

function PaymentGatewayForm({
  listPayment,
  openModal,
  handleTogglePayment,
  isUpdating
}: {
  listPayment: any[];
  openModal: (item: any) => void;
  handleTogglePayment: (item: any, checked: boolean) => void;
  isUpdating?: boolean;
}) {

  const onSubmit: SubmitHandler<SettingPaymentFormTypes> = (data) => {
    toast.success(<b>Payment gateway settings saved!</b>);
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

                  <CustomSwitch
                    label={item.is_active ? "Enabled" : "Disabled"}
                    checked={item.is_active || false}
                    onChange={(checked) => handleTogglePayment(item, checked)}
                    labelPlacement="right"
                    onColor="#0A3353" // red untuk enabled
                    offColor="#d1d5db" // gray untuk disabled
                    disabled={isUpdating}
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
                  onChange={(value: any) => setValue('default_currency', value)}
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
                  onChange={(value: string) => setValue('supported_currencies', value)}
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

  // Tambahkan refetch di sini
  const { data, isLoading, error, refetch } = useGetAllPaymentConfigurations({});
  const [listPayment, setListPayment] = useState<any[]>([]);
  const { mutate, isPending } = useUpdatePaymentConfiguration();

  const [selectedPayment, setSelectedPayment] = useState<IPayloadPostPaymentConfiguration>({
    name: null,
    payment_method_id: null,
    clinic_id: null,
    production_mode: null,
    public_key: null,
    secret_key: null,
    is_active: null,
  });

  // Load API data
  useEffect(() => {
    if (data?.success && Array.isArray(data.data)) {
      setListPayment(data.data);
    }
  }, [data]);

  const handleUpdatePaymentConfiguration = (newPaymentConfig: IPayloadPostPaymentConfiguration) => {

    mutate({
      ...newPaymentConfig
    }, {
      onSuccess: () => {
        // Refetch data setelah berhasil update
        refetch();
        toast.success("Payment configuration updated successfully!");
        // Tutup modal setelah berhasil save
        if (activeModal) {
          setActiveModal(null);
        }
      },
      onError: (error: any) => {
        // Refetch juga saat error untuk sync data terbaru
        refetch();
        toast.error("Failed to update payment configuration");
        if (activeModal) {
          setActiveModal(null);
        }
      },
    });
  };

  const handleModalSave = (updatedData: IPayloadPostPaymentConfiguration) => {
    handleUpdatePaymentConfiguration(updatedData);
  };

  const openModal = (item: any) => {
    setSelectedPayment({
      name: item?.paymentMethod?.name,
      payment_method_id: item?.payment_method_id,
      clinic_id: item?.clinicId,
      production_mode: item?.production_mode,
      public_key: item?.public_key,
      secret_key: item?.secret_key,
      is_active: item?.is_active,
    });
    setActiveModal(item.paymentMethod?.name || item.id);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedPayment({
      name: null,
      payment_method_id: null,
      clinic_id: null,
      production_mode: null,
      public_key: null,
      secret_key: null,
      is_active: null,
    });
  };

  const handleTogglePayment = async (item: any, checked: boolean) => {
    const newPaymentConfig = {
      name: item.paymentMethod?.name,
      payment_method_id: item?.payment_method_id,
      clinic_id: item?.clinicId,
      production_mode: item?.production_mode,
      public_key: item?.public_key,
      secret_key: item?.secret_key,
      is_active: checked,
    };

    handleUpdatePaymentConfiguration(newPaymentConfig);
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
        isUpdating={isPending}
      />

      {/* Dynamic Modal */}
      <PaymentModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        paymentData={selectedPayment}
        onSave={handleModalSave}
        isSaving={isPending}
      />
    </div>
  );
}