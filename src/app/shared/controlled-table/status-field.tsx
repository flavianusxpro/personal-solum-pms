import { Select, type SelectProps, type SelectOption } from 'rizzui';
import cn from '@core/utils/class-names';
import CSelect from '../ui/select';

export default function StatusField({
  placeholder = 'Select status',
  dropdownClassName,
  ...props
}: SelectProps<SelectOption>) {
  return (
    <CSelect
      inPortal={false}
      placeholder={placeholder}
      selectClassName="h-9 min-w-[150px]"
      dropdownClassName={cn('p-1.5', dropdownClassName)}
      optionClassName="h-9"
      {...props}
    />
  );
}
