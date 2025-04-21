'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Title } from 'rizzui';
import CSelect from '@/core/ui/select';
import { genderOption, languageOption, stateOption } from '@/config/constants';
import { IPayloadCreateDoctorUser } from '@/types/paramTypes';
import {
  doctorDetailsFormSchema,
  DoctorDetailsFormTypes,
} from '@/validators/doctor-create.schema';
import toast from 'react-hot-toast';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import { useGetRoles, usePostCreateDoctorUser } from '@/hooks/useUser';
import { useGetSpecialists } from '@/hooks/useDoctor';
import { useMemo } from 'react';
import SelectLoader from '@/core/components/loader/select-loader';
import dynamic from 'next/dynamic';

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => <SelectLoader />,
  }
);

export default function CreatDoctorModal() {
  const { closeModal } = useModal();

  const { mutate: mutateCreateDoctor, isPending } = usePostCreateDoctorUser();
  const { data: dataSpecialists } = useGetSpecialists();
  const { data: dataRoles } = useGetRoles();

  const specialistsOptions = useMemo(() => {
    if (!dataSpecialists) return [];
    return dataSpecialists.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
  }, [dataSpecialists]);

  const isDoctorRole = useMemo(() => {
    if (!dataRoles) return false;
    return dataRoles.some((role) => role.name === 'doctor');
  }, [dataRoles]);

  const onSubmit: SubmitHandler<DoctorDetailsFormTypes> = (data) => {
    if (!isDoctorRole) {
      toast.error('Doctor Role not found');
      return;
    }

    const payload: IPayloadCreateDoctorUser = {
      name: data.first_name + ' ' + data.last_name,
      email: data.email,
      password: data.password as string,
      roleId: 5,
      clinic_ids: [],
      doctor: {
        ...data,
        specialist_type: data.specialist_type.map((item) => parseInt(item)),
      },
    };

    mutateCreateDoctor(payload, {
      onSuccess: () => {
        toast.success('Doctor created successfully');
        closeModal();
      },
      onError: (error) => {
        console.log('🚀 ~ DoctorDetails ~ error:', error);
        const errorMessage =
          (error as any)?.response?.data?.message || 'An error occurred';
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Form<DoctorDetailsFormTypes>
      validationSchema={doctorDetailsFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        console.log('🚀 ~ CreatDoctorModal ~ errors:', errors);

        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title>Create Doctor</Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <div className="mb-10 grid grid-cols-1 gap-x-7 gap-y-4 md:grid-cols-2">
              <div className="flex flex-col gap-7">
                <FormGroup
                  title="Personal Info"
                  className="grid-cols-12 gap-4"
                />
                <FormGroup title="First Name" isLabel>
                  <Input
                    placeholder="First Name"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Last Name" isLabel>
                  <Input
                    placeholder="Last Name"
                    {...register('last_name')}
                    error={errors.last_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Gender" isLabel>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        label=""
                        placeholder="Select Gender"
                        options={genderOption}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup title="Birth of Date" isLabel>
                  <Input
                    placeholder="Birth of Dae"
                    type="date"
                    {...register('date_of_birth')}
                    error={errors.date_of_birth?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Phone Number" isLabel>
                  <Input
                    placeholder="Phone Number"
                    {...register('mobile_number')}
                    error={errors.mobile_number?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Email" isLabel>
                  <Input
                    placeholder="Email"
                    {...register('email')}
                    error={errors.email?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>

              <div className="mb-10 flex flex-col gap-7">
                <FormGroup title="Address" className="grid-cols-12" />
                <FormGroup title="Country" isLabel>
                  <Input
                    placeholder="Country"
                    {...register('country')}
                    error={errors.country?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Street Number" isLabel>
                  <Input
                    placeholder="Street Number"
                    {...register('street_number')}
                    error={errors.street_number?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Street Name" isLabel>
                  <Input
                    placeholder="Street Name"
                    {...register('street_name')}
                    error={errors.street_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Address Line 1" isLabel>
                  <Input
                    placeholder="Address Line 1"
                    {...register('address_line_1')}
                    error={errors.address_line_1?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Address Line 2" isLabel>
                  <Input
                    placeholder="Address Line 2"
                    {...register('address_line_2')}
                    error={errors.address_line_2?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Suburb" isLabel>
                  <Input
                    placeholder="Suburb"
                    {...register('suburb')}
                    error={errors.suburb?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="State" isLabel>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        placeholder="State"
                        className="group relative z-0"
                        options={stateOption}
                        error={errors.state?.message as string}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup title="Post Code" isLabel>
                  <Input
                    placeholder="Post Code"
                    {...register('postcode')}
                    error={errors.postcode?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>

              <div className="mb-10 flex flex-col gap-7">
                <FormGroup title="Emergency" className="grid-cols-12" />
                <FormGroup title="Emergency First Name" isLabel>
                  <Input
                    placeholder="First Name"
                    {...register('emergency_first_name')}
                    error={errors.emergency_first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Emergency Last Name" isLabel>
                  <Input
                    placeholder="Last Name"
                    {...register('emergency_last_name')}
                    error={errors.emergency_last_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Phone Number" isLabel>
                  <Input
                    placeholder="Phone Number"
                    {...register('emergency_mobile_number')}
                    type="number"
                    error={errors.emergency_mobile_number?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Email" className="w-full" isLabel>
                  <Input
                    placeholder="Email"
                    {...register('emergency_email')}
                    error={errors.emergency_email?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Password" isLabel>
                  <Input
                    placeholder="Password"
                    {...register('password')}
                    error={errors.password?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>

              <div className="mb-10 flex flex-col gap-7">
                <FormGroup title="Details" className="grid-cols-12" />

                <FormGroup title="Specialist Type" isLabel>
                  <Controller
                    name="specialist_type"
                    control={control}
                    render={({ field }) => (
                      <MultySelect
                        searchable
                        {...field}
                        placeholder="Select Specialist Type"
                        options={specialistsOptions}
                        error={errors.specialist_type?.message}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup title="Medical Interest" isLabel>
                  <Input
                    placeholder="Medical Interest"
                    {...register('medical_interest')}
                    error={errors.medical_interest?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Treatment Type" isLabel>
                  <Input
                    placeholder="Treatment Type"
                    {...register('treatment_type')}
                    error={errors.treatment_type?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Language" isLabel>
                  <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                      <MultySelect
                        {...field}
                        onClear={() => field.onChange([])}
                        options={languageOption}
                        clearable
                        placeholder="Select Language"
                        error={errors.language?.message}
                        className="flex-grow"
                      />
                    )}
                  />
                </FormGroup>
              </div>
            </div>
            <FormFooter
              className="rounded-b-xl"
              isLoading={isPending}
              altBtnText="Cancel"
              submitBtnText="Save"
              isSticky={false}
            />
          </div>
        );
      }}
    </Form>
  );
}
