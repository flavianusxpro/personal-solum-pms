'use client';

import { useState } from 'react';
// import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import {
  Button,
  //   Text,
  // Switch,
  // CheckboxGroup,
  // Checkbox,
  // RadioGroup,
  // Radio,
  //   Badge,
} from 'rizzui';
// import { notificationsData } from '@/data/notifications';
// import dayjs from 'dayjs';
// import { PiCheck } from 'react-icons/pi';
import dynamic from 'next/dynamic';
// import PageHeader from '@/app/shared/page-header';
// import { routes } from '@/config/routes';
// import { metaObject } from '@/config/site.config';
import UploadButton from '@/app/shared/ui/modal/upload-button';
const FileUpload = dynamic(() => import('@/app/shared/ui/file-upload'), {
  ssr: false,
});

// const generalOptions = [
//   {
//     title: 'I’m mentioned in a message',
//   },
//   {
//     title: 'Someone replies to any message',
//   },
//   {
//     title: 'I’m assigned a task',
//   },
//   {
//     title: 'A task is overdue',
//   },
//   {
//     title: 'A task status is updated',
//   },
// ];

// const summaryOptions = [
//   {
//     title: 'Daily summary',
//   },
//   {
//     title: 'Weekly summary',
//   },
//   {
//     title: 'Monthly summary',
//   },
//   {
//     title: 'Quaterly summary',
//   },
// ];

export default function NotificationSettingsView() {
  // const [values, setValues] = useState<string[]>([]);
  // const [value, setValue] = useState('');

  return (
    <div className="@container">
      <UploadButton modalView={<FileUpload />} />
    </div>
  );
}

const options = ['None', 'In-app', 'Email'];

function ButtonGroup({ onChange }: { onChange: (option: string) => void }) {
  const [selected, setSelected] = useState<string>();
  function handleOnClick(option: string) {
    setSelected(option);
    onChange && onChange(option);
  }

  return (
    <div className="inline-flex gap-1">
      {options.map((option) => (
        <Button
          key={option}
          variant={selected === option ? 'solid' : 'outline'}
          onClick={() => handleOnClick(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
