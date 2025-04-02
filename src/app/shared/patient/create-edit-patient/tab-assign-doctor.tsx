'use client';

import dynamic from 'next/dynamic';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Input, Loader, Text, Textarea } from 'rizzui';
// import UploadZone from '@core/ui/file-upload/upload-zone';
import CSelect from '@/core/ui/select';
import { doctorsOption, relationshipOption } from '@/config/constants';
import {
  assignDoctorSchema,
  AssignDoctorTypes,
} from '@/validators/assign-doctor.schema';

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-10 place-content-center">
        <Loader variant="spinner" />
      </div>
    ),
  }
);

export default function TabAssignDoctor() {
  const onSubmit: SubmitHandler<AssignDoctorTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  return (
    <Form<AssignDoctorTypes>
      validationSchema={assignDoctorSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <Flex direction="col" className="" gap="7">
              <FormGroup title="Assign Doctor" className="" />
              <div className="mb-10 grid w-full grid-cols-2 gap-7">
                <FormGroup title="Doctors">
                  <Controller
                    name="doctor"
                    control={control}
                    render={({ field }) => (
                      <MultySelect
                        {...field}
                        onClear={() => field.onChange([])}
                        options={doctorsOption}
                        clearable
                        placeholder="Select Doctor"
                        error={errors.doctor?.message}
                        className="flex-grow"
                      />
                    )}
                  />
                </FormGroup>
              </div>
            </Flex>
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
