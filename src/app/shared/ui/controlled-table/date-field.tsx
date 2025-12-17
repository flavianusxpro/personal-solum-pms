'use client';

import { DatePicker, DatePickerProps } from '@core/ui/datepicker';

export default function DateFiled({
  onClear,
  placeholderText = 'Select date',
  inputProps,
  ...props
}: DatePickerProps & { onClear?: () => void }) {
  return (
    <div>
      <DatePicker
        monthsShown={1}
        placeholderText={placeholderText}
        inputProps={{
          clearable: props.isClearable,
          onClear: onClear,
          suffixClassName: 'flex items-center gap-1',
          
          inputClassName: 'h-9 [&_input]:text-ellipsis',
          ...inputProps,
        }}
        className="w-72"
        // {...props}
        {...{ ...props, isClearable: false }}
      />
    </div>
  );
}
