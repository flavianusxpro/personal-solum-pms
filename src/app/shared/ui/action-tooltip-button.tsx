import cn from '@/core/utils/class-names';
import { useColorPresetName } from '@/layouts/settings/use-theme-color';
import { ActionIcon, Tooltip } from 'rizzui';

export default function ActionTooltipButton({
  className,
  children,
  tooltipContent,
  onClick,
  variant,
  size = 'md',
}: {
  className?: string;
  children?: React.ReactNode;
  tooltipContent: string;
  onClick?: () => void;
  variant?: 'text' | 'solid' | 'flat' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const { colorPresetName } = useColorPresetName();

  return (
    <ActionIcon
      variant={variant}
      onClick={onClick}
      size={size}
      className={cn(
        'flex items-center justify-center rounded-full border-2 border-transparent bg-white p-2 shadow-sm transition-all duration-200 ease-in-out hover:border-primary hover:bg-primary/10',
        colorPresetName === 'dark' && 'bg-slate-800',
        className
      )}
    >
      <Tooltip content={tooltipContent} placement="top">
        <span>{children}</span>
      </Tooltip>
    </ActionIcon>
  );
}
