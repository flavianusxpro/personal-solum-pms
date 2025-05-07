'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Loader, Text, Textarea, Title } from 'rizzui';
import { useModal } from '../../modal-views/use-modal';
import toast from 'react-hot-toast';
import { IGetAllItemsResponse } from '@/types/ApiResponse';
import {
  CreateRoleInput,
  createRoleSchema,
} from '@/validators/create-role.schema';

import { useMemo } from 'react';
import {
  useGetItems,
  usePostCreateItem,
  useUpdateItem,
} from '@/hooks/useItems';
import {
  ProductFormInput,
  productFormSchema,
} from '@/validators/create-edit-product.schema';
import FormGroup from '../../ui/form-group';
import { PiX } from 'react-icons/pi';

interface CreateEditSmsTemplateModalProps {
  data?: IGetAllItemsResponse['data'][number];
  isView?: boolean;
}

export default function CreateEditItemModal({
  data,
  isView,
}: CreateEditSmsTemplateModalProps) {
  const { closeModal } = useModal();

  const { refetch } = useGetItems({
    page: 1,
    perPage: 10,
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } =
    usePostCreateItem();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateItem();

  const onSubmit: SubmitHandler<ProductFormInput> = (formValues) => {
    const payload = {
      ...formValues,
      id: data?.id.toString(),
      price: Number(formValues.price),
    };

    if (data?.id) {
      mutateUpdate(payload, {
        onSuccess: () => {
          refetch();
          closeModal();
          toast.success('Items updated successfully');
        },
        onError: (error: any) => {
          toast.error(
            'Failed to update item: ',
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
        toast.success('Item template created successfully');
      },
      onError: (error: any) => {
        toast.error('Failed to create item: ', error?.response?.data?.message);
      },
    });
  };

  return (
    <div className="@container">
      <Form<ProductFormInput>
        validationSchema={productFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            code: data?.code || '',
            name: data?.name || '',
            description: data?.description || '',
            price: data?.price,
          },
        }}
        className="flex flex-grow flex-col @container [&_label]:font-medium"
      >
        {({
          register,
          control,
          setValue,
          getValues,
          formState: { errors },
        }) => {
          return (
            <div className="flex flex-col gap-6 px-6 pt-6">
              <Flex justify="between" align="center" gap="4">
                <Title className="text-lg">
                  {isView ? 'View' : data ? 'Update' : 'Create'} Product
                </Title>
                <ActionIcon variant="text" onClick={closeModal} className="">
                  <PiX className="h-6 w-6" />
                </ActionIcon>
              </Flex>
              <Input
                label="Product Code"
                placeholder="Code"
                {...register('code')}
                error={errors.code?.message}
                className="flex-grow"
                disabled={isView}
              />
              <Input
                label="Product Name"
                placeholder="Name"
                {...register('name')}
                error={errors.name?.message}
                className="flex-grow"
                disabled={isView}
              />

              <Textarea
                label="Description"
                placeholder="Description"
                {...register('description')}
                error={errors.description?.message}
                className="flex-grow"
                disabled={isView}
              />
              <Input
                type="number"
                label="Price"
                prefix={'$'}
                placeholder="15"
                {...register('price')}
                error={errors.price?.message}
              />
              {!isView && (
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
    </div>
  );
}
