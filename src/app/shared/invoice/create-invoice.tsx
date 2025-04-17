'use client';

import { useMemo, useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@core/ui/form';
import { Text, Input, Select, Textarea } from 'rizzui';
import { PhoneNumber } from '@core/ui/phone-input';
import { DatePicker } from '@core/ui/datepicker';
import {
  FormBlockWrapper,
  statusOptions,
  renderOptionDisplayValue,
} from '@/app/shared/invoice/form-utils';
import { AddInvoiceItems } from '@/app/shared/invoice/add-invoice-items';
import FormFooter from '@core/components/form-footer';
import { toast } from 'react-hot-toast';
import {
  InvoiceFormInput,
  invoiceFormSchema,
} from '@/validators/create-invoice.schema';
import CSelect from '../ui/select';
import { useGetAllPatients } from '@/hooks/usePatient';
import dayjs from 'dayjs';
import { usePostCreateInvoice } from '@/hooks/useInvoice';

export default function CreateInvoice({ id }: { id?: string }) {
  const [isLoading, setLoading] = useState(false);

  const { data: dataPatients, isLoading: isLoadingGetPatients } =
    useGetAllPatients({
      page: 1,
      perPage: 100,
    });

  const { mutate: mutateCreate } = usePostCreateInvoice();

  const patientOptions = useMemo(() => {
    if (!dataPatients?.data) return [];
    return dataPatients?.data.map((item) => ({
      label: `${item.first_name} ${item.last_name}`,
      value: item.id,
    }));
  }, [dataPatients]);

  const onSubmit: SubmitHandler<InvoiceFormInput> = (data) => {
    setLoading(true);
    const totalItemAmount = (data.items || []).reduce(
      (acc: number, item: any) => {
        const itemTotal = Number(item.amount) * Number(item.qty);
        return acc + itemTotal;
      },
      0
    );
    const totalAmount =
      (totalItemAmount || 0) -
      (Number(data.taxFee) || 0) -
      (Number(data.otherFee) || 0);

    mutateCreate(
      {
        invoice_date: dayjs(data.invoice_date).format('YYYY-MM-DD'),
        due_date: dayjs(data.due_date).format('YYYY-MM-DD'),
        items: (data.items || []).map((item) => ({
          ...item,
          code: item.item.split(' - ')[0],
          name: item.item.split(' - ')[1],
          amount: Number(item.amount),
          qty: Number(item.qty),
          total_amount: Number(item.amount) * Number(item.qty),
        })),
        amount: Number(data.total_amount),
        fee: Number(data.fee),
        total_amount: totalAmount,
        note: data.note || '',
        patientId: Number(data.patientId),
      },
      {
        onSuccess: () => {
          toast.success('Invoice created successfully');
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || 'Something went wrong');
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <Form<InvoiceFormInput>
      validationSchema={invoiceFormSchema}
      onSubmit={onSubmit}
      useFormProps={{}}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      {({ register, setValue, control, watch, formState: { errors } }) => {
        console.log('🚀 ~ CreateInvoice ~ errors:', errors);

        const totalItemAmount = watch('items')
          ? (watch('items') || []).reduce((acc: number, item: any) => {
              const itemTotal = Number(item.amount) * Number(item.qty);
              return acc + itemTotal;
            }, 0)
          : 0;
        const totalAmount =
          (totalItemAmount || 0) -
          (Number(watch('taxFee')) || 0) -
          (Number(watch('otherFee')) || 0);

        return (
          <>
            <div className="flex-grow pb-10">
              <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
                <FormBlockWrapper
                  title={'Patient'}
                  description={'Patient information'}
                >
                  <Controller
                    name="patientId"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        isLoading={isLoadingGetPatients}
                        label="Patient"
                        placeholder="Select Patient"
                        options={patientOptions}
                        name="patientId"
                        className={'col-span-full'}
                        error={errors.patientId?.message}
                      />
                    )}
                  />
                </FormBlockWrapper>

                <FormBlockWrapper
                  title={'Date'}
                  description={'Date of invoice creation'}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11"
                >
                  <Controller
                    name="invoice_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        placeholderText="Select invoice date"
                        value={
                          field.value
                            ? dayjs(field.value).format('YYYY-MM-DD')
                            : undefined
                        }
                        inputProps={{ label: 'Invoice Date' }}
                        popperPlacement="top-start"
                        dateFormat="YYYY-MM-DD"
                        error={errors.invoice_date?.message}
                      />
                    )}
                  />
                  <Controller
                    name="due_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        placeholderText="Select due date"
                        value={
                          field.value
                            ? dayjs(field.value).format('YYYY-MM-DD')
                            : undefined
                        }
                        inputProps={{ label: 'Due Date' }}
                        popperPlacement="top-start"
                        dateFormat="YYYY-MM-DD"
                        error={errors.due_date?.message}
                      />
                    )}
                  />
                </FormBlockWrapper>

                <AddInvoiceItems
                  watch={watch}
                  control={control}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                />

                <FormBlockWrapper
                  title={'Fee'}
                  description={'To he who will receive this invoice'}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11"
                >
                  <Input
                    type="number"
                    label="Tax Fee"
                    prefix={'$'}
                    placeholder="15"
                    {...register('taxFee')}
                    error={errors.taxFee?.message}
                  />
                  <Input
                    type="number"
                    label="Other Fee"
                    prefix={'$'}
                    placeholder="15"
                    {...register('otherFee')}
                    error={errors.otherFee?.message}
                  />

                  <Textarea
                    label="Note"
                    placeholder="Note"
                    {...register('note')}
                    error={errors.note?.message}
                    className="col-span-full"
                  />
                </FormBlockWrapper>
                <FormBlockWrapper
                  title={'Total Amount'}
                  description={'Total amount of the invoice'}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11"
                >
                  <div className="col-span-full">
                    <Text className="flex items-center justify-between text-base font-semibold text-gray-900">
                      Total: <Text as="span">$ {totalAmount}</Text>
                    </Text>
                  </div>
                </FormBlockWrapper>
              </div>
            </div>

            <FormFooter
              isLoading={isLoading}
              submitBtnText={id ? 'Update Invoice' : 'Create Invoice'}
            />
          </>
        );
      }}
    </Form>
  );
}
