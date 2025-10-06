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
import { ActionIcon, Input, SelectOption } from 'rizzui';
import { InvoiceFormInput } from '@/validators/create-invoice.schema';
import { IGetAllItemsResponse } from '@/types/ApiResponse';
import { useAtom } from 'jotai';
import { currencyAtom } from '@/store/currency';

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
  const [currencyData] = useAtom(currencyAtom);

  const selectedItem = watch(`items.${index}.item` as any)?.split(' - ')[0];
  const findedItem = dataItems?.find((item) => item.code === selectedItem);
  const itemPrice = findedItem?.price ?? 0;
  const taxIdItem = watch(`items.${index}.taxId`);
  const findedTaxFee = taxFeeOptions.find((item) => item.value === taxIdItem);

  const quantityValue = watch(
    `items.${index}.qty`,
    field.qty ?? 1
  ) as unknown as number;

  const totalAmount = useCallback(() => {
    return quantityValue * Number(itemPrice);
  }, [quantityValue, itemPrice]);

  const totalAmountWithTax = useCallback(() => {
    return (
      totalAmount() + (totalAmount() * (Number(findedTaxFee?.fee) || 0)) / 100
    );
  }, [findedTaxFee?.fee, totalAmount]);

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

    if (findedItem?.description === null) {
      setValue(`items.${index}.description`, '');
    }

    if (findedTaxFee?.value) {
      setValue(`items.${index}.tax_fee`, Number(findedTaxFee.fee));
    }
  }, [
    selectedItem,
    quantityValue,
    itemPrice,
    setValue,
    index,
    totalAmount,
    findedItem?.description,
    findedTaxFee?.value,
    findedTaxFee?.fee,
  ]);

  return (
    <div className="flex w-full items-start gap-3 @lg:gap-4 @2xl:gap-5">
      <Controller
        control={control}
        name={`items.${index}.item` as any}
        render={({ field }) => (
          <CSelect
            {...field}
            className="w-1/2"
            dropdownClassName="!z-10 h-auto"
            options={itemsOptions}
            label="Item"
            // error={errors?.items?.[index]?.item?.message && 'Item is required'}
          />
        )}
      />
      <div className="w-full">
        <Input
          label="Description"
          {...register(`items.${index}.description`)}
        />
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
        value={Number(itemPrice)}
        label="Price"
        type="number"
        prefix={currencyData.active.symbol}
        placeholder="select item"
        className="w-1/2"
        disabled
      />

      <Controller
        name={`items.${index}.taxId`}
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
        value={totalAmountWithTax()}
        label="Total"
        type="number"
        prefix={currencyData.active.symbol}
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
