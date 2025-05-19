import React from 'react';
import { Input, NumberInput } from 'rizzui';

interface CNumberInputProps {
  error?: string;
  label: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  type?: 'text' | 'tel' | 'password' | undefined;
  formatType?: 'pattern' | 'numeric' | 'custom';
  value?: string | number | 'null';
  onChange: (value: number | null) => void;
  helperText?: string;
  disabled?: boolean;
}

export default function CNumberInput({
  error,
  label,
  placeholder,
  prefix,
  suffix,
  type,
  onChange,
  formatType = 'numeric',
  helperText,
  ...rest
}: CNumberInputProps) {
  return (
    <NumberInput
      {...rest}
      {...{ label, placeholder, prefix, type, error, helperText, suffix }}
      formatType={formatType}
      thousandSeparator=","
      onValueChange={(value) => onChange(value.floatValue ?? null)}
      customInput={Input as React.ComponentType<unknown>}
    />
  );
}
