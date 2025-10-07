import { useModal } from '@/app/shared/modal-views/use-modal';
import { Button, AdvancedRadio, RadioGroup } from 'rizzui';
import Image from 'next/image';
import StreamlineSendEmail from '@public/StreamlineSendEmail.svg';
import { useState } from 'react';
import { PiCheckCircleFill } from 'react-icons/pi';

export default function SendConfirm({
  id,
  onSubmit,
}: {
  id: number;
  onSubmit: (id: number, via: string) => void;
}) {
  const { closeModal } = useModal();
  const [viaClicked, setViaClicked] = useState('');

  const sendVia = [
    { label: 'Email Only', value: 'email' },
    { label: 'SMS Only', value: 'sms' },
    { label: 'Email & SMS', value: 'email-sms' },
  ];

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex justify-center">
        <Image src={StreamlineSendEmail} alt="info-icon" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">Send Invoice via</span>
        <span className="max-w-xs text-center text-lg">
          Choose your preferred delivery method.
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 px-6">
        <RadioGroup
          value={viaClicked}
          setValue={setViaClicked}
          className="col-span-full grid grid-cols-3 gap-4 @2xl:grid-cols-3 @4xl:gap-6"
        >
          {sendVia.map((via: any, index: number) => {
            return (
              <AdvancedRadio
                key={index}
                value={via.value}
                contentClassName="px-4 py-6 flex items-center justify-between"
                inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span>.icon]:opacity-0 [&:checked~span>.icon]:opacity-100"
              >
                <span>{via.label}</span>
                <PiCheckCircleFill className="icon h-5 min-w-[1.25rem] text-primary" />
              </AdvancedRadio>
            );
          })}
        </RadioGroup>
      </div>
      <div className="flex justify-center gap-4">
        <Button
          className="border border-gray-400 bg-white text-gray-600 hover:bg-white hover:text-black"
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          className="bg-[#3872F9] text-white"
          onClick={() => {
            onSubmit(id, viaClicked);
            closeModal();
          }}
        >
          Send Now
        </Button>
      </div>
    </div>
  );
}
