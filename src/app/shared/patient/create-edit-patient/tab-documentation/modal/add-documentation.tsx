'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { ActionIcon, Flex, Input, Title } from 'rizzui';
import { PiX } from 'react-icons/pi';
import React from 'react';
import FormFooter from '@/core/components/form-footer';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  useGetPatientById,
  useGetPatientDocumentation,
  useUpdatePatientDocumentation,
  useUploadPatientDocumentation,
} from '@/hooks/usePatient';
import { IGetPatientDocumentationResponse } from '@/types/ApiResponse';
import {
  AddPatientDocumentationForm,
  addPatientDocumentationSchema,
} from '@/validators/add-documentation-patient.schema';
import UploadZone from '@/core/ui/file-upload/upload-zone';
import { zodResolver } from '@hookform/resolvers/zod';

export default function DocumentationForm({
  data,
}: {
  data?: IGetPatientDocumentationResponse['data'][number];
}) {
  const { closeModal } = useModal();
  const id = useParams<{ id: string }>().id;
  const isEdit = Boolean(data);

  const {
    handleSubmit,
    setValue,
    register,
    getValues,
    formState: { errors },
  } = useForm<AddPatientDocumentationForm>({
    defaultValues: {
      name: data?.name || '',
      files: data?.url ? [new File([], data.name || '')] : [],
    },
    resolver: zodResolver(addPatientDocumentationSchema),
  });

  const { data: dataPatient } = useGetPatientById(id);
  const { refetch } = useGetPatientDocumentation({
    page: 1,
    perPage: 10,
    patientId: dataPatient?.id as number,
  });

  const { mutate: mutateCreate, isPending } = useUploadPatientDocumentation();
  const { mutate: mutateUpdate } = useUpdatePatientDocumentation();

  const onSubmit: SubmitHandler<AddPatientDocumentationForm> = (formValues) => {
    if (data?.id) {
      const payload = new FormData();
      payload.append('name', formValues.name);
      if (formValues.files?.[0] instanceof File) {
        payload.append('file', formValues.files[0]);
      }
      payload.append('id', data.id.toString());
      payload.append('patientId', dataPatient?.id?.toString() || '');

      return mutateUpdate(payload, {
        onSuccess: () => {
          refetch();
          toast.success('Patient red flag updated successfully');
          closeModal();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Something went wrong');
        },
      });
    }

    const payload = new FormData();
    payload.append('name', formValues.name);
    payload.append('file', formValues.files?.[0] as File);
    payload.append('patientId', dataPatient?.id?.toString() || '');
    mutateCreate(payload, {
      onSuccess: () => {
        refetch();
        toast.success('Patient red flag created successfully');
        closeModal();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      },
    });
  };

  async function urlObjectToFile(obj: { path: string; preview: string }) {
    const response = await fetch(obj.preview);
    const blob = await response.blob();
    return new File([blob], obj.path, { type: blob.type });
  }

  React.useEffect(() => {
    const loadFile = async () => {
      if (data?.url) {
        const file = await urlObjectToFile({
          path: data.name,
          preview: data.url,
        });
        setValue('files', [file]);
      }
    };

    loadFile();
  }, [data, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
      <div className="flex flex-col gap-6 px-6 pt-6">
        <Flex justify="between" align="center" gap="4">
          <Title className="text-lg">
            {isEdit ? 'Edit' : 'Add'} Documentation
          </Title>
          <ActionIcon variant="text" onClick={closeModal} className="">
            <PiX className="h-6 w-6" />
          </ActionIcon>
        </Flex>

        <Input
          {...register('name')}
          label="Name"
          placeholder="Name"
          error={errors.name?.message}
        />

        <>
          <a
            href={data?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Document
          </a>
        </>
        <UploadZone
          label="File"
          getValues={getValues}
          setValue={setValue}
          name={'files'}
          error={errors.files?.message}
        />

        <FormFooter
          className="rounded-b-xl"
          // isLoading={isPending}
          altBtnText="Cancel"
          submitBtnText="Save"
          isSticky={false}
        />
      </div>
    </form>
  );
}
