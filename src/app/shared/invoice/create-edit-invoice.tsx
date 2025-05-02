'use client';

import { useMemo, useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@core/ui/form';
import { Text, Input, Textarea, Loader } from 'rizzui';
import { DatePicker } from '@core/ui/datepicker';
import { FormBlockWrapper } from '@/app/shared/invoice/form-utils';
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
import {
  useGetInvoiceById,
  usePostCreateInvoice,
  usePutUpdateInvoice,
} from '@/hooks/useInvoice';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { taxFeeOptions } from '@/config/constants';

export default function CreateEditInvoice({ id }: { id?: string }) {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const { data: dataPatients, isLoading: isLoadingGetPatients } =
    useGetAllPatients({
      page: 1,
      perPage: 100,
    });

  const { data: dataInvoice, isLoading: isLoadingGetInvoice } =
    useGetInvoiceById(id);

  const { mutate: mutateCreate } = usePostCreateInvoice();
  const { mutate: mutateUpdate } = usePutUpdateInvoice();

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
      (totalItemAmount || 0) +
      ((totalItemAmount * Number(data.taxFee)) / 100 || 0) +
      (Number(data.otherFee) || 0);

    if (id) {
      mutateUpdate(
        {
          id: Number(id),
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
          amount: totalItemAmount,
          tax_fee: Number(data.taxFee),
          total_amount: totalAmount,
          note: data.note || '',
          patientId: Number(data.patientId),
          other_fee: Number(data.otherFee),
        },
        {
          onSuccess: () => {
            toast.success('Invoice updated successfully');
            router.push(routes.invoice.home);
          },
          onError: (err: any) => {
            toast.error(err?.response?.data?.message || 'Something went wrong');
          },
          onSettled: () => {
            setLoading(false);
          },
        }
      );
      return;
    }
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
        amount: totalItemAmount,
        tax_fee: Number(data.taxFee),
        total_amount: totalAmount,
        note: data.note || '',
        patientId: Number(data.patientId),
        other_fee: Number(data.otherFee),
      },
      {
        onSuccess: () => {
          toast.success('Invoice created successfully');
          router.push(routes.invoice.home);
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

  if (id && isLoadingGetInvoice) {
    return <Loader className="h-10 w-10" />;
  }

  return (
    <Form<InvoiceFormInput>
      validationSchema={invoiceFormSchema}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          patientId: dataInvoice?.patientId,
          invoice_date: dayjs(dataInvoice?.date).toDate(),
          due_date: dataInvoice?.due_date
            ? dayjs(dataInvoice?.due_date).toDate()
            : dayjs().add(3, 'day').toDate(),
          items: dataInvoice?.items.map((item) => ({
            item: `${item.code} - ${item.name}`,
            amount: Number(item.amount),
            qty: Number(item.qty),
            total_amount: Number(item.total_amount),
          })),
          taxFee: dataInvoice?.tax_fee
            ? Number(dataInvoice?.tax_fee)
            : undefined,
          otherFee: dataInvoice?.other_fee,
          note: dataInvoice?.note,
          total_amount: Number(dataInvoice?.total_amount),
        },
      }}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      {({ register, setValue, control, watch, formState: { errors } }) => {
        const { items, taxFee, otherFee } = watch();

        const totalItemAmount = items
          ? (items || []).reduce((acc: number, item: any) => {
              const itemTotal = Number(item.amount) * Number(item.qty);
              return acc + itemTotal;
            }, 0)
          : 0;
        const totalAmount =
          (totalItemAmount || 0) +
          ((totalItemAmount * Number(taxFee)) / 100 || 0) +
          (Number(otherFee) || 0);

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
                  <Controller
                    name="taxFee"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        suffix={'%'}
                        label="Tax Fee"
                        placeholder="Select Tax Fee"
                        options={taxFeeOptions}
                      />
                    )}
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
