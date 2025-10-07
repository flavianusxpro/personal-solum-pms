'use client';

import cn from '@core/utils/class-names';
import { PiWalletBold } from 'react-icons/pi';
import { Button, ButtonProps } from 'rizzui';

export default function PayNowButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn('w-full @lg:w-auto', className)}
      {...props}
    >
      <PiWalletBold className="me-1.5 h-[17px] w-[17px]" />
      Pay Now
    </Button>
  );
}
