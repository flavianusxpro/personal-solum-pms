'use client';

import { ActionIcon, Flex, Grid, Title } from 'rizzui';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import { IGetPharmachyListResponse } from '@/types/ApiResponse';

import { QRCodeSVG } from 'qrcode.react';
import cn from '@/core/utils/class-names';
import Link from 'next/link';

interface IProps {
  data?: IGetPharmachyListResponse['data'][number];
  isView?: boolean;
}

export default function ShowQrModal({ data, isView }: IProps) {
  const { closeModal } = useModal();

  const linkValue = `${process.env.NEXT_PUBLIC_BOOKING_API_URL}/bookings?clincicId=${data?.clinicId}&pharmacyId=${data?.id}`;

  return (
    <div className={cn('flex flex-col gap-6 px-6 pb-6 pt-6')}>
      <Flex justify="between" align="center" gap="4">
        <Title className="text-lg">Pharmachy QR Code</Title>
        <ActionIcon variant="text" onClick={closeModal} className="">
          <PiX className="h-6 w-6" />
        </ActionIcon>
      </Flex>

      <Grid>
        <QRCodeSVG
          value={linkValue}
          size={200}
          style={{ width: '100%', height: '100%' }}
          className="mx-auto"
        />
        <Link
          className="text-center text-base font-semibold hover:underline"
          href={linkValue}
          target="_blank"
        >
          Open Link
        </Link>
      </Grid>
    </div>
  );
}
