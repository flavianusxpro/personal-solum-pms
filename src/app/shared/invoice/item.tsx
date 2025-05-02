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
import CSelect from '../ui/select';
import QuantityInput from './quantity-input';
import { Button, Input, Text, Textarea } from 'rizzui';
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
    <div className="mb-8 grid grid-cols-1 items-start rounded-lg border border-muted p-4 shadow @md:p-5 @xl:p-6">
      <div className="grid w-full items-start gap-3 @md:grid-cols-2 @lg:gap-4 @xl:grid-cols-3 @2xl:gap-5 @4xl:grid-cols-4">
        <Controller
          control={control}
          name={`items.${index}.item`}
          render={({ field }) => (
            <CSelect
              {...field}
              dropdownClassName="!z-10 h-auto"
              options={itemsOptions}
              label="Item"
              error={
                errors?.items?.[index]?.item?.message && 'Item is required'
              }
            />
          )}
        />
        <Controller
          name={`items.${index}.qty`}
          control={control}
          render={({ field }) => (
            <QuantityInput
              {...field}
              error={errors?.items?.[index]?.qty?.message}
            />
          )}
        />
        <div className="flex items-start @xl:col-span-2 @2xl:col-span-1">
          <Input
            value={itemPrice}
            label="Price"
            type="number"
            prefix={'$'}
            placeholder="select item"
            disabled
            className="w-full"
          />

          <div className="ms-3 mt-9 flex items-start text-sm">
            <Text className="me-1 text-gray-500">Total:</Text>
            <Text as="b" className="font-medium">
              ${totalAmount()}
            </Text>
          </div>
        </div>
        <Textarea
          label="Description"
          placeholder="Enter item description"
          {...register(`items.${index}.description`)}
          defaultValue={field.description}
          error={errors?.items?.[index]?.description?.message}
          className="row-start-2 @md:col-span-2 @xl:col-span-3 @xl:row-start-2 @4xl:col-span-4"
          textareaClassName="h-20"
        />
      </div>
      <Button
        variant="text"
        color="danger"
        onClick={() => remove(index)}
        className="-mx-2 -mb-1 ms-auto mt-5 h-auto px-2 py-1 font-semibold"
      >
        <PiTrashBold className="me-1 h-[18px] w-[18px]" /> Remove
      </Button>
    </div>
  );
};

export default InvoiceItem;
