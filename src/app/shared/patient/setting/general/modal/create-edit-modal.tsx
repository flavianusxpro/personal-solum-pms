'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Textarea, Title } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import { IGetType } from '@/types/ApiResponse';
import { typeProblemSchema } from '@/validators/create-problem.schema';
import { useCreateType, useUpdateType, useGetTypes } from '@/hooks/use-type';
import CSelect from '@/app/shared/ui/select';
import toast from 'react-hot-toast';

interface IProps {
  data?: IGetType['data'][number];
  isView?: boolean;
}

export default function CreateEditModal({ data, isView }: IProps) {
  const { closeModal } = useModal();

  const { refetch } = useGetTypes({
    page: 1,
    perPage: 10,
    sort: 'DESC',
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } = useCreateType();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateType();

  const onSubmit: SubmitHandler<any> = (formValues) => {
    const payload = {
      id: data?.id,
      name: formValues.name,
      description: formValues.description,
      is_active: formValues.is_active === 1 ? true : false,
    };
    if (data?.id) {
      mutateUpdate(payload, {
        onSuccess: () => {
          refetch();
          closeModal();
          toast.success('Condition updated successfully');
        },
        onError: (error: any) => {
          toast.error(
            'Failed to update condition: ',
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
        toast.success('Condition created successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to create condition: ',
          error?.response?.data?.message
        );
      },
    });
  };

  return (
    <Form<any>
      validationSchema={typeProblemSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          name: data?.name || '',
          description: data?.description || '',
          is_active: data?.is_active ? 1 : 2,
        },
      }}
    >
      {({ register, control, formState: { errors } }) => {
        console.log(control);
        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">
                {isView ? 'View' : data ? 'Update' : 'Create'} Type
              </Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Input
              label="Category Name"
              {...register('name')}
              placeholder="Category name"
              className="w-full"
              error={errors.name?.message?.toString()}
              disabled={isView}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  placeholder="Description"
                />
              )}
            />

            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <CSelect
                  {...field}
                  label="Status"
                  className="w-full"
                  placeholder="Select Status"
                  options={[
                    { label: 'Active', value: 1 },
                    { label: 'Inactive', value: 2 },
                  ]}
                />
              )}
            />

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
