import React, { ComponentType } from 'react';
import { Checkbox, CheckboxProps, Text } from 'rizzui';

interface IProps {
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  checkBoxLabel?: string;
}

const CCheckbox: React.FC<IProps> = ({
  value,
  onChange,
  label,
  checkBoxLabel,
}) => {
  return (
    <div>
      <Text fontWeight="semibold" className="mb-[6px]">
        {label}
      </Text>
      <Checkbox
        label={checkBoxLabel}
        checked={value}
        onChange={onChange}
        className="col-span-full"
      />
    </div>
  );
};

export default CCheckbox;
