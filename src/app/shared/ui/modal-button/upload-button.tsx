'use client';

import { PiArrowLineDownBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Button, ButtonProps } from 'rizzui';

type ExportButtonProps = ButtonProps & {
  modalView: React.ReactNode;
};

export default function UploadButton({
  modalView,
  ...rest
}: ExportButtonProps) {
  const { openModal } = useModal();
  return (
    <Button
      {...rest}
      className="mt-4"
      onClick={() =>
        openModal({
          view: modalView,
        })
      }
    >
      <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />
      Upload
    </Button>
  );
}
