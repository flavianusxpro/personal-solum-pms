'use client';

import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import {
  configurationDoctorSchema,
  ConfigurationDoctorTypes,
} from '@/validators/configuration-doctor.schema';
import { ActionIcon, Button, Flex, Input } from 'rizzui';
import { PiPlusBold, PiTrashBold } from 'react-icons/pi';
import dynamic from 'next/dynamic';
import SelectLoader from '@/core/components/loader/select-loader';
import { specialistType } from '@/data/forms/my-details';

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => <SelectLoader />,
  }
);
export default function TabConfiguration({
  nextTab,
  isView = false,
}: {
  nextTab?: () => void;
  isView?: boolean;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ConfigurationDoctorTypes>({
    defaultValues: {
      symthoms: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'symthoms',
  });

  const onSubmit: SubmitHandler<ConfigurationDoctorTypes> = (data) => {
    console.log('🚀 ~ data:', data);
  };

  return (
    <form className="@container" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10 grid grid-cols-1 gap-7">
        <div className="flex flex-col gap-7">
          <FormGroup title="Configuration" className="grid-cols-12 gap-4" />
          <FormGroup title="Symptoms" className="grid-cols-12 gap-4" isLabel>
            {fields.map((item, index) => (
              <Flex gap="2" key={item.id} align="center">
                <Controller
                  name={`symthoms.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Symptoms Name"
                      placeholder="Symptoms"
                      className="w-full"
                      error={errors?.symthoms?.[index]?.name?.message}
                    />
                  )}
                />
                <ActionIcon
                  variant="outline"
                  color="secondary"
                  onClick={() => remove(index)}
                  className="mt-7"
                >
                  <PiTrashBold className="h-4 w-4 text-red-500" />
                </ActionIcon>
              </Flex>
            ))}
            <Button onClick={() => append({ name: '' })}>
              <PiPlusBold className="h-4 w-4" />
              Add Symptoms
            </Button>
          </FormGroup>

          <FormGroup title="Specialist" className="grid-cols-12 gap-4" isLabel>
            <Controller
              name="specialist"
              control={control}
              render={({ field }) => (
                <MultySelect
                  {...field}
                  options={specialistType}
                  placeholder="Specialist"
                  error={errors?.specialist?.message}
                />
              )}
            />
          </FormGroup>
        </div>
      </div>
      <FormFooter
        // isLoading={isLoading}
        altBtnText="Cancel"
        submitBtnText="Save"
      />
    </form>
  );
}
