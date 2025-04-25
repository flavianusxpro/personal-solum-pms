import cn from '@/core/utils/class-names';
import { useEffect, useState } from 'react';
import { Accordion, Switch, Text, Title } from 'rizzui';

interface IMeetingCard {
  icon: React.ReactNode;
  meetName: string;
  content?: string;
  children: React.ReactNode;
  useConfigure?: boolean;
  onSwitchChange?: (checked: boolean) => void;
  switchValue?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function StatusCard(props: IMeetingCard) {
  const {
    icon,
    meetName,
    content,
    children,
    useConfigure = true,
    onSwitchChange,
    switchValue = false,
    className,
    disabled = false,
  } = props;
  return (
    <div
      className={cn(
        'col-span-2 flex gap-3 rounded-lg border border-muted p-6',
        className,
        disabled && 'opacity-50'
      )}
    >
      <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden">
        {icon}
      </div>
      <div className="flex flex-grow flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Title as="h3" className="mb-1 text-base font-semibold">
            {meetName}
          </Title>
          <Text className="text-sm text-gray-500 transition-colors">
            {content}
          </Text>
          <div className="w-full">
            <div
              className={`transition-all duration-300 ${
                switchValue
                  ? 'max-h-screen pt-7 opacity-100'
                  : 'max-h-0 overflow-hidden opacity-0'
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
      <Switch
        disabled={disabled}
        checked={switchValue}
        onChange={(e) => onSwitchChange?.(e.target.checked)}
        variant="flat"
      />
    </div>
  );
}
