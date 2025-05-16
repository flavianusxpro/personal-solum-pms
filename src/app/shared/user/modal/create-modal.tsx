'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Title } from 'rizzui';
import CSelect from '@/core/ui/select';
import { IPayloadCreateUser } from '@/types/paramTypes';

import toast from 'react-hot-toast';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import { useGetUsers, usePostCreateUser } from '@/hooks/useUser';
import SelectLoader from '@/core/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import {
  CreateUserInput,
  createUserSchema,
} from '@/validators/create-user.schema';
import { useGetAllClinics } from '@/hooks/useClinic';
import { useGetRoles } from '@/hooks/useRole';
import FormHeader from '@/core/components/form-header';

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => <SelectLoader />,
  }
);

export default function CreateUserModal() {
  const { closeModal } = useModal();

  const { mutate: mutateCreateUser, isPending } = usePostCreateUser();
  const { refetch } = useGetUsers({ page: 1, perPage: 10 });

  const { data: dataRoles } = useGetRoles({
    page: 1,
    perPage: 100,
  });
  const { data: dataClinics } = useGetAllClinics({
    page: 1,
    perPage: 100,
    role: 'admin',
  });

  const roleOptions = useMemo(() => {
    if (!dataRoles) return [];
    return dataRoles?.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }, [dataRoles]);

  const clinicOptions = useMemo(() => {
    if (!dataClinics) return [];
    return dataClinics?.data?.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
  }, [dataClinics]);

  const onSubmit: SubmitHandler<CreateUserInput> = (data) => {
    const payload: IPayloadCreateUser = {
      name: data.name,
      email: data.email,
      password: data.password as string,
      roleId: data.roleId,
      clinic_ids: data.clinic_ids?.map((clinicId) => parseInt(clinicId)) || [],
    };

    mutateCreateUser(payload, {
      onSuccess: () => {
        toast.success('User created successfully');
        refetch();
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
    <Form<CreateUserInput>
      validationSchema={createUserSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 pt-2">
            <FormHeader title="Create User" />

            <div className="grid grid-cols-1 gap-x-7 gap-y-4 px-6">
              <FormGroup title="Name" isLabel>
                <Input
                  placeholder="Name"
                  {...register('name')}
                  error={errors.name?.message}
                  className="flex-grow"
                />
              </FormGroup>
              {/* <FormGroup title="Last Name" isLabel>
                  <Input
                    placeholder="Last Name"
                    {...register('last_name')}
                    error={errors.last_name?.message}
                    className="flex-grow"
                  />
                </FormGroup> */}

              <FormGroup title="Email" className="w-full" isLabel>
                <Input
                  placeholder="Email"
                  {...register('email')}
                  error={errors.email?.message}
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

              <FormGroup title="Role" isLabel>
                <Controller
                  control={control}
                  name="roleId"
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      options={roleOptions}
                      error={errors.roleId?.message}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup title="Clinic" isLabel>
                <Controller
                  control={control}
                  name="clinic_ids"
                  render={({ field }) => (
                    <MultySelect
                      {...field}
                      options={clinicOptions}
                      placeholder="Select Clinic"
                      error={errors.clinic_ids?.message}
                    />
                  )}
                />
              </FormGroup>
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
