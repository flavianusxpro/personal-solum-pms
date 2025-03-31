import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from '@uploadthing/react';
import { generateReactHelpers } from '@uploadthing/react/hooks';

export const Uploader = generateUploader();
export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();

export const { useUploadThing, uploadFiles } = generateReactHelpers();
