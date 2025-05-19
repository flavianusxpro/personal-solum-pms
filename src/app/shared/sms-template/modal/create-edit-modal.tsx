'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Text, Textarea, Title } from 'rizzui';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import dynamic from 'next/dynamic';
import {
  useGetSmsTemplates,
  usePostCreateSmsTemplate,
  usePutUpdateSmsTemplate,
} from '@/hooks/useTemplate';
import toast from 'react-hot-toast';
import { IGetSmsTemplatesResponse } from '@/types/ApiResponse';
import QuillLoader from '@/core/components/loader/quill-loader';
import {
  smsTemplateFormSchema,
  SmsTemplateFormTypes,
} from '@/validators/create-sms-template.schema';
import cn from '@/core/utils/class-names';

interface CreateEditSmsTemplateModalProps {
  data?: IGetSmsTemplatesResponse['data'][number];
  isView?: boolean;
}

export default function CreateEditSmsTemplateModal({
  data,
  isView,
}: CreateEditSmsTemplateModalProps) {
  const { closeModal } = useModal();

  const { refetch } = useGetSmsTemplates({
    page: 1,
    perPage: 10,
  });
  const { mutate: mutateCreate, isPending: isPendingCreate } =
    usePostCreateSmsTemplate();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    usePutUpdateSmsTemplate();

  const onSubmit: SubmitHandler<SmsTemplateFormTypes> = (formValues) => {
    if (data?.id) {
      mutateUpdate(
        { ...formValues, id: data?.id.toString() },
        {
          onSuccess: () => {
            refetch();
            closeModal();
            toast.success('Sms template updated successfully');
          },
          onError: (error: any) => {
            toast.error(
              'Failed to update sms template: ',
              error?.response?.data?.message
            );
          },
        }
      );
      return;
    }
    mutateCreate(formValues, {
      onSuccess: () => {
        refetch();
        closeModal();
        toast.success('Sms template created successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to create sms template: ',
          error?.response?.data?.message
        );
      },
    });
  };

  return (
    <Form<SmsTemplateFormTypes>
      validationSchema={smsTemplateFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          name: data?.name || '',
          text: data?.text || '',
        },
      }}
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">
                {isView ? 'View' : data ? 'Update' : 'Create'} Sms Template
              </Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Input
              label="Template Name"
              {...register('name')}
              placeholder="Template Name"
              className="w-full"
              error={errors.name?.message}
              disabled={isView}
            />

            <Controller
              name="text"
              control={control}
              disabled={isView}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="SMS Template"
                  className={cn('mt-4', isView && 'mb-4')}
                  labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                  helperText={
                    <Text className="text-sm text-gray-500">
                      min. 10 / max. 100, Characters:{' '}
                      {watch('text')?.length || 0}
                    </Text>
                  }
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
