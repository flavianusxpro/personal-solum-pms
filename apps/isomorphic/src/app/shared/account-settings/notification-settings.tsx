'use client';

import { useState } from 'react';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import {
  Button,
  Text,
  // Switch,
  // CheckboxGroup,
  // Checkbox,
  // RadioGroup,
  // Radio,
  Badge,
} from 'rizzui';
import { notificationsData } from '@/data/notifications';
import dayjs from 'dayjs';
import { PiCheck } from 'react-icons/pi';

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
      <div className="grid mt-10 cursor-pointer grid-cols-1 gap-2 px-2">
          {notificationsData.map((item: any) => (
            <div
              key={item.name + item.id}
              className="group grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-4 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded bg-gray-100/70 p-1 dark:bg-gray-50/50 [&>svg]:h-auto [&>svg]:w-5">
                <item.icon />
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                <div className="w-full">
                  <Text className="mb-0.5 w-11/12 truncate text-sm font-semibold text-gray-900 dark:text-gray-700">
                    {item.name}
                  </Text>
                  <Text className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                    {dayjs(item.sendTime).fromNow(true)}
                  </Text>
                </div>
                <div className="ms-auto flex-shrink-0">
                  {item.unRead ? (
                    <Badge
                      renderAsDot
                      size="lg"
                      color="primary"
                      className="scale-90"
                    />
                  ) : (
                    <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                      <PiCheck className="h-auto w-[9px]" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>


      {/* <HorizontalFormBlockWrapper
        title="General notifications"
        description="Select when you’ll be notified when the following changes occur."
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          {generalOptions.map((opt, index) => (
            <div
              key={`generalopt-${index}`}
              className="flex items-center justify-between border-b border-muted py-6 last:border-none last:pb-0"
            >
              <Text className="text-sm font-medium text-gray-900">
                {opt.title}
              </Text>
              <ButtonGroup
                onChange={(option) => console.log(opt.title, option)}
              />
            </div>
          ))}
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="Summary notifications"
        description="Select when you’ll be notified when the following summaries or report are ready."
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          {summaryOptions.map((opt, index) => (
            <div
              key={`summaryopt-${index}`}
              className="flex items-center justify-between border-b border-muted py-6 last:border-none last:pb-0"
            >
              <Text className="text-sm font-medium text-gray-900">
                {opt.title}
              </Text>
              <ButtonGroup
                onChange={(option) => console.log(opt.title, option)}
              />
            </div>
          ))}
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="Comments"
        description="These are notifications for comments on your posts and replies to your comments."
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          <Switch
            label="Do not notify me"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
          />
          <Switch
            label="Mentions only"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
          />
          <Switch
            label="All comments"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
          />
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="Notifications from us"
        description="These are notifications for when someone tags you in a comment, post or story."
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          <CheckboxGroup
            values={values}
            setValues={setValues}
            className="flex flex-col"
          >
            <Checkbox
              name="app_notification"
              label="News and updates"
              value="news_updates"
              className="mb-5"
              labelClassName="pl-2 text-sm font-medium !text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
              helperText="News about product and feature updates."
            />
            <Checkbox
              name="app_notification"
              label="Tips and tutorials"
              value="tips_tutorials"
              className="mb-5"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
              helperText="Tips on getting more out of Untitled."
            />
            <Checkbox
              name="app_notification"
              label="User research"
              value="user_research"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
              helperText="Get involved in our beta testing program or participate in paid product user research."
            />
          </CheckboxGroup>
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="Reminders"
        description="These are notifications to remind you of updates you might have missed."
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          <RadioGroup
            value={value}
            setValue={setValue}
            className="justify-center space-x-4 space-y-4"
          >
            <div className="flex w-full flex-col divide-slate-300 md:w-[500px]">
              <Radio
                name="reminders"
                label="Do not notify me"
                value="do_not_notify"
                className="mb-5"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
              />
              <Radio
                name="reminders"
                label="Important reminders only"
                value="important_only"
                className="mb-5"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                helperText="Only notify me if the reminder is tagged as important."
              />
              <Radio
                name="reminders"
                value="all_reminder"
                label="All reminders"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                helperText="Notify me for all reminders."
              />
            </div>
          </RadioGroup>
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="More activity about you"
        description="These are notifications for posts on your profile, likes and other reactions to your posts, and more."
        descriptionClassName="max-w-[344px]"
        className="border-0 pb-0"
      >
        <div className="col-span-2">
          <RadioGroup
            value={value}
            setValue={setValue}
            className="justify-center space-x-4 space-y-4"
          >
            <div className="flex w-full flex-col divide-slate-300 md:w-[500px]">
              <Radio
                name="activity"
                label="Do not notify me"
                value="do_not_notify_activity"
                className="mb-5"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
              />
              <Radio
                name="activity"
                value="all_reminder_activity"
                label="All reminders"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                helperText="Notify me for all reminders."
              />
            </div>
          </RadioGroup>
        </div>
      </HorizontalFormBlockWrapper> */}
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
