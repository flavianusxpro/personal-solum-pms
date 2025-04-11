import dynamic from 'next/dynamic';
import UploadButton from './upload-button';
import { ButtonProps } from 'rizzui';
const FileUpload = dynamic(() => import('@/app/shared/ui/file-upload'), {
  ssr: false,
});

interface IUploadFileProps extends ButtonProps {
  useFileName?: boolean;
  handleUpload?: (files: File[], expiryDate?: string) => Promise<void>;
  multiple?: boolean;
  useExpireDate?: boolean;
}

export default function UploadFile({
  useFileName = false,
  useExpireDate = false,
  handleUpload,
  multiple = false,
  ...rest
}: IUploadFileProps) {
  return (
    <UploadButton
      {...rest}
      modalView={
        <FileUpload
          useFileName={useFileName}
          multiple={multiple}
          handleUpload={handleUpload}
          useExpireDate={useExpireDate}
        />
      }
    />
  );
}
