import { Text } from 'rizzui';

interface CustomSwitchProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    labelPlacement?: 'left' | 'right';
    onColor?: string;
    offColor?: string;
    disabled?: boolean;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
    label,
    checked,
    onChange,
    labelPlacement = 'right',
    onColor = '#ef4444',
    offColor = '#d1d5db',
    disabled = false,
}) => {
    const handleClick = () => {
        if (!disabled) {
            onChange(!checked);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {labelPlacement === 'left' && (
                <Text as="span" className="text-sm text-gray-700">
                    {label}
                </Text>
            )}

            <div
                className={`
          relative inline-flex items-center h-6 rounded-full w-11 transition-colors
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        `}
                style={{
                    backgroundColor: checked ? onColor : offColor
                }}
                onClick={handleClick}
            >
                <span
                    className={`
            inline-block w-5 h-5 bg-white rounded-full transition-transform
            ${checked ? 'translate-x-5' : 'translate-x-0.5'}
          `}
                />
            </div>

            {labelPlacement === 'right' && (
                <Text as="span" className="text-sm text-gray-700">
                    {label}
                </Text>
            )}
        </div>
    );
};

export default CustomSwitch;