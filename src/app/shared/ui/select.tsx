import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';
import { Loader, SelectOption, SelectProps, Text } from 'rizzui';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
});

const CSelect: ComponentType<
  SelectProps<SelectOption> & { isLoading?: boolean }
> = ({ options, dropdownClassName = 'h-auto', isLoading, ...field }) => {
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
      getOptionDisplayValue={(option) => {
        if (isLoading) {
          return <Loader />;
        }
        return option.label;
      }}
      getOptionValue={(option) => option.value}
      dropdownClassName={dropdownClassName}
      options={options}
    />
  );
};

export default CSelect;
