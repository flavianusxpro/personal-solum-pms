'use client';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { ActionIcon, Flex, Input, Title } from 'rizzui';
import { PiX } from 'react-icons/pi';
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
import { IGetPatientFlagResponse } from '@/types/ApiResponse';
import {
  AddPatientDocumentationForm,
  addPatientDocumentationSchema,
} from '@/validators/add-documentation-patient.schema';
import UploadZone from '@/core/ui/file-upload/upload-zone';

export default function FlagForm({
  flagData,
}: {
  flagData?: IGetPatientFlagResponse['data'][number];
}) {
  const { closeModal } = useModal();
  const id = useParams<{ id: string }>().id;

  const { data: dataPatient } = useGetPatientById(id);
  const { refetch } = useGetPatientDocumentation({
    page: 1,
    perPage: 10,
  });

  const { mutate: mutateCreate, isPending } = useUploadPatientDocumentation();
  // const { mutate: mutateUpdate } = useUpdatePatientDocumentation();

  const onSubmit: SubmitHandler<AddPatientDocumentationForm> = (data) => {
    const payload = new FormData();
    payload.append('name', data.name);
    payload.append('file', data.file);
    payload.append('patientId', dataPatient?.id?.toString() || '');
    // if (flagData?.id) {
    //   return mutateUpdate(
    //     {
    //       id: flagData.id,
    //       patient_id: dataPatient?.id as number,
    //       description: data.description,
    //       category: data.category,
    //     },
    //     {
    //       onSuccess: () => {
    //         refetch();
    //         toast.success('Patient red flag updated successfully');
    //         closeModal();
    //       },
    //       onError: (error: any) => {
    //         toast.error(
    //           error?.response?.data?.message || 'Something went wrong'
    //         );
    //       },
    //     }
    //   );
    // }
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

  return (
    <Form<AddPatientDocumentationForm>
      validationSchema={addPatientDocumentationSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          // category: flagData?.category || '',
          // description: flagData?.description || '',
        },
      }}
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">Add Flag</Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>

            <Input {...register('name')} label="Name" placeholder="Name" />

            <UploadZone
              label="File"
              getValues={getValues}
              setValue={setValue}
              name={'file'}
            />

            <FormFooter
              className="rounded-b-xl"
              // isLoading={isPending}
              altBtnText="Cancel"
              submitBtnText="Save"
              isSticky={false}
            />
          </div>
        );
      }}
    </Form>
  );
}
