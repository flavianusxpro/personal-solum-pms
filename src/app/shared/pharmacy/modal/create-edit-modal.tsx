'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Grid, Input, Loader, Title } from 'rizzui';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import dynamic from 'next/dynamic';
import { IGetPharmachyListResponse } from '@/types/ApiResponse';

import { useGetAllClinics } from '@/hooks/useClinic';

import CSelect from '../../ui/select';
import AvatarUpload from '@/core/ui/file-upload/avatar-upload';
import {
  IPayloadCreateEditPharmachy,
  IPayloadCreateUpdateClinic,
} from '@/types/paramTypes';
import toast from 'react-hot-toast';
import FormGroup from '../../ui/form-group';
import cn from '@/core/utils/class-names';
import {
  useGetPharmachyList,
  usePostCreatePharmachy,
  usePutUpdatePharmachy,
} from '@/hooks/usePharmachy';
import {
  CreatePharmachyForm,
  createPharmachySchema,
} from '@/validators/create-pharmachy.schema';
import { useMemo } from 'react';

interface IProps {
  data?: IGetPharmachyListResponse['data'][number];
  isView?: boolean;
}

export default function CreateEditModal({ data, isView }: IProps) {
  const { closeModal } = useModal();

  const { refetch } = useGetPharmachyList({
    page: 1,
    perPage: 10,
    sort: 'DESC',
  });

  const { data: dataClinics } = useGetAllClinics({
    page: 1,
    perPage: 10,
    role: 'admin',
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } =
    usePostCreatePharmachy();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    usePutUpdatePharmachy();

  const clinicOptions = useMemo(() => {
    if (!dataClinics) return [];
    return dataClinics?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [dataClinics]);

  const onSubmit: SubmitHandler<CreatePharmachyForm> = (formValues) => {
    const payload: IPayloadCreateEditPharmachy = {
      id: data?.id,
      name: formValues.name,
      url_logo: formValues.url_logo,
      dispense_email: formValues.dispense_email,
      billing_email: formValues.billing_email,
      phone: formValues.phone,
      address_line_1: formValues.address_line_1,
      address_line_2: formValues.address_line_2,
      city: formValues.city,
      state: formValues.state,
      postcode: formValues.postcode,
      clinicId: formValues.clinicId,
      website: formValues.website,
    };
    if (data?.id) {
      mutateUpdate(payload, {
        onSuccess: () => {
          refetch();
          closeModal();
          toast.success('Pharmachy updated successfully');
        },
        onError: (error: any) => {
          toast.error(
            'Failed to update pharmachy: ',
            error?.response?.data?.message
          );
        },
      });
      return;
    }
    mutateCreate(payload, {
      onSuccess: () => {
        refetch();
        closeModal();
        toast.success('Pharmachy template created successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to create pharmachy: ',
          error?.response?.data?.message
        );
      },
    });
  };

  return (
    <Form<CreatePharmachyForm>
      validationSchema={createPharmachySchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          name: data?.name,
          url_logo: data?.url_logo || '',
          dispense_email: data?.dispense_email,
          billing_email: data?.billing_email,
          phone: data?.phone,
          address_line_1: data?.address_line_1,
          address_line_2: data?.address_line_2,
          city: data?.city,
          state: data?.state,
          postcode: data?.postcode,
          clinicId: data?.clinicId,
          website: data?.website || '',
        },
      }}
    >
      {({
        register,
        control,
        watch,
        setValue,
        getValues,
        formState: { errors },
      }) => {
        console.log('🚀 ~ CreateEditModal ~ errors:', errors);
        return (
          <div
            className={cn('flex flex-col gap-6 px-6 pt-6', isView && 'pb-6')}
          >
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">
                {isView ? 'View' : data ? 'Update' : 'Create'} Pharmachy
              </Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>

            <Grid columns="2">
              <Flex justify="center" align="center" className="col-span-2">
                <FormGroup title="Logo" isLabel className="text-center">
                  <AvatarUpload
                    {...register('url_logo')}
                    name="url_logo"
                    setValue={setValue}
                    getValues={getValues}
                    disabled={isView}
                    error={errors?.url_logo?.message as string}
                  />
                </FormGroup>
              </Flex>

              <Controller
                control={control}
                name="clinicId"
                render={({ field }) => (
                  <CSelect
                    {...field}
                    label="Select Clinic"
                    placeholder="Select Clinic"
                    options={clinicOptions}
                    error={errors.clinicId?.message}
                    disabled={isView}
                  />
                )}
              />
              <Input
                label="Pharmachy Name"
                {...register('name')}
                placeholder="Pharmachy Name"
                className="w-full"
                error={errors.name?.message}
                disabled={isView}
              />

              <Input
                label="Dispense Email"
                {...register('dispense_email')}
                placeholder="Dispense Email"
                className="w-full"
                error={errors.dispense_email?.message}
                disabled={isView}
              />

              <Input
                type="number"
                label="Phone Number"
                {...register('phone')}
                placeholder="Mobile Number"
                className="w-full"
                error={errors.phone?.message}
                disabled={isView}
              />
              <Input
                label="Billing Email"
                {...register('billing_email')}
                placeholder="Billing Email"
                className="w-full"
                error={errors.billing_email?.message}
                disabled={isView}
              />
              <Input
                label="Website"
                {...register('website')}
                placeholder="Website"
                className="w-full"
                error={errors.website?.message}
                disabled={isView}
              />
              <Input
                label="Address Line 1"
                {...register('address_line_1')}
                placeholder="Address Line 1"
                className="w-full"
                error={errors.address_line_1?.message}
                disabled={isView}
              />
              <Input
                label="Address Line 1"
                {...register('address_line_1')}
                placeholder="Address Line 1"
                className="w-full"
                error={errors.address_line_1?.message}
                disabled={isView}
              />
              <Input
                label="Address Line 2"
                {...register('address_line_2')}
                placeholder="Address Line 2"
                className="w-full"
                error={errors.address_line_2?.message}
                disabled={isView}
              />
              <Input
                label="City"
                {...register('city')}
                placeholder="City"
                className="w-full"
                error={errors.city?.message}
                disabled={isView}
              />
              <Input
                label="State"
                {...register('state')}
                placeholder="State"
                className="w-full"
                error={errors.state?.message}
                disabled={isView}
              />
              <Input
                label="Postcode"
                {...register('postcode')}
                placeholder="Postcode"
                className="w-full"
                error={errors.postcode?.message}
                disabled={isView}
              />
            </Grid>

            {isView ? null : (
              <FormFooter
                className="rounded-b-xl"
                isLoading={isPendingCreate || isPendingUpdate}
                altBtnText="Cancel"
                submitBtnText="Save"
                isSticky={false}
              />
            )}
          </div>
        );
      }}
    </Form>
  );
}
