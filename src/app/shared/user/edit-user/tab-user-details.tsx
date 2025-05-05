'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Input, Loader } from 'rizzui';
import CSelect from '@/core/ui/select';
import { IPayloadUpdateUser } from '@/types/paramTypes';
import { useParams } from 'next/navigation';
import { useGetUserById, useUpdateUser } from '@/hooks/useUser';
import {
  UpdateUserInput,
  updateUserSchema,
} from '@/validators/update-user.schema';
import { useGetRoles } from '@/hooks/useRole';
import { useGetAllClinics } from '@/hooks/useClinic';
import { useMemo } from 'react';
import SelectLoader from '@/core/components/loader/select-loader';
import dynamic from 'next/dynamic';
import PcSvg from '@public/pc.svg';
import Image from 'next/image';

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => <SelectLoader />,
  }
);

export default function UserDetails({ isView }: { isView?: boolean }) {
  const id = useParams<{ id: string }>().id;

  const { data: dataUser, isLoading: isLoadingGetDataUser } =
    useGetUserById(id);

  const { data: dataRoles } = useGetRoles({
    page: 1,
    perPage: 100,
  });
  const { data: dataClinics } = useGetAllClinics({
    page: 1,
    perPage: 100,
    role: 'admin',
  });

  const { mutate: mutateUpdateUser, isPending } = useUpdateUser();

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

  const onSubmit: SubmitHandler<UpdateUserInput> = (data) => {
    const payload: IPayloadUpdateUser = {
      id,
      name: data.name,
      email: data.email,
      roleId: data.roleId,
      clinic_ids: data?.clinic_ids?.map((item) => Number(item)),
    };

    if (id) {
      return mutateUpdateUser(payload, {
        onSuccess: () => {
          toast.success('User updated successfully');
        },
        onError: (error) => {
          const errorMessage =
            (error as any)?.response?.data?.message || 'An error occurred';
          toast.error(errorMessage);
        },
      });
    }
  };

  if (isLoadingGetDataUser) return <Loader size="lg" />;

  return (
    <Form<UpdateUserInput>
      validationSchema={updateUserSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'all',
        defaultValues: {
          name: dataUser?.name,
          email: dataUser?.email,
          roleId: dataUser?.roleId,
          // clinic_ids: dataUser?.clinic_ids,
        },
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        console.log('🚀 ~ errors:', errors);

        return (
          <>
            <div className="mb-10 grid grid-cols-1 gap-7 @2xl:gap-9 @3xl:gap-11 md:grid-cols-2">
              <div className="flex flex-col gap-7">
                <FormGroup
                  title="User Details"
                  className="grid-cols-12 gap-4"
                />
                <FormGroup title="Name" isLabel>
                  <Input
                    placeholder="Name"
                    {...register('name')}
                    error={errors.name?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>

                <FormGroup title="Email" isLabel>
                  <Input
                    placeholder="Email"
                    {...register('email')}
                    error={errors.email?.message}
                    disabled={isView}
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
            </div>

            <div className="mb-10 flex flex-col gap-7">
              <FormGroup title="" className="grid-cols-12" />
              <div className="mx-auto w-full max-w-screen-2xl">
                <div className="border-b border-dashed border-muted pb-4">
                  <FormGroup
                    title="Where you’re logged in"
                    description="We’ll alert you via olivia@untitledui.com if there is any
                    unusual activity on your account."
                    className="grid-cols-12 gap-4"
                  />
                </div>
                <div className="flex items-center gap-6 border-b border-dashed border-muted py-6">
                  <Image
                    src={PcSvg}
                    alt="pc"
                    className="h-7 w-7 text-gray-500 dark:text-gray-400"
                    width={28}
                    height={28}
                  />
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="rizzui-title-h3 text-base font-medium text-gray-900 dark:text-gray-700">
                        2018 Macbook Pro 15-inch
                      </h3>
                      <span className="rizzui-text-span relative hidden rounded-md border border-muted py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:block">
                        Active Now
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="rizzui-text-p text-sm font-normal text-gray-500">
                        Melbourne, Australia
                      </p>
                      <span className="h-1 w-1 rounded-full bg-gray-600"></span>
                      <p className="rizzui-text-p text-sm font-normal text-gray-500">
                        22 Jan at 4:20pm
                      </p>
                    </div>
                    <span className="rizzui-text-span relative mt-2 inline-block rounded-md border border-muted py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:hidden">
                      Active Now
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 py-6">
                  <Image
                    src={PcSvg}
                    alt="pc"
                    className="h-7 w-7 text-gray-500 dark:text-gray-400"
                    width={28}
                    height={28}
                  />
                  <div>
                    <h3 className="rizzui-title-h3 mb-2 text-base font-medium text-gray-900 dark:text-gray-700">
                      2020 Macbook Air M1
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="rizzui-text-p text-sm font-normal text-gray-500">
                        Melbourne, Australia
                      </p>
                      <span className="h-1 w-1 rounded-full bg-gray-600"></span>
                      <p className="rizzui-text-p text-sm font-normal text-gray-500">
                        22 Jan at 4:20pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!isView && (
              <FormFooter
                isLoading={isPending}
                altBtnText="Cancel"
                submitBtnText="Save"
              />
            )}
          </>
        );
      }}
    </Form>
  );
}
