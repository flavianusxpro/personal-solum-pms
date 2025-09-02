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

interface IProps {
  data?: IGetAllClinicForPatientResponse['data'][number];
  isView?: boolean;
}

export default function CreateEditModal({ data, isView }: IProps) {
  const { closeModal } = useModal();

  const { refetch } = useGetAllClinics({
    page: 1,
    perPage: 10,
    sort: 'DESC',
    role: 'admin',
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } =
    usePostCreateClinic();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    usePutUpdateClinic();

  const onSubmit: SubmitHandler<CreateBranchForm> = (formValues) => {
    const payload: IPayloadCreateUpdateClinic = {
      id: data?.id.toString(),
      name: formValues.name,
      email: formValues.email,
      mobile_number: formValues.mobile_number,
      address: formValues.address,
      url_logo: formValues.url_logo,
      status: formValues.status || 0,
      default: formValues.default === 1 ? true : false,
    };

    if (data?.id) {
      mutateUpdate(payload, {
        onSuccess: () => {
          refetch();
          closeModal();
          toast.success('Branch updated successfully');
        },
        onError: (error: any) => {
          toast.error(
            'Failed to update branch: ',
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
        toast.success('Branch template created successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to create branch: ',
          error?.response?.data?.message
        );
      },
    });
  };

  return (
    <Form<CreateBranchForm>
      validationSchema={createBranchSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          name: data?.name || '',
          email: data?.email || '',
          mobile_number: data?.mobile_number || '',
          address: data?.address || '',
          url_logo: data?.logo || '',
          status: data?.status || 2,
          default: data?.default ? 1 : 2,
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
              <Flex justify="center" align="center" className="col-span-2">
                <FormGroup title="Logo" isLabel className="text-center">
                  <AvatarUpload
                    {...register('url_logo')}
                    name="url_logo"
                    setValue={setValue}
                    getValues={getValues}
                    disabled={isView}
                    path_name="logo"
                    error={errors?.url_logo?.message as string}
                  />
                </FormGroup>
              </Flex>
              <Input
                label="Clinic Name"
                {...register('name')}
                placeholder="Clinic Name"
                className="w-full"
                error={errors.name?.message}
                disabled={isView}
              />

              <Input
                label="Email"
                {...register('email')}
                placeholder="Email"
                className="w-full"
                error={errors.email?.message}
                disabled={isView}
              />

              <Input
                type="number"
                label="Mobile Number"
                {...register('mobile_number')}
                placeholder="Mobile Number"
                className="w-full"
                error={errors.mobile_number?.message}
                disabled={isView}
              />
              <Input
                label="Address"
                {...register('address')}
                placeholder="Address"
                className="w-full"
                error={errors.address?.message}
                disabled={isView}
              />

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <CSelect
                    {...field}
                    label="Status"
                    placeholder="Select Status"
                    options={[
                      { value: 1, label: 'Active' },
                      { value: 2, label: 'Not Verified' },
                    ]}
                    error={errors.status?.message}
                    disabled={isView}
                  />
                )}
              />

              <Controller
                control={control}
                name="default"
                render={({ field }) => (
                  <CSelect
                    {...field}
                    label="Branch Type"
                    placeholder="Select Branch Type"
                    options={[
                      { value: 1, label: 'Head Office' },
                      { value: 2, label: 'Branch' },
                    ]}
                    error={errors.default?.message}
                    disabled={isView}
                  />
                )}
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
