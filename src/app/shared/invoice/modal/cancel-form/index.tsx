import { useModal } from '@/app/shared/modal-views/use-modal';
import FormFooter from '@/core/components/form-footer';
import { Form } from '@/core/ui/form';
import { IGetInvoiceListResponse } from '@/types/ApiResponse';
import { Controller, SubmitHandler } from 'react-hook-form';
import { PiX } from 'react-icons/pi';
import { ActionIcon, Flex, Textarea, Title } from 'rizzui';
import {
  RefundInvoiceForm,
  refundInvoiceSchema,
} from '@/validators/refund-invoice.schema';
import CSelect from '@/app/shared/ui/select';

export default function RefundForm({
  data,
}: {
  data: IGetInvoiceListResponse['data'][number];
}) {
  const { closeModal } = useModal();

  const onSubmit: SubmitHandler<RefundInvoiceForm> = (data) => {
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
    <Form<RefundInvoiceForm>
      validationSchema={refundInvoiceSchema}
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
              <Title className="text-lg">Refund Invoice</Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>

            <CSelect
              options={[
                {
                  label: 'Transfer',
                  value: 'transfer',
                },
              ]}
            />

            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Reason"
                  placeholder="Add your reason here..."
                />
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
