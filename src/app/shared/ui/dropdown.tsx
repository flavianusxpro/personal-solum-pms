'use client';

import { Dropdown } from 'rizzui';

type IDropdownProps = {
  actionComponent?: React.ReactNode;
  menuItems?: React.ReactNode;
  menuClassName?: string;
};

export default function DropdownComponent({
  actionComponent,
  menuItems,
  menuClassName,
}: IDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Trigger>{actionComponent}</Dropdown.Trigger>
      <Dropdown.Menu className={menuClassName}>{menuItems}</Dropdown.Menu>
    </Dropdown>
  );
}
