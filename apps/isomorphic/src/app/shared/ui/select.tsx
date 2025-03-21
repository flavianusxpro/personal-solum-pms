import React, { ComponentType } from 'react';
import { Select, SelectOption, SelectProps, Text } from 'rizzui';

const CSelect: ComponentType<SelectProps<SelectOption>> = ({
  options,
  dropdownClassName = 'h-auto',
  ...field
}) => {
  return (
    <Select
      {...field}
      displayValue={(option) => {
        const selectedOption = options.find((o) => o.value === option);
        return (
          <div className="flex items-center gap-2">
            <Text>{selectedOption?.label}</Text>
          </div>
        );
      }}
      getOptionValue={(option) => option.value}
      dropdownClassName={dropdownClassName}
      options={options}
    />
  );
};

export default CSelect;
