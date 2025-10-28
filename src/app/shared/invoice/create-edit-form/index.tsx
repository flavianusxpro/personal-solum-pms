'use client';

import { useMemo, useState, useEffect } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@core/ui/form';
import { Text, Input, Textarea, Loader, Flex, Grid } from 'rizzui';
import { DatePicker } from '@core/ui/datepicker';
import { FormBlockWrapper } from '@/app/shared/invoice/create-edit-form/form-utils';
import { AddInvoiceItems } from '@/app/shared/invoice/create-edit-form/add-invoice-items';
import FormFooter from '@core/components/form-footer';
import { toast } from 'react-hot-toast';
import {
  InvoiceFormInput,
  invoiceFormSchema,
} from '@/validators/create-invoice.schema';
import CSelect from '@/app/shared/ui/select';
import { useGetAllPatients } from '@/hooks/usePatient';
import dayjs from 'dayjs';
import {
  useGetInvoiceById,
  useGetInvoices,
  usePostCreateInvoice,
  usePutUpdateInvoice,
} from '@/hooks/useInvoice';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { useGetTaxes } from '@/hooks/useTax';
import { currencyAtom } from '@/store/currency';
import { useAtom } from 'jotai';
import { useProfile } from '@/hooks/useProfile';

export default function CreateEditInvoice({ id }: { id?: string }) {
  const router = useRouter();
  const [currencyData] = useAtom(currencyAtom);

  const [isLoading, setLoading] = useState(false);

  const { data: dataProfile } = useProfile(true);

  const { data: dataPatients, isLoading: isLoadingGetPatients } =
    useGetAllPatients({
      page: 1,
      perPage: 100,
    });

  const { data: dataInvoice, isLoading: isLoadingGetInvoice } =
    useGetInvoiceById(id);

  const { data: dataInvoices, isLoading: isLoadingInvoices } = useGetInvoices({
    page: 1,
    perPage: 10,
  });

  const { data: dataTaxes } = useGetTaxes({
    page: 1,
    perPage: 100,
  });

  const { mutate: mutateCreate } = usePostCreateInvoice();
  const { mutate: mutateUpdate } = usePutUpdateInvoice();

  const patientOptions = useMemo(() => {
    if (!dataPatients?.data) return [];
    return dataPatients?.data.map((item) => ({
      label: `${item.first_name} ${item.last_name}`,
      value: item.id,
      data: item,
    }));
  }, [dataPatients]);

  const taxFeeOptions = useMemo(() => {
    if (!dataTaxes?.data) return [];
    return dataTaxes?.data.map((item) => ({
      label: `${item.description}`,
      value: item.id,
      fee: item.value,
    }));
  }, [dataTaxes]);

  const onSubmit: SubmitHandler<InvoiceFormInput> = (data) => {
    setLoading(true);
    const totalItemAmount = (data.items || []).reduce(
      (acc: number, item: any) => {
        const itemTotal = Number(item.amount) * Number(item.qty);
        // const itemTotalWithTax =
        //   itemTotal +
        //   (Number(item.tax_fee) ? (itemTotal * Number(item.tax_fee)) / 100 : 0);
        return acc + itemTotal;
      },
      0
    );

    const totalTax = (data.items || []).reduce((acc: number, item: any) => {
      const itemTotal = Number(item.amount) * Number(item.qty);
      const itemTax = Number(item.tax_fee)
        ? (itemTotal * Number(item.tax_fee)) / 100
        : 0;
      return acc + itemTax;
    }, 0);

    // const totalAmount =
    //   (totalItemAmount || 0) +
    //   ((totalItemAmount * Number(data.taxFee)) / 100 || 0) +
    //   (Number(data.otherFee) || 0);
    const totalAmount =
      (totalItemAmount || 0) + (totalTax || 0) + (Number(data.otherFee) || 0);

    if (id) {
      mutateUpdate(
        {
          id: Number(id),
          invoice_date: dayjs(data.invoice_date).format('YYYY-MM-DD'),
          due_date: dayjs(data.due_date).format('YYYY-MM-DD'),
          items: (data.items || []).map((item: any) => ({
            ...item,
            code: item.item.split(' - ')[0].toUpperCase(),
            name: item.item.split(' - ')[1],
            amount: Number(item.amount),
            qty: Number(item.qty),
            total_amount: Number(item.amount) * Number(item.qty),
          })),
          amount: totalItemAmount,
          tax_fee: Number(data.taxFee || 0),
          total_amount: totalAmount,
          note: data.note || '',
          patientId: Number(data.patientId),
          other_fee: Number(data.otherFee || 0),
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
        clinicId: dataProfile?.clinics[0].id,
        invoice_date: dayjs(data.invoice_date).format('YYYY-MM-DD'),
        due_date: dayjs(data.due_date).format('YYYY-MM-DD'),
        items: (data.items || []).map((item: any) => {
          return {
            ...item,
            code: item.item.split(' - ')[0]?.toUpperCase(),
            name: item.item.split(' - ')[1],
            amount: Number(item.amount),
            qty: Number(item.qty),
            total_amount: Number(item.amount) * Number(item.qty),
          };
        }),
        amount: totalItemAmount,
        tax_fee: totalTax,
        total_amount: totalAmount,
        note: data.note || '',
        patientId: Number(data.patientId),
        other_fee: Number(data.otherFee || 0),
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

  if ((id && isLoadingGetInvoice) || isLoadingInvoices) {
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
          branding_theme: 'default',
          due_date: dataInvoice?.due_date
            ? dayjs(dataInvoice?.due_date).toDate()
            : dayjs().add(3, 'day').toDate(),
          items: dataInvoice?.items.map((item) => ({
            item: `${item.code} - ${item.name}`,
            amount: Number(item.amount),
            qty: Number(item.qty),
            taxId: Number(item.taxId),
            tax_fee: Number(item.tax_fee),
            total_amount: Number(item.total_amount),
          })),
          taxFee: dataInvoice?.tax_fee
            ? Number(dataInvoice?.tax_fee)
            : undefined,
          otherFee: dataInvoice?.other_fee,
          address: '',
          internal_note: '',
          note: dataInvoice?.note,
          total_amount: Number(dataInvoice?.total_amount),
          invoice_number:
            dataInvoice?.id?.toString() ||
            ((dataInvoices?.count ?? 0) + 1).toString(),
        },
      }}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      {({ register, setValue, control, watch, formState: { errors } }) => {
        const { items, taxFee, otherFee, patientId, total_amount } = watch();

        useEffect(() => {
          if (!patientId) {
            setValue('address', '');
            return;
          }
          const selectedPatient: any = patientOptions.find(
            (p) => p.value === patientId
          );
          const d = selectedPatient?.data || {};
          const parts = [
            d.address_line_1,
            d.address_line_2,
            d.suburb,
            d.state,
            d.post_code,
            d.country,
          ]
            .map((v: any) =>
              v !== undefined && v !== null ? String(v).trim() : ''
            )
            .filter((v: string) => v.length > 0);
          const address = parts.join(', ');

          setValue('address', address);
        }, [patientId, patientOptions, setValue]);

        const totalItemAmount = items
          ? (items || []).reduce((acc: number, item: any) => {
              const perItemTotal = Number(item.amount) * Number(item.qty);
              return acc + perItemTotal;
            }, 0)
          : 0;

        const totalAmount = items
          ? (items || []).reduce((acc: number, item: any) => {
              const perItemTotal = Number(item.amount) * Number(item.qty);
              const itemTotal =
                perItemTotal +
                (Number(item.tax_fee)
                  ? (perItemTotal * Number(item.tax_fee)) / 100
                  : 0);
              return acc + itemTotal;
            }, 0)
          : 0;

        // const totalAmount =
        //   (totalItemAmount || 0) +
        //   ((totalItemAmount * Number(taxFee)) / 100 || 0) +
        //   (Number(otherFee) || 0);

        return (
          <>
            <div className="flex-grow pb-10">
              <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
                <div className="flex flex-col gap-3">
                  <Grid columns="6">
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
                          error={errors.patientId?.message}
                        />
                      )}
                    />

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
                          dateFormat="DD-MM-YYYY"
                          error={errors.invoice_date?.message}
                          className="w-full"
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
                          dateFormat="DD-MM-YYYY"
                          error={errors.due_date?.message}
                          className="w-full"
                        />
                      )}
                    />
                    <Input
                      label="Invoice Number"
                      placeholder="Invoice Number"
                      prefix={'#'}
                      {...register('invoice_number')}
                      error={errors.invoice_number?.message}
                      className="w-full"
                    />

                    <Input
                      label="Reference"
                      placeholder="Reference"
                      {...register('reference')}
                      error={errors.reference?.message}
                      className="w-full"
                    />

                    <Controller
                      name="branding_theme"
                      control={control}
                      render={({ field }) => (
                        <CSelect
                          {...field}
                          label="Branding Theme"
                          placeholder="Select Branding Theme"
                          options={[{ label: 'Default', value: 'default' }]}
                          error={errors.branding_theme?.message}
                          className="w-full"
                          dropdownClassName="!z-10 h-auto"
                        />
                      )}
                    />
                    <div className="col-span-3">
                      <Textarea
                        label="Address"
                        placeholder="Address"
                        {...register('address')}
                        error={errors.note?.message}
                        disabled
                        labelClassName="text-gray-600"
                      />
                    </div>
                  </Grid>
                </div>

                <FormBlockWrapper
                  title={'Item Details'}
                  description={'Add one or multiple item'}
                  className="grid pt-7 @2xl:pt-9 @3xl:pt-11 sm:grid-cols-1"
                >
                  <AddInvoiceItems
                    watch={watch}
                    control={control}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    taxFeeOptions={taxFeeOptions}
                    isEdit={!!id}
                  />
                </FormBlockWrapper>

                <FormBlockWrapper
                  title={'Notes'}
                  description={'Add any additional notes'}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11"
                >
                  <Textarea
                    placeholder="Notes"
                    {...register('note')}
                    error={errors.note?.message}
                    className="col-span-full"
                  />
                </FormBlockWrapper>
                <FormBlockWrapper
                  title={'Internal Notes'}
                  description={'Add any additional internal notes'}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11"
                >
                  <Textarea
                    placeholder="Internal Notes"
                    {...register('internal_note')}
                    error={errors.note?.message}
                    className="col-span-full"
                  />
                </FormBlockWrapper>

                <Flex justify="end" className="pt-6">
                  <div className="w-1/3">
                    <Text className="mb-2 flex items-center justify-between text-base font-semibold text-gray-900">
                      Subtotal:{' '}
                      <Text as="span">
                        {currencyData.active.symbol} {totalItemAmount}
                      </Text>
                    </Text>
                    <Text className="flex w-2/3 items-center justify-between text-sm text-gray-900">
                      Include discount:{' '}
                      <Text as="span" className="text-gray-500">
                        {currencyData.active.symbol} 0
                      </Text>
                    </Text>
                    {/* {selectedTax?.label && (
                      <Text className="flex w-2/3 items-center justify-between text-sm text-gray-900">
                        Include {selectedTax.label}:{' '}
                        <Text as="span" className="text-gray-500">
                          $ {selectedTax.value}
                        </Text>
                      </Text>
                    )} */}

                    <Text className="mt-2 flex items-center justify-between text-base font-semibold text-gray-900">
                      Total:{' '}
                      <Text as="span">
                        {currencyData.active.symbol} {totalAmount}
                      </Text>
                    </Text>
                  </div>
                </Flex>
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
