'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Grid, Input, Loader, Textarea, Title } from 'rizzui';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import { IGetRequestCallbackResponse } from '@/types/ApiResponse';

import {
  useGetAllClinics,
  usePostCreateClinic,
  usePutUpdateClinic,
} from '@/hooks/useClinic';
import CSelect from '../../ui/select';
import cn from '@/core/utils/class-names';
import {
  CreateRequestCallbackForm,
  createRequestCallbackSchema,
} from '@/validators/create-request-callback.schema';

interface IProps {
  data?: IGetRequestCallbackResponse['data'][number];
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

  const onSubmit: SubmitHandler<CreateRequestCallbackForm> = (formValues) => {
    // const payload: IPayloadCreateUpdateClinic = {
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
    <Form<CreateRequestCallbackForm>
      validationSchema={createRequestCallbackSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          name: data?.patient_Name || '',
          email: data?.patient_email || '',
          mobile_number: data?.patient_phone || '',
          status: data?.status,
          patient_preferred_time: data?.patient_preferred_time.split('T')[0],
          patient_time: data?.patient_time,
          reason: data?.patient_reason,
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
                {isView ? 'View' : data ? 'Update' : 'Create'} Request Callback
              </Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>

            <Grid columns="2">
              <Input
                label="Patient Name"
                {...register('name')}
                placeholder="Patient Name"
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

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <CSelect
                    {...field}
                    label="Status"
                    placeholder="Select Status"
                    options={[
                      { value: 'already_called', label: 'Already Called' },
                      { value: 'waiting_for_call', label: 'Waiting for Call' },
                      { value: 'no_answer', label: 'No Answer' },
                    ]}
                    error={errors.status?.message}
                    disabled={isView}
                  />
                )}
              />

              <Controller
                control={control}
                name="patient_preferred_time"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    label="Preferred Date"
                    disabled={isView}
                  />
                )}
              />

              <Controller
                control={control}
                name="patient_time"
                render={({ field }) => (
                  <Input {...field} label="Preferred Time" disabled={isView} />
                )}
              />

              <Textarea
                label="Reason"
                {...register('reason')}
                placeholder="Address"
                className="col-span-full"
                error={errors.reason?.message}
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
