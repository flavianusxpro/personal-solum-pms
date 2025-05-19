'use client';

import { useEffect, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Title, Loader } from 'rizzui';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import dynamic from 'next/dynamic';
import {
  emailTemplateFormSchema,
  EmailTemplateFormTypes,
} from '@/validators/create-email-template.schema';
import {
  useGetEmailTemplates,
  usePostCreateEmailTemplate,
  usePutUpdateEmailTemplate,
} from '@/hooks/useTemplate';
import toast from 'react-hot-toast';
import { IGetEmailTemplatesResponse } from '@/types/ApiResponse';
import QuillLoader from '@/core/components/loader/quill-loader';
import cn from '@/core/utils/class-names';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader />,
});

interface CreateEditEmailTemplateModalProps {
  data?: IGetEmailTemplatesResponse['data'][number];
  isView?: boolean;
}

export default function CreateEditEmailTemplateModal({
  data,
  isView,
}: CreateEditEmailTemplateModalProps) {
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);

  const { refetch } = useGetEmailTemplates({
    page: 1,
    perPage: 10,
  });
  const { mutate: mutateCreate, isPending: isPendingCreate } =
    usePostCreateEmailTemplate();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    usePutUpdateEmailTemplate();

  const onSubmit: SubmitHandler<EmailTemplateFormTypes> = (formValues) => {
    if (data?.id) {
      mutateUpdate(
        { ...formValues, id: data?.id.toString() },
        {
          onSuccess: () => {
            refetch();
            closeModal();
            toast.success('Email template updated successfully');
          },
          onError: (error: any) => {
            toast.error(
              'Failed to update email template: ',
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
        toast.success('Email template created successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to create email template: ',
          error?.response?.data?.message
        );
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <Form<EmailTemplateFormTypes>
      validationSchema={emailTemplateFormSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          name: data?.name || '',
          html: data?.html || '',
        },
      }}
    >
      {({ register, control, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">
                {isView ? 'View' : data ? 'Update' : 'Create'} Email Template
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
              name="html"
              control={control}
              disabled={isView}
              render={({ field }) => (
                <QuillEditor
                  {...field}
                  error={errors.html?.message}
                  label="Template Content"
                  className={cn(
                    '@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]',
                    isView && 'mb-3'
                  )}
                  labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
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
