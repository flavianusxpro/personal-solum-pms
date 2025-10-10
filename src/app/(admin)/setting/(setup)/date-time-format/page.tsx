'use client';

import { SubmitHandler, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Select, Text } from 'rizzui';
import {
  settingFormatFormSchema,
  SettingFormatFormTypes,
} from '@/validators/setting-format-schema';

const dateFormats = [
  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  { label: 'DD-MM-YYYY', value: 'DD-MM-YYYY' },
  { label: 'MM-DD-YYYY', value: 'MM-DD-YYYY' },
  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
  { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
  { label: 'DD MMM YYYY', value: 'DD MMM YYYY' },
  { label: 'MMM DD, YYYY', value: 'MMM DD, YYYY' },
];

const timeFormats = [
  { label: 'HH:mm (24-hour)', value: 'HH:mm' },
  { label: 'hh:mm A (12-hour)', value: 'hh:mm A' },
  { label: 'HH:mm:ss (24-hour with seconds)', value: 'HH:mm:ss' },
  { label: 'hh:mm:ss A (12-hour with seconds)', value: 'hh:mm:ss A' },
];

export default function DateFormat() {
  const onSubmit: SubmitHandler<SettingFormatFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  return (
    <Form<SettingFormatFormTypes>
      validationSchema={settingFormatFormSchema}
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
        const selectedFormat = watch('date_format');
        return (
          <>
            <FormGroup
              title="Date Format"
              description="Choose date format"
              className="mb-6 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            >
              <div className="flex w-full justify-end">
                <Controller
                  control={control}
                  name="date_format"
                  render={({ field }) => (
                    <Select
                      label="Date Format"
                      options={dateFormats}
                      value={dateFormats.find(
                        (opt: { label: any; value: any }) =>
                          opt.value === field.value
                      )}
                      onChange={(option: { label: any; value: any }) =>
                        field.onChange(option?.value)
                      }
                    />
                  )}
                />
              </div>
            </FormGroup>

            <FormGroup
              title="Time Format"
              description="Choose time format"
              className="mb-6 mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            >
              <div className="flex items-center gap-4">
                <Controller
                  control={control}
                  name="time_format"
                  render={({ field }) => (
                    <Select
                      label="Time Format"
                      options={timeFormats}
                      value={timeFormats.find(
                        (opt: { label: any; value: any }) =>
                          opt.value === field.value
                      )}
                      onChange={(option: { label: any; value: any }) =>
                        field.onChange(option?.value)
                      }
                    />
                  )}
                />
              </div>
            </FormGroup>

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
