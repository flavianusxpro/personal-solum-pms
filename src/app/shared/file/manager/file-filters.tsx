'use client';

import { Title, Input, Button } from 'rizzui';
import { PiMagnifyingGlassBold, PiPlus, PiPlusBold } from 'react-icons/pi';
import ViewSwitcher from '@/app/shared/file/manager/view-switcher';
import FileTypeDropdown from '@/app/shared/file/manager/file-sortby-type';
import FileDateSortingDropdown from '@/app/shared/file/manager/file-sortby-date';

export default function FileFilters({
  filters,
  updateFilter,
  onSearch,
  searchTerm,
}: {
  filters?: { [key: string]: any };
  updateFilter?: (columnId: string, filterValue: string | any[]) => void;
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}) {
  function uploadFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Selected file:', file);
        // Handle file upload logic here
      }
    };
    input.click();
  }

  return (
    <div className="mb-4 flex flex-wrap items-center">
      <Title
        as="h4"
        className="order-1 basis-1/2 md:order-1 md:me-3 md:basis-auto"
      >
        All Files
      </Title>
      <div className="order-3 mt-4 flex flex-grow basis-full items-center gap-2 md:order-2 md:mt-0 md:basis-auto">
        <FileTypeDropdown updateFilter={updateFilter} />
        <FileDateSortingDropdown />
      </div>
      <div className="order-2 ml-auto flex basis-1/2 items-center justify-end gap-3 md:order-3 md:basis-auto md:gap-5">
        <Input
          type="search"
          placeholder="Search file..."
          value={searchTerm}
          onClear={() => onSearch('')}
          onChange={(event) => onSearch(event.target.value)}
          prefix={<PiMagnifyingGlassBold className="h-[18px] w-[18px]" />}
          className="hidden @md:block"
          inputClassName="h-[44px]"
          rounded="lg"
          clearable
        />
        <Button onClick={uploadFile}>
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          Upload
        </Button>
      </div>
    </div>
  );
}
