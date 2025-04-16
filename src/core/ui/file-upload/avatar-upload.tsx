'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from '@uploadthing/react/hooks';
import UploadIcon from '../../components/shape/upload';
import { FieldError, Loader, Text } from 'rizzui';
import cn from '../../utils/class-names';
import { PiPencilSimple } from 'react-icons/pi';
import { LoadingSpinner } from './upload-zone';
import { FileWithPath } from 'react-dropzone';
import useUploadImage from '@/hooks/useUploadFile';
import toast from 'react-hot-toast';

interface UploadZoneProps {
  name: string;
  getValues?: any;
  setValue?: any;
  className?: string;
  error?: string;
  disabled?: boolean;
  path_name: 'patient' | 'doctor';
}

export default function AvatarUpload({
  name,
  error,
  className,
  getValues,
  setValue,
  disabled,
  path_name,
}: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const formValue = getValues(name);

  const { mutate, isPending } = useUploadImage();

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles([
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
      mutate(
        {
          image: acceptedFiles[0],
          path_name: '/image/' + path_name,
        },
        {
          onSuccess: (res) => {
            setValue(name, res.data.public_url);
            toast.success('Upload success');
          },
          onError: (error: any) => {
            toast.error('Upload failed: ' + error.response.data.message);
            console.error(error);
          },
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div className={cn('grid gap-5', className)}>
      <div
        className={cn(
          'relative grid h-40 w-40 place-content-center rounded-full border-[1.8px]'
        )}
      >
        {formValue ? (
          <>
            <figure className="absolute inset-0 rounded-full">
              <Image
                fill
                alt="user avatar"
                src={formValue}
                className="rounded-full"
              />
            </figure>
            <div
              {...getRootProps()}
              className={cn(
                'absolute inset-0 grid cursor-pointer place-content-center rounded-full opacity-0 transition-opacity duration-300 ease-in-out hover:bg-black/70 hover:opacity-100'
              )}
            >
              <PiPencilSimple className="h-5 w-5 text-white" />

              <input {...getInputProps()} />
            </div>
          </>
        ) : (
          <div
            {...getRootProps()}
            className={cn(
              'absolute inset-0 z-10 grid cursor-pointer place-content-center'
            )}
          >
            <input {...getInputProps()} />

            {isPending ? (
              <>
                <UploadIcon className="mx-auto h-12 w-12" />
                <Loader variant="spinner" className="justify-center" />
              </>
            ) : (
              <Text className="font-medium">Drop or select file</Text>
            )}
          </div>
        )}
      </div>
      {error && <FieldError error={error} />}
    </div>
  );
}
