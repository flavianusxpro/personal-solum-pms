import React, { useState } from 'react';
import { FileInput } from 'rizzui';
import { PiCloudArrowUp, PiX } from 'react-icons/pi';

interface FileUploadFieldProps {
  label?: string;
  acceptedFileTypes?: string[];
  maxFiles?: number;
  error?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  helperText?: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label = 'Attachment (optional)',
  acceptedFileTypes = ['image/*', '.pdf', '.doc', '.docx'],
  maxFiles = 5,
  error,
  value = [],
  onChange,
  helperText,
}) => {
  const [files, setFiles] = useState<File[]>(value);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (selectedFiles: File[]) => {
    const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileChange(droppedFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      
      <div
        className={`relative rounded-lg border-2 border-dashed transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex min-h-[120px] flex-col items-center justify-center p-6">
          <PiCloudArrowUp className="mb-3 h-10 w-10 text-gray-400" />
          <div className="text-center">
            <label className="cursor-pointer">
              <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Drop or select file
              </span>
              <input
                type="file"
                className="hidden"
                multiple={maxFiles > 1}
                accept={acceptedFileTypes.join(',')}
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files || []);
                  handleFileChange(selectedFiles);
                  e.target.value = '';
                }}
                disabled={files.length >= maxFiles}
              />
            </label>
          </div>
          {helperText && (
            <p className="mt-2 text-xs text-gray-500">{helperText}</p>
          )}
          {maxFiles > 1 && (
            <p className="mt-1 text-xs text-gray-500">
              Max {maxFiles} files
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <span className="text-xs font-medium text-gray-600">
                    {file.name.split('.').pop()?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <PiX className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadField;