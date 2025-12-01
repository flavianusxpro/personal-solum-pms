'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Modal } from 'rizzui';
import SearchTrigger from './search-trigger';
import SearchList from './search-list';
import CSelect from '../ui/select';

export default function SearchWidget({
  className,
  placeholderClassName,
  icon,
}: {
  className?: string;
  icon?: React.ReactNode;
  placeholderClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const pathname = usePathname();
  useEffect(() => {
    setOpen(() => false);
    return () => setOpen(() => false);
  }, [pathname]);

  return (
    <>
      <div className='flex gap-2 w-[500px]'>
        <SearchTrigger
          icon={icon}
          className={className}
          onClick={() => setOpen(true)}
          placeholderClassName={placeholderClassName}
        />

        <CSelect
          placeholder="Timezone"
          dropdownClassName="!z-10 h-auto"
          className="w-full @[35rem]:w-auto"
          options={[]}
          onClear={() => { }}
          clearable
          value=""
        />
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100/90 overflow-hidden dark:backdrop-blur-xl"
        className="z-[9999]"
      >
        <SearchList onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
