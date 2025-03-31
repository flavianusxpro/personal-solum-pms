'use client';

import dynamic from 'next/dynamic';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Input, Loader, Text, Textarea } from 'rizzui';
// import UploadZone from '@core/ui/file-upload/upload-zone';
import AvatarUpload from '@core/ui/file-upload/avatar-upload';
import CSelect from '@/core/ui/select';
import {
  emergencyContactSchema,
  EmergencyContactTypes,
} from '@/validators/emergency-contact.schema';
import { relationshipOption } from '@/config/constants';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
});

export default function TabEmergencyContact() {
  const onSubmit: SubmitHandler<EmergencyContactTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  return (
    <Form<EmergencyContactTypes>
      validationSchema={emergencyContactSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, control, watch, formState: { errors } }) => {
        const relationShipValue = watch('relationship');
        const isOther =
          relationShipValue === 'other' ||
          !relationshipOption.some(
            (option) => option.value === relationShipValue
          );
        return (
          <>
            <Flex direction="col" className="">
              <FormGroup title="Emergency Contact" className="pt-4" />
              <div className="mb-10 grid w-full grid-cols-2 gap-7">
                <FormGroup title="First Name">
                  <Input
                    placeholder="First Name"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Email">
                  <Input
                    placeholder="Email"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Last Name">
                  <Input
                    placeholder="Last Name"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Relationship">
                  <Controller
                    name="relationship"
                    control={control}
                    render={({ field }) => (
                      <>
                        <CSelect
                          {...field}
                          value={
                            relationshipOption.find(
                              (option) => option.value === field.value
                            )?.value ?? 'other'
                          }
                          options={relationshipOption}
                          placeholder="Relationship"
                          error={errors.relationship?.message}
                          className="flex-grow"
                        />
                        {isOther && (
                          <Input
                            placeholder="Specify Relationship"
                            {...register('relationship')}
                            error={errors.relationship?.message}
                            className="mt-2 flex-grow"
                          />
                        )}
                      </>
                    )}
                  />
                </FormGroup>

                <FormGroup title="Phone Number">
                  <Input
                    placeholder="Phone Number"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
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
