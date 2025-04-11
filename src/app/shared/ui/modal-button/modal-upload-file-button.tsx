import dynamic from 'next/dynamic';
import UploadButton from './upload-button';
const FileUpload = dynamic(() => import('@/app/shared/ui/file-upload'), {
  ssr: false,
});

interface IUploadFileProps {
  useFileName?: boolean;
  handleUpload?: (files: File[]) => Promise<void>;
  multiple?: boolean;
}

export default function UploadFile({
  useFileName = false,
  handleUpload,
  multiple = false,
}: IUploadFileProps) {
  return (
    <UploadButton
      modalView={
        <FileUpload
          useFileName={useFileName}
          multiple={multiple}
          handleUpload={handleUpload}
        />
      }
    />
  );
}
