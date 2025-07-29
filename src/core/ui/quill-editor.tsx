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
}

export default function QuillEditor({
  id,
  label,
  error,
  className,
  labelClassName,
  errorClassName,
  toolbarPosition = 'top',
  ...props
}: QuillEditorProps) {
  const [isLoading, setIsLoading] = useState(true);

  const quillModules = {
    toolbar: [
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],

      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['link', 'image'], // link and image, video
      ['clean'],
    ],
  };

  // const quillFormats = [
  //   'header',
  //   'bold',
  //   'italic',
  //   'underline',
  //   'strike',
  //   'list',
  //   'bullet',
  //   'blockquote',
  //   'code-block',
  //   'script',
  //   'indent',
  //   'color',
  //   'background',
  //   'font',
  //   'align',
  // ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader className="h-10 w-10" />;
  }

  return (
    <div className={cn(className)}>
      {label && (
        <label className={cn('mb-1.5 block', labelClassName)}>{label}</label>
      )}
      <ReactQuill
        modules={quillModules}
        // formats={quillFormats}
        className={cn(
          'react-quill',
          toolbarPosition === 'bottom' && 'react-quill-toolbar-bottom relative',
          className,
          error && 'rounded-lg border-2 border-red-400'
        )}
        {...props}
      />
      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
    </div>
  );
}
