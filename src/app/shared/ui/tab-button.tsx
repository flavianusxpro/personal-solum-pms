import cn from '@core/utils/class-names';

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: {
    value: string;
    label: string | any;
  };
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({
  item,
  isActive,
  onClick,
  ...props
}: TabButtonProps) {
  function handleClick() {
    return onClick();
  }

  return (
    <button
      className={cn(
        'relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000',
        isActive
          ? 'font-medium text-gray-900'
          : 'text-gray-500 hover:text-gray-800'
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="whitespace-nowrap">{item.label}</span>
      <span
        className={cn(
          'absolute -bottom-px left-0 h-0.5 w-full',
          isActive ? 'bg-primary' : 'bg-transparent'
        )}
      />
    </button>
  );
}
