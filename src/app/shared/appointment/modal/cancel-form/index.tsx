import { useModal } from '@/app/shared/modal-views/use-modal';
import FormFooter from '@/core/components/form-footer';
import { Form } from '@/core/ui/form';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import {
  cancelAppoinmentSchema,
  CancelAppointmentForm,
} from '@/validators/cancel-appointment.schema';
import { Controller, SubmitHandler } from 'react-hook-form';
import { PiCalendarCheckLight, PiMapPinLight, PiX } from 'react-icons/pi';
import { ActionIcon, Flex, Textarea, Title } from 'rizzui';
import { getPaymentStatusBadge } from '../../appointment-list/list/columns';
import dayjs from 'dayjs';

export default function CancelForm({
  data,
}: {
  data: IGetAppointmentListResponse['data'][number];
}) {
  const { closeModal } = useModal();

  const onSubmit: SubmitHandler<CancelAppointmentForm> = (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    // mutate(
    // {
    //     id: data.id,
    //     note: data.note,
    // },
    // {
    //     onSuccess: () => {
    //     toast.success('Note updated successfully');
    //     closeModal();
    //     },
    //     onError: (error) => {
    //     toast.error('Failed to update note: ' + error.message);
    //     },
    // }
    // );
  };

  return (
    <Form<CancelAppointmentForm>
      validationSchema={cancelAppoinmentSchema}
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
              <Title className="text-lg">Cancel Appointment</Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>

            <div className="flex flex-col gap-2">
              <ul className="space-y-4 text-xs sm:text-sm">
                <li className="flex items-center">
                  <PiCalendarCheckLight className="me-2 hidden w-5 shrink-0 text-xl" />
                  Appointment with :{' '}
                  <span className="ps-2 font-medium text-gray-1000">
                    {data?.doctor?.last_name}
                  </span>
                </li>
                <li className="flex items-center">
                  <PiCalendarCheckLight className="me-2 hidden w-5 shrink-0 text-xl" />
                  Appointment Date:{' '}
                  <span className="ps-2 font-medium text-gray-1000">
                    {dayjs(data?.date).format('DD MMM, YYYY h:mm A')}
                  </span>
                </li>
                <li className="flex items-center">
                  <PiMapPinLight className="me-2 hidden w-5 shrink-0 text-xl" />
                  Appointment Type:{' '}
                  <span className="ps-2 font-medium text-gray-1000">
                    {data?.type}
                  </span>
                </li>
                <li className="flex items-center">
                  <PiMapPinLight className="me-2 hidden w-5 shrink-0 text-xl" />
                  Payment Status:{' '}
                  <span className="ps-2 font-medium text-gray-1000">
                    {getPaymentStatusBadge(data?.payment?.status || 1)}
                  </span>
                </li>
                <li className="flex items-center">
                  Patient Notes:{' '}
                  <span className="ps-2 font-medium text-gray-1000">
                    {data?.note ?? '-'}
                  </span>
                </li>
                <li className="flex items-center">
                  Patient Symtom History:{' '}
                  <span className="ps-2 font-medium text-gray-1000">
                    {data?.patient_problem ?? '-'}
                  </span>
                </li>
              </ul>
            </div>

            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <Textarea {...field} placeholder="Add your reason here..." />
              )}
            />
            <FormFooter
              className="rounded-b-xl"
              //   isLoading={isPending}
              altBtnText="Cancel"
              submitBtnText="Submit"
              isSticky={false}
            />
          </div>
        );
      }}
    </Form>
  );
}
