import Link from 'next/link';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Title, Collapse, Loader } from 'rizzui';
import cn from '@core/utils/class-names';
import { PiCaretDownBold } from 'react-icons/pi';
// import StatusBadge from '@core/components/get-status-badge';
import useAcl from '@/core/hooks/use-acl';
import { DividerSidebar } from '@/app/shared/ui/divider';

export function SidebarMenu() {
  const pathname = usePathname();
  const { menuItems, isLoadingProfile } = useAcl();

  if (isLoadingProfile) return <Loader />;

  const isDropdownItemActive = (dropdownItems: any[]): boolean => {
    if (!dropdownItems) return false;
    return dropdownItems.some((item: any) => {
      if (pathname === item.href) return true;
      if (item.dropdownItems) {
        return isDropdownItemActive(item.dropdownItems);
      }
      return false;
    });
  };

  const renderNestedDropdown = (menu: any, level: number = 1) => {
    const isDropdownOpen = isDropdownItemActive(menu.dropdownItems || []);
    const isActive = pathname === menu.href;

    if (menu.dropdownItems) {
      return (
        <Collapse
          key={menu.name}
          defaultOpen={isDropdownOpen}
          header={({ open, toggle }) => (
            <div
              onClick={toggle}
              className={cn(
                'group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2',
                isDropdownOpen
                  ? 'text-primary'
                  : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700',
                level > 1 && 'mx-0 2xl:mx-0'
              )}
            >
              <span className="flex items-center">
                {menu?.icon && (
                  <span
                    className={cn(
                      'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                      isDropdownOpen
                        ? 'text-primary'
                        : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                    )}
                  >
                    {menu?.icon}
                  </span>
                )}
                {menu.name}
              </span>

              <PiCaretDownBold
                strokeWidth={3}
                className={cn(
                  'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
                  open && 'rotate-0 rtl:rotate-0'
                )}
              />
            </div>
          )}
        >
          {menu.dropdownItems.map((dropdownItem: any, index: number) => {
            if (dropdownItem.dropdownItems) {
              return (
                <div key={index} className="ml-2">
                  {renderNestedDropdown(dropdownItem, level + 1)}
                </div>
              );
            }

            const isChildActive = pathname === dropdownItem.href;
            return (
              <Link
                href={dropdownItem?.href}
                key={dropdownItem?.name + index}
                className={cn(
                  'mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5',
                  isChildActive
                    ? 'text-primary'
                    : 'text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900',
                  level > 1 && 'mx-2 2xl:mx-2'
                )}
              >
                <div className="flex items-center truncate">
                  <span
                    className={cn(
                      'me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200',
                      isChildActive
                        ? 'bg-primary ring-[1px] ring-primary'
                        : 'opacity-40'
                    )}
                  />
                  <span className="truncate">{dropdownItem?.name}</span>
                </div>
                {/* {dropdownItem?.badge?.length ? (
                  <StatusBadge status={dropdownItem?.badge} />
                ) : null} */}
              </Link>
            );
          })}
        </Collapse>
      );
    }

    return (
      <Link
        key={menu.name}
        href={menu?.href}
        className={cn(
          'group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
          isActive
            ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
            : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90',
          level > 1 && 'mx-2 2xl:mx-2'
        )}
      >
        <div className="flex items-center truncate">
          {menu?.icon && (
            <span
              className={cn(
                'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                isActive
                  ? 'text-primary'
                  : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
              )}
            >
              {menu?.icon}
            </span>
          )}
          <span className="truncate">{menu.name}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="mt-4 pb-3 3xl:mt-6">
      {menuItems?.map((item: any, index: number) => {
        const isDropdownOpen = isDropdownItemActive(item?.dropdownItems || []);

        return (
          <Fragment key={item.name + '-' + index}>
            {item?.dropdownItems ? (
              <>
                <Collapse
                  defaultOpen={isDropdownOpen}
                  header={({ open, toggle }) => (
                    <div
                      onClick={toggle}
                      className={cn(
                        'group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2 border-b border-[#E4E4E4]',
                        isDropdownOpen
                          ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                          : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700'
                      )}
                    >
                      <span className="flex items-center">
                        {item?.icon && (
                          <span
                            className={cn(
                              'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                              isDropdownOpen
                                ? 'text-primary'
                                : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                            )}
                          >
                            {item?.icon}
                          </span>
                        )}
                        {item.name}
                      </span> 
                      <PiCaretDownBold
                        strokeWidth={3}
                        className={cn(
                          'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
                          open && 'rotate-0 rtl:rotate-0'
                        )}
                      />
                    </div>
                  )}
                >
                  {item?.dropdownItems?.map((menu: any, menuIndex: number) => (
                    <div key={menuIndex}>
                      {renderNestedDropdown(menu)}
                    </div>
                  ))}
                </Collapse>
              </>
            ) : (
              <div className="flex flex-col gap-1">
                <Title
                  as="h6"
                  className={cn(
                    'mb-2 truncate px-6 text-xs font-semibold uppercase tracking-widest text-gray-500 2xl:px-8',
                    index !== 0 && 'mt-6 3xl:mt-7'
                  )}
                >
                  {item.name}
                </Title>
                <DividerSidebar className="px-6 2xl:px-8" />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}