'use client';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const quillModules = {
  toolbar: false,
};

interface QuillEditorEmailProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const QuillEditorEmail = forwardRef(
  ({ value, onChange, placeholder }: QuillEditorEmailProps, ref) => {
    const quillRef = useRef<ReactQuill | null>(null);

    useImperativeHandle(ref, () => ({
      getEditor: () => quillRef.current?.getEditor(),
    }));

    return (
      <div className="min-h-[150px] w-full border-0 focus:ring-0">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={quillModules}
          placeholder={placeholder ?? 'Type your message...'}
          className="border-none shadow-none [&>.ql-container_.ql-editor]:min-h-[150px]"
        />
      </div>
    );
  }
);

QuillEditorEmail.displayName = 'QuillEditorEmail';
export default QuillEditorEmail;
