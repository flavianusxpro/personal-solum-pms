import React, { ComponentType } from 'react';
import { SelectOption, SelectProps, Text } from 'rizzui';
import SelectLoader from '../components/loader/select-loader';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

interface CSelectProps extends SelectProps<SelectOption> {
  isLoading?: boolean;
  displayClassName?: string | any
}

const CSelect: ComponentType<CSelectProps> = ({
  options,
  dropdownClassName = 'h-auto',
  isLoading = false,
  displayClassName,
  ...field
}) => {
  return (
    <Select
      {...field}
      displayValue={(option) => {
        const selectedOption = options.find((o) => o.value === option);
        if (isLoading) {
          return <SelectLoader />;
        }
        return (
          <div className={`flex items-center gap-2 ${displayClassName}`}>
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
