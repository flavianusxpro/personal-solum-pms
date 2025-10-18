'use client';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import FormGroup from '../../ui/form-group';
import AvatarUpload from '@/core/ui/file-upload/avatar-upload';
import { Input, Textarea } from 'rizzui';
import FormFooter from '@/core/components/form-footer';
import { useState } from 'react';
import {
  EmailBroadcastSchema,
  emailBroadcastsSchema,
  SmsBroadcastSchema,
  smsBroadcastsSchema,
} from '@/validators/email-sms-broadcast.schema';
import CSelect from '../../ui/select';
import { DatePicker } from '@/core/ui/datepicker';
import PreviewSms from '../modal/preview-sms';
import { useModal } from '../../modal-views/use-modal';

const CreateEditSmsBroadcast = () => {
  const [setupData, setSetupData] = useState<any>({});
  const { openModal } = useModal();
  const onSubmit: SubmitHandler<SmsBroadcastSchema> = (formValues) => {
    //   const payload: IPayloadCreateUpdateCoupon = {
    //     id: data?.id,
    //     name: formValues.name,
    //     code: formValues.code,
    //     category: formValues.select_type,
    //     description: formValues.description as string,
    //     discount_amount: Number(formValues.discount_amount),
    //     discount_type: formValues.discount_type,
    //     start_date: formValues.start_date,
    //     expiry_date: formValues.expiry_date,
    //     limit: Number(formValues.use_limit),
    //     patient_limit_use: Number(formValues.patient_limit_use),
    //     restrict_patient: formValues.restrict_patient?.map((item) =>
    //       Number(item)
    //     ) as number[],
    //     type: formValues.coupon_type,
    //   };
    //   if (data?.id) {
    //     mutateUpdate(payload, {
    //       onSuccess: () => {
    //         refetch();
    //         closeModal();
    //         toast.success('Coupon updated successfully');
    //       },
    //       onError: (error: any) => {
    //         toast.error(
    //           'Failed to update coupon: ',
    //           error?.response?.data?.message
    //         );
    //       },
    //     });
    //     return;
    //   }
    //   mutateCreate(payload, {
    //     onSuccess: () => {
    //       refetch();
    //       closeModal();
    //       toast.success('Coupon created successfully');
    //     },
    //     onError: (error: any) => {
    //       toast.error(
    //         'Failed to create coupon: ',
    //         error?.response?.data?.message
    //       );
    //     },
    //   });
  };

  const showPreviewEmail = () => {
    openModal({
      view: <PreviewSms data={{}} />,
      customSize: '600px',
    });
  };

  return (
    <Form<SmsBroadcastSchema>
      validationSchema={smsBroadcastsSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          recipient_group: '',
          sender_id: '',
          template: '',
          message_content: '',
          schedule_send: '',
        },
      }}
    >
      {({
        register,
        control,
        setValue,
        getValues,
        watch,
        formState: { errors },
      }) => {
        return (
          <div className="flex flex-col gap-6">
            <FormGroup
              title="Recipient Information"
              description="Select who will receive the SMS."
              className="pt-7"
            />
            <div className="flex flex-col gap-6">
              <div className="flex">
                <label className="w-5/12 font-medium">Recipient Group</label>
                <div className="w-7/12">
                  <Controller
                    control={control}
                    name="recipient_group"
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        onChange={(value: string) => {
                          setValue('recipient_group', value);
                        }}
                        placeholder="Select recipients"
                        options={[]}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex">
                <label className="w-5/12 font-medium">
                  Sender ID (Optional)
                </label>
                <div className="w-7/12">
                  <Input
                    {...register('sender_id')}
                    placeholder="Enter sender id"
                    className="w-full"
                  />
                </div>
              </div>
              <hr />
            </div>

            <FormGroup
              title="Message Content"
              description="Write and personalize your message."
              className="pt-4"
            />
            <div className="flex flex-col gap-6">
              <div className="flex">
                <label className="w-5/12 font-medium">Template</label>
                <div className="w-7/12">
                  <Controller
                    control={control}
                    name="template"
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        onChange={(value: string) => {
                          setValue('template', value);
                        }}
                        placeholder="Select template"
                        options={[]}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex">
                <label className="w-5/12 font-medium">Message Content</label>
                <div className="w-7/12">
                  <Textarea
                    className="col-span-full"
                    placeholder="Write your message here"
                    {...register('message_content')}
                  />
                </div>
              </div>
              <hr />
            </div>

            <FormGroup
              title="Schedule & Delivery"
              description="Set your scheduled send."
              className="pt-4"
            />
            <div className="flex flex-col gap-6">
              <div className="flex">
                <label className="w-5/12 font-medium">
                  Schedule Send (Optional)
                </label>
                <div className="w-7/12">
                  <Controller
                    name="schedule_send"
                    control={control}
                    render={({ field }: any) => {
                      return (
                        <DatePicker
                          popperPlacement="top-start"
                          selected={field.value}
                          onChange={(value) => field.onChange(value)}
                          selectsStart
                          // startDate={value}
                          // endDate={endDateValue}
                          minDate={new Date()}
                          showTimeSelect
                          showTimeSelectOnly
                          dateFormat="dd/mm/yyyy hh:mm"
                          className="w-full"
                          placeholderText="dd/mm/yyyy hh:mm"
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            <FormFooter
              //   isLoading={isPendingUpdate}
              altBtnText="Cancel"
              submitBtnText="Save"
              showPreviewBtn
              handlePreviewBtn={showPreviewEmail}
            />
          </div>
        );
      }}
    </Form>
  );
};

export default CreateEditSmsBroadcast;
