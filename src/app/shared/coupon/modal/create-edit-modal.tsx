'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Grid, Input, Loader, Title } from 'rizzui';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import dynamic from 'next/dynamic';
import { IGetAllClinicForPatientResponse } from '@/types/ApiResponse';

import {
  useGetAllClinics,
  usePostCreateClinic,
  usePutUpdateClinic,
} from '@/hooks/useClinic';
import {
  CreateBranchForm,
  createBranchSchema,
} from '@/validators/create-branch.schema';
import CSelect from '../../ui/select';
import AvatarUpload from '@/core/ui/file-upload/avatar-upload';
import { IPayloadCreateUpdateClinic } from '@/types/paramTypes';
import toast from 'react-hot-toast';
import FormGroup from '../../ui/form-group';
import cn from '@/core/utils/class-names';
import {
  CreateCouponForm,
  createCouponSchema,
} from '@/validators/create-coupon.schema';
import { useGetPharmachyList } from '@/hooks/usePharmachy';
import { useGetUsers } from '@/hooks/useUser';
import { useGetItems } from '@/hooks/useItems';
import { useMemo } from 'react';

interface IProps {
  data?: IGetAllClinicForPatientResponse['data'][number];
  isView?: boolean;
}

export default function CreateEditModal({ data, isView }: IProps) {
  const { closeModal } = useModal();

  // const { refetch } = useGetAllClinics({
  //   page: 1,
  //   perPage: 10,
  //   sort: 'DESC',
  //   role: 'admin',
  // });

  const { data: dataPharmachies } = useGetPharmachyList({
    page: 1,
    perPage: 10,
    sort: 'DESC',
  });
  const { data: dataUsers } = useGetUsers({
    page: 1,
    perPage: 100,
    sort: 'DESC',
  });
  const { data: dataProducts } = useGetItems({
    page: 1,
    perPage: 100,
    sort: 'DESC',
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } =
    usePostCreateClinic();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    usePutUpdateClinic();

  const pharmachyOptions = useMemo(() => {
    if (!dataPharmachies) return [];
    return dataPharmachies?.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [dataPharmachies]);

  const userOptions = useMemo(() => {
    if (!dataUsers) return [];
    return dataUsers?.users.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [dataUsers]);

  const productOptions = useMemo(() => {
    if (!dataProducts) return [];
    return dataProducts?.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [dataProducts]);

  const onSubmit: SubmitHandler<CreateCouponForm> = (formValues) => {
    console.log('🚀 ~ CreateEditModal ~ formValues:', formValues);
    // const payload: IPayloadCreateUpdateClinic = {
    //   id: data?.id.toString(),
    //   name: formValues.name,
    //   email: formValues.email,
    //   mobile_number: formValues.mobile_number,
    //   address: formValues.address,
    //   url_logo: formValues.url_logo,
    //   status: formValues.status || 0,
    //   default: formValues.default === 1 ? true : false,
    // };
    // if (data?.id) {
    //   mutateUpdate(payload, {
    //     onSuccess: () => {
    //       refetch();
    //       closeModal();
    //       toast.success('Branch updated successfully');
    //     },
    //     onError: (error: any) => {
    //       toast.error(
    //         'Failed to update branch: ',
    //         error?.response?.data?.message
    //       );
    //     },
    //   });
    //   return;
    // }
    // mutateCreate(payload, {
    //   onSuccess: () => {
    //     refetch();
    //     closeModal();
    //     toast.success('Branch template created successfully');
    //   },
    //   onError: (error: any) => {
    //     toast.error(
    //       'Failed to create branch: ',
    //       error?.response?.data?.message
    //     );
    //   },
    // });
  };

  return (
    <Form<CreateCouponForm>
      validationSchema={createCouponSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {},
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
                {isView ? 'View' : data ? 'Update' : 'Create'} Branch
              </Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>

            <Grid columns="2">
              <Controller
                control={control}
                name="select_type"
                render={({ field }) => (
                  <CSelect
                    {...field}
                    onChange={(value: string) => {
                      setValue('select_type', value);
                      if (value === 'general') {
                        setValue('target_id', 'all');
                      } else {
                        setValue('target_id', '');
                      }
                    }}
                    label="Select Type"
                    placeholder="Select Type"
                    options={[
                      { value: 'general', label: 'General' },
                      { value: 'pharmachy', label: 'Pharmachy' },
                      { value: 'user', label: 'User' },
                      { value: 'product', label: 'Product' },
                    ]}
                    error={errors.select_type?.message}
                    disabled={isView}
                  />
                )}
              />
              {watch('select_type') === 'pharmachy' && (
                <Controller
                  control={control}
                  name="target_id"
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      label="Select Pharmachy"
                      placeholder="Select Pharmachy"
                      options={pharmachyOptions}
                      error={errors.target_id?.message}
                      disabled={isView}
                    />
                  )}
                />
              )}

              {watch('select_type') === 'user' && (
                <Controller
                  control={control}
                  name="target_id"
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      label="Select User"
                      placeholder="Select User"
                      options={userOptions}
                      error={errors.target_id?.message}
                      disabled={isView}
                    />
                  )}
                />
              )}

              {watch('select_type') === 'product' && (
                <Controller
                  control={control}
                  name="target_id"
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      label="Select Product"
                      placeholder="Select Product"
                      options={productOptions}
                      error={errors.target_id?.message}
                      disabled={isView}
                    />
                  )}
                />
              )}

              <Controller
                control={control}
                name="coupon_type"
                render={({ field }) => (
                  <CSelect
                    {...field}
                    label="Coupon Type"
                    placeholder="Select Coupon Type"
                    options={[
                      { value: 'code', label: 'Code' },
                      { value: 'automatic', label: 'Automatic' },
                    ]}
                    error={errors.coupon_type?.message}
                    disabled={isView}
                  />
                )}
              />
              <Input
                label="Coupon Name"
                {...register('name')}
                placeholder="Coupon Name"
                className="w-full"
                error={errors.name?.message}
                disabled={isView}
              />
              <Input
                label="Coupon Code"
                {...register('code')}
                placeholder="Coupon Code"
                className="w-full"
                error={errors.code?.message}
                disabled={isView}
              />
              <Controller
                control={control}
                name="discount_type"
                render={({ field }) => (
                  <CSelect
                    {...field}
                    label="Discount Type"
                    placeholder="Select Discount Type"
                    options={[
                      { value: 'value', label: 'Value' },
                      { value: 'percentage', label: 'Percentage' },
                    ]}
                    error={errors.discount_type?.message}
                    disabled={isView}
                  />
                )}
              />
              <Input
                suffix={watch('discount_type') === 'percentage' ? '%' : ''}
                prefix={watch('discount_type') === 'value' ? '$' : ''}
                type="number"
                label="Coupon Value"
                {...register('value')}
                placeholder="Coupon Value"
                className="w-full"
                error={errors.value?.message}
                disabled={isView}
              />

              <Input
                label="Expiry Date"
                {...register('expiry_date')}
                type="date"
                placeholder="Expiry Date"
                className="w-full"
                error={errors.expiry_date?.message}
                disabled={isView}
              />

              <Input
                type="number"
                label="Use Limit"
                {...register('use_limit')}
                placeholder="Use Limit"
                className="w-full"
                error={errors.use_limit?.message}
                disabled={isView}
              />

              <Input
                label="User Limit"
                type="number"
                {...register('user_limit')}
                placeholder="User Limit"
                className="w-full"
                error={errors.user_limit?.message}
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
