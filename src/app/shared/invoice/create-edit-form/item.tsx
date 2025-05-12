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
import {
  ActionIcon,
  Button,
  Input,
  SelectOption,
  Text,
  Textarea,
} from 'rizzui';
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
  taxFeeOptions: SelectOption[];
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
  taxFeeOptions,
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

    if (findedItem?.description) {
      setValue(`items.${index}.description`, findedItem.description);
    }

    // set tax rate
    // setValue(`items.${index}.tax_rate`, 0);
  }, [
    selectedItem,
    quantityValue,
    itemPrice,
    setValue,
    index,
    totalAmount,
    findedItem?.description,
  ]);

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
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <div className="mt-1.5 rounded-md border border-gray-300 p-2">
          {field.description || 'Enter item description'}
        </div>
      </div>
      <Controller
        name={`items.${index}.qty`}
        control={control}
        render={({ field }) => (
          <QuantityInput
            {...field}
            error={errors?.items?.[index]?.qty?.message}
            className="w-1/3"
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

      <Controller
        name="taxFee"
        control={control}
        render={({ field }) => (
          <CSelect
            {...field}
            label="Tax Fee"
            placeholder="Select Tax Fee"
            options={taxFeeOptions}
            className="w-1/3"
          />
        )}
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
