'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Grid, Input, Loader, Title } from 'rizzui';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import { IGetCouponsResponse } from '@/types/ApiResponse';

import { usePostCreateClinic, usePutUpdateClinic } from '@/hooks/useClinic';
import CSelect from '../../ui/select';
import cn from '@/core/utils/class-names';
import {
  CreateCouponForm,
  createCouponSchema,
} from '@/validators/create-coupon.schema';
import { useGetPharmachyList } from '@/hooks/usePharmachy';
import { useGetUsers } from '@/hooks/useUser';
import { useGetItems } from '@/hooks/useItems';
import { useMemo } from 'react';
import {
  useCreateCoupon,
  useGetCoupons,
  useUpdateCoupon,
} from '@/hooks/useCoupon';
import { useGetAllPatients } from '@/hooks/usePatient';
import dynamic from 'next/dynamic';
import { IPayloadCreateUpdateCoupon } from '@/types/paramTypes';
import toast from 'react-hot-toast';

interface IProps {
  data?: IGetCouponsResponse['data'][number];
  isView?: boolean;
}

const MultiSelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  { ssr: false }
);

export default function CreateEditModal({ data, isView }: IProps) {
  const { closeModal } = useModal();

  const { refetch } = useGetCoupons({
    page: 1,
    perPage: 10,
  });

  const { data: dataPharmachies } = useGetPharmachyList({
    page: 1,
    perPage: 10,
    sort: 'DESC',
  });
  const { data: dataPatients } = useGetAllPatients({
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
    useCreateCoupon();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateCoupon();

  const pharmachyOptions = useMemo(() => {
    if (!dataPharmachies) return [];
    return dataPharmachies?.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [dataPharmachies]);

  const patientOptions = useMemo(() => {
    if (!dataPatients) return [];
    return dataPatients?.data.map((item) => ({
      value: item.id.toString(),
      label: item.first_name + ' ' + item.last_name,
    }));
  }, [dataPatients]);

  const productOptions = useMemo(() => {
    if (!dataProducts) return [];
    return dataProducts?.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [dataProducts]);

  const onSubmit: SubmitHandler<CreateCouponForm> = (formValues) => {
    const payload: IPayloadCreateUpdateCoupon = {
      id: data?.id,
      name: formValues.name,
      code: formValues.code,
      category: formValues.select_type,
      description: formValues.description as string,
      discount_amount: Number(formValues.discount_amount),
      discount_type: formValues.discount_type,
      expiry_date: formValues.expiry_date,
      limit: Number(formValues.use_limit),
      patient_limit_use: Number(formValues.patient_limit_use),
      restrict_patient: formValues.restrict_patient?.map((item) =>
        Number(item)
      ) as number[],
      type: formValues.coupon_type,
    };
    if (data?.id) {
      mutateUpdate(payload, {
        onSuccess: () => {
          refetch();
          closeModal();
          toast.success('Coupon updated successfully');
        },
        onError: (error: any) => {
          toast.error(
            'Failed to update coupon: ',
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
        toast.success('Coupon created successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to create coupon: ',
          error?.response?.data?.message
        );
      },
    });
  };

  const parsedRestrictPatient: string[] =
    typeof data?.restrict_patient === 'string'
      ? (data.restrict_patient as string)
          .slice(1, -1)
          .split('","')
          .map((s) => s.replace(/^"|"$/g, ''))
      : Array.isArray(data?.restrict_patient)
        ? data.restrict_patient.map((item) => String(item))
        : [];

  return (
    <Form<CreateCouponForm>
      validationSchema={createCouponSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          select_type: data?.category,
          coupon_type: data?.type,
          name: data?.name,
          code: data?.code,
          discount_type: data?.discount_type,
          discount_amount: data?.discount_amount,
          expiry_date: data?.expiry_date,
          use_limit: data?.limit.toString(),
          patient_limit_use: data?.patient_limit_use.toString(),
          description: data?.description,
          restrict_patient: parsedRestrictPatient,
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
                {isView ? 'View' : data ? 'Update' : 'Create'} Coupon
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
                      { value: 'pharmacy', label: 'Pharmacy' },
                      { value: 'patient', label: 'Patient' },
                      { value: 'product', label: 'Product' },
                    ]}
                    error={errors.select_type?.message}
                    disabled={isView}
                  />
                )}
              />
              {watch('select_type') === 'pharmacy' && (
                <Controller
                  control={control}
                  name="target_id"
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      label="Select Pharmacy"
                      placeholder="Select Pharmacy"
                      options={pharmachyOptions}
                      error={errors.target_id?.message}
                      disabled={isView}
                    />
                  )}
                />
              )}

              {watch('select_type') === 'patient' && (
                <Controller
                  control={control}
                  name="restrict_patient"
                  render={({ field }) => (
                    <MultiSelect
                      {...field}
                      label="Select Patient"
                      placeholder="Select Patient"
                      options={patientOptions}
                      error={errors.restrict_patient?.message}
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
                      { value: 'manual', label: 'Manual' },
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
                      { value: 'fix', label: 'Value' },
                      { value: 'percent', label: 'Percentage' },
                    ]}
                    error={errors.discount_type?.message}
                    disabled={isView}
                  />
                )}
              />
              <Input
                suffix={watch('discount_type') === 'percent' ? '%' : ''}
                prefix={watch('discount_type') === 'fix' ? '$' : ''}
                type="number"
                label="Coupon Value"
                {...register('discount_amount')}
                placeholder="Coupon Value"
                className="w-full"
                error={errors.discount_amount?.message}
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
                {...register('patient_limit_use')}
                placeholder="User Limit"
                className="w-full"
                error={errors.patient_limit_use?.message}
                disabled={isView}
              />

              <Input
                label="Description"
                {...register('description')}
                placeholder="Description"
                className="w-full"
                error={errors.description?.message}
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
