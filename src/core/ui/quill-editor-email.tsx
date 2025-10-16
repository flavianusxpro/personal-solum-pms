import ReactQuill, { type ReactQuillProps } from 'react-quill';
import { FieldError, Loader } from 'rizzui';
import cn from '../utils/class-names';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';

interface QuillEditorProps extends ReactQuillProps {
  error?: string;
  label?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  toolbarPosition?: 'top' | 'bottom';
  placeholder?: string;
  tooltipType?: string;
}
export const quillModules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};
export default function QuillEditorEmail({
  id,
  label,
  error,
  className,
  labelClassName,
  errorClassName,
  toolbarPosition = 'top',
  placeholder,
  tooltipType,
  ...props
}: QuillEditorProps) {
  const [isLoading, setIsLoading] = useState(true);

  const selectedTooltip =
    tooltipType == 'bs-type' ? quillModules : { toolbar: [] };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'quill-email-wrapper rounded-xl border border-gray-200 bg-white',
        className
      )}
    >
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'mb-1 block text-sm font-medium text-gray-700',
            labelClassName
          )}
        >
          {label}
        </label>
      )}

      <ReactQuill
        key={tooltipType}
        modules={selectedTooltip}
        className={cn(
          'custom-quill-editor',
          toolbarPosition === 'bottom' && 'react-quill-toolbar-bottom',
          tooltipType !== 'bs-type' ? 'no-tooltip' : 'tooltip',
          className
        )}
        placeholder={placeholder}
        {...props}
      />

      {error && (
        <FieldError
          error={error}
          className={cn('mt-1 text-xs text-red-500', errorClassName)}
        />
      )}
    </div>
  );
}
