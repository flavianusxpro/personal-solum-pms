'use client';

import { Button, FieldError } from 'rizzui';
import {
  useFieldArray,
  UseFormWatch,
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import { FormBlockWrapper } from '@/app/shared/invoice/create-edit-form/form-utils';
import { InvoiceFormInput } from '@/validators/create-invoice.schema';
import InvoiceItem from './item';
import { useGetItems } from '@/hooks/useItems';

// multiple invoice items generate component
interface IPropsAddInvoiceItems {
  watch: UseFormWatch<InvoiceFormInput>;
  register: UseFormRegister<InvoiceFormInput>;
  control: Control<InvoiceFormInput>;
  errors: FieldErrors<InvoiceFormInput>;
  setValue: UseFormSetValue<InvoiceFormInput>;
}
export function AddInvoiceItems({
  watch,
  register,
  control,
  errors,
  setValue,
}: IPropsAddInvoiceItems) {
  const { data: dataItems } = useGetItems({
    page: 1,
    perPage: 100,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const items = watch('items');

  const itemsOptions = useMemo(() => {
    if (!dataItems) return [];
    return dataItems.data.map((item) => ({
      value: `${item.code} - ${item.name}`,
      label: `${item.code} - ${item.name}`,
    }));
  }, [dataItems]);

  useEffect(() => {
    if (items?.length) {
      items.forEach((item, index) => {
        const itemId = watch(`items.${index}.item`);
        const itemData = dataItems?.data.find(
          (item) => item.code === itemId?.split(' - ')[0]
        );
        const itemPrice = itemData?.price ?? 0;
        setValue(`total_amount`, Number(itemPrice));
      });
    }
  }, [dataItems, fields, items, setValue, watch]);

  return (
    <div className="col-span-2 mt-4 rounded-lg border border-muted @container">
      <div className="mb-8 grid grid-cols-1 items-start gap-4 p-4 !pb-0 @md:p-5 @xl:p-6">
        {fields.map((field, index) => {
          return (
            <InvoiceItem
              dataItems={dataItems?.data}
              key={index}
              register={register}
              remove={remove}
              watch={watch}
              control={control}
              itemsOptions={itemsOptions}
              errors={errors}
              field={field}
              index={index}
              setValue={setValue}
            />
          );
        })}
      </div>

      <div className="flex w-full flex-col items-start justify-between px-4 pb-6 @4xl:flex-row @4xl:px-6">
        <Button
          onClick={() =>
            append({
              item: null,
              description: '',
              amount: 0,
              qty: 1,
              total_amount: 0,
            } as any)
          }
          variant="flat"
          className="-mt-2 mb-1 w-full @4xl:mb-0 @4xl:mt-0 @4xl:w-auto"
        >
          <PiPlusBold className="me-1.5 h-4 w-4" /> Add Item
        </Button>
        <FieldError error={errors.items?.message} />
      </div>
    </div>
  );
}
