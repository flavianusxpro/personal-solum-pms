import React, { useCallback, useEffect } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { PiTrashBold } from 'react-icons/pi';
import CSelect from '../../ui/select';
import QuantityInput from '../../ui/quantity-input';
import { ActionIcon, Button, Input, Text, Textarea } from 'rizzui';
import { InvoiceFormInput } from '@/validators/create-invoice.schema';
import { IGetAllItemsResponse } from '@/types/ApiResponse';

interface InvoiceItemProps {
  field: NonNullable<InvoiceFormInput['items']>[number];
  watch: UseFormWatch<InvoiceFormInput>;
  dataItems?: IGetAllItemsResponse['data'];
  index: number;
  control: Control<InvoiceFormInput>;
  errors: FieldErrors<InvoiceFormInput>;
  itemsOptions: { label: string; value: string }[];
  register: UseFormRegister<InvoiceFormInput>;
  setValue: UseFormSetValue<InvoiceFormInput>;
  remove: (index: number) => void;
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({
  field,
  index,
  control,
  errors,
  itemsOptions,
  register,
  remove,
  dataItems,
  watch,
  setValue,
}) => {
  const selectedItem = watch(`items.${index}.item`)?.split(' - ')[0];
  const findedItem = dataItems?.find((item) => item.code === selectedItem);
  const itemPrice = findedItem?.price ?? 0;

  const quantityValue = watch(
    `items.${index}.qty`,
    field.qty ?? 1
  ) as unknown as number;

  const totalAmount = useCallback(() => {
    return quantityValue * Number(itemPrice);
  }, [quantityValue, itemPrice]);

  useEffect(() => {
    if (itemPrice) {
      setValue(`items.${index}.amount`, Number(itemPrice));
    }
    if (selectedItem) {
      setValue(`items.${index}.total_amount`, totalAmount());
    }
  }, [selectedItem, quantityValue, itemPrice, setValue, index, totalAmount]);

  return (
    <div className="flex w-full items-start gap-3 @lg:gap-4 @2xl:gap-5">
      <Controller
        control={control}
        name={`items.${index}.item`}
        render={({ field }) => (
          <CSelect
            {...field}
            className="w-1/2"
            dropdownClassName="!z-10 h-auto"
            options={itemsOptions}
            label="Item"
            error={errors?.items?.[index]?.item?.message && 'Item is required'}
          />
        )}
      />
      <Textarea
        label="Description"
        placeholder="Enter item description"
        {...register(`items.${index}.description`)}
        defaultValue={field.description}
        error={errors?.items?.[index]?.description?.message}
        textareaClassName="h-10"
        className="w-full"
      />
      <Controller
        name={`items.${index}.qty`}
        control={control}
        render={({ field }) => (
          <QuantityInput
            {...field}
            error={errors?.items?.[index]?.qty?.message}
            className="w-1/2"
          />
        )}
      />

      <Input
        value={itemPrice}
        label="Price"
        type="number"
        prefix={'$'}
        placeholder="select item"
        className="w-1/2"
        disabled
      />

      <Input
        value={totalAmount()}
        label="Total"
        type="number"
        prefix={'$'}
        placeholder="select item"
        className="w-1/2"
        disabled
      />
      <ActionIcon
        className="mt-6"
        variant="text"
        color="danger"
        onClick={() => remove(index)}
      >
        <PiTrashBold className="me-1 h-[18px] w-[18px]" />
      </ActionIcon>
    </div>
  );
};

export default InvoiceItem;
