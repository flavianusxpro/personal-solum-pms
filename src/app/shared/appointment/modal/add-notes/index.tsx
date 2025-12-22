import { useModal } from '@/app/shared/modal-views/use-modal';
import FormFooter from '@/core/components/form-footer';
import { Form } from '@/core/ui/form';
import { useGetAppointments } from '@/hooks/useAppointment';
import { useCreatePatientFLag } from '@/hooks/usePatientFlag';
import { useCreatePatientNote } from '@/hooks/usePatientNote';
import {
  AddAppointmentNotesForm,
  addAppointmentNotesSchema,
} from '@/validators/add-appointment-notes.schema';
import React, { SetStateAction, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { PiX } from 'react-icons/pi';
import { ActionIcon, Flex, Textarea, Title } from 'rizzui';
import PatientHistory from './PatientHistory';

export default function AddNotesForm({ patient_id, setCreateAction }: { patient_id: number, setCreateAction?: React.Dispatch<SetStateAction<any>> }) {
  const { closeModal } = useModal();

  const { mutate } = useCreatePatientFLag();
  const { refetch } = useGetAppointments({
    page: 1,
    perPage: 10,
  });

  const onSubmit: SubmitHandler<AddAppointmentNotesForm> = (data) => {
    mutate(
      {
        category: 'note',
        description: data.notes,
        patient_id: patient_id,
      },
      {
        onSuccess: () => {
          refetch();
          toast.success('Patient note created successfully');
          closeModal();
        },
        onError: (error: any) => {
          toast.error(
            'Error creating patient note, ',
            error.response?.data.message
          );
        },
      }
    );
  };

  const [seeAll, setSeeAll] = useState(false)

  return (
    <Form<AddAppointmentNotesForm>
      validationSchema={addAppointmentNotesSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, control, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">Add Notes</Title>
              <ActionIcon variant="text" onClick={() => {
                closeModal()
                setCreateAction?.(null)
              }} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <Textarea {...field} placeholder="Add your notes here..." />
              )}
            />

            <div className='flex flex-col gap-4 mb-6'>
              <div className='flex justify-between border-b border-[#E4E4E4]'>
                <h1 className='font-semibold text-sm font-lexend'>
                  Patient History
                </h1>

                <span className='cursor-pointer' onClick={() => setSeeAll(!seeAll)}>
                  {seeAll ? (
                    <BiChevronUp size={30} />
                  ) : (
                    <BiChevronDown size={30} />
                  )}
                </span>
              </div>

              {seeAll && <PatientHistory />}
            </div>
            
            <FormFooter
              className="rounded-b-xl"
              //   isLoading={isPending}
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
